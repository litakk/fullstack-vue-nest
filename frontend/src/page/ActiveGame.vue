<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useUserStore } from '../store/useStore';

type Player = 'X' | 'O' | null;
type GameStatus = 'waiting' | 'playing' | 'won' | 'draw';

interface GameState {
  id: string;
  board: string;
  status: GameStatus;
  currentTurn: 'X' | 'O';
  winner: 'X' | 'O' | null;
  playerXId: string;
  playerOId?: string | null;
  isBotGame: boolean;
}

const route = useRoute();
const userStore = useUserStore();
const gameId = route.params.id as string;

const board = ref<Player[][]>([
  [null, null, null],
  [null, null, null],
  [null, null, null],
]);

const game = ref<GameState | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const socket = ref<Socket | null>(null);

const parseBoard = (boardStr: string) => {
  const arr: Player[] = boardStr
    .split('')
    .map((c) => (c === '-' ? null : (c as Player)));
  board.value = [arr.slice(0, 3), arr.slice(3, 6), arr.slice(6, 9)];
};

const applyGame = (next: GameState) => {
  if (!next) return;
  error.value = null;
  game.value = { ...next, winner: next.winner ?? null };
  parseBoard(next.board);
};

const playerSymbol = computed<Player | null>(() => {
  if (!game.value) return null;
  if (game.value.isBotGame) return 'X';
  if (userStore.user?.id === game.value.playerXId) return 'X';
  if (userStore.user?.id === game.value.playerOId) return 'O';
  return null;
});

const isMyTurn = computed(
  () =>
    !!game.value &&
    game.value.status === 'playing' &&
    !!playerSymbol.value &&
    game.value.currentTurn === playerSymbol.value,
);

const resultText = computed(() => {
  if (!game.value || game.value.status === 'playing' || game.value.status === 'waiting') return '';
  if (game.value.status === 'draw') return 'Ничья!';
  if (game.value.winner === playerSymbol.value) return 'Вы выиграли!';
  return game.value.isBotGame ? 'Бот выиграл!' : 'Соперник выиграл!';
});

const statusText = computed(() => {
  if (!game.value) return '';
  if (game.value.status === 'waiting') return 'Ожидаем второго игрока...';
  if (game.value.status === 'playing') return `Ход: ${game.value.currentTurn}`;
  return '';
});

const loadGame = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/games/${gameId}`);
    if (!res.data) {
      throw new Error('Игра не найдена');
    }
    applyGame(res.data);
    loading.value = false;

    if (!res.data.isBotGame) {
      initSocket();
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || e.message;
    loading.value = false;
  }
};

const initSocket = () => {
  if (socket.value) return;
  socket.value = io('http://localhost:3000', {
    transports: ['websocket'],
  });

  socket.value.on('connect_error', (err) => {
    error.value = err.message;
  });

  socket.value.on('gameUpdate', (payload: GameState) => {
    applyGame(payload);
  });

  socket.value.emit(
    'joinGame',
    { gameId, playerId: userStore.user?.id },
    (res: any) => {
      if (res?.status === 'error') {
        error.value = res.message;
      } else if (res?.game) {
        applyGame(res.game);
      }
    },
  );
};

const makeMove = async (x: number, y: number) => {
  if (!game.value) return;
  if (!playerSymbol.value) return;
  if (board.value[x][y] !== null) return;
  if (game.value.status !== 'playing') return;
  if (!game.value.isBotGame && !isMyTurn.value) return;

  const index = x * 3 + y;

  try {
    if (game.value.isBotGame) {
      const res = await axios.post(
        `http://localhost:3000/tic-tac-toe/move/${gameId}`,
        { index, playerId: userStore.user?.id },
      );
      applyGame(res.data);
    } else {
      socket.value?.emit(
        'makeMove',
        { gameId, playerId: userStore.user?.id, index },
        (res: any) => {
          if (res?.status === 'error') {
            error.value = res.message;
          }
        },
      );
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || e.message;
  }
};

onMounted(loadGame);
onBeforeUnmount(() => {
  socket.value?.disconnect();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900 from-gray-700 via-gray-800 to-gray-900 text-white p-6">
    <h1 class="text-4xl md:text-5xl font-extrabold mt-10 drop-shadow-lg text-purple-400">Tic-Tac-Toe</h1>

    <div v-if="loading" class="mt-6 text-lg">Загрузка игры...</div>
    <div v-else class="w-full flex flex-col items-center">
      <p v-if="error" class="text-red-400 mb-3">{{ error }}</p>
      <p class="text-lg mb-3">
        Ваша сторона:
        <span class="font-bold text-blue-300">{{ playerSymbol ?? 'наблюдатель' }}</span>
      </p>
      <p class="mb-4 text-gray-300">{{ statusText }}</p>

      <div class="flex flex-col gap-4 items-center mb-6 bg-black/100 p-6 rounded-xl shadow-2xl">
        <div v-for="(row, x) in board" :key="x" class="flex gap-4">
          <div v-for="(cell, y) in row" :key="y" @click="makeMove(x, y)"
            :class="[
              'w-24 h-24 md:w-28 md:h-28 bg-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center text-5xl md:text-6xl font-bold cursor-pointer rounded-lg shadow-inner',
              (game?.status !== 'playing' || cell !== null || (!game?.isBotGame && !isMyTurn)) ? 'opacity-70' : '',
            ]">
            {{ cell === "X" ? "❌" : cell === "O" ? "⭕️" : "" }}
          </div>
        </div>
      </div>

      <h2 v-if="resultText" class="text-3xl md:text-4xl font-bold text-green-400 mb-4 drop-shadow-lg">
        {{ resultText }}
      </h2>

      <RouterLink to="/games/create"
        class=" cursor-pointer mt-4 px-6 py-3 bg-red-400 text-black font-semibold rounded-xl hover:bg-red-500 transition-colors duration-300 shadow-lg">
        Новая игра
      </RouterLink>
    </div>
  </div>
</template>
