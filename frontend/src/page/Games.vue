<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/useStore';

interface GameItem {
  id: string;
  playerXId: string;
  createdAt?: string;
}

const router = useRouter();
const userStore = useUserStore();
const games = ref<GameItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const loadGames = async () => {
  try {
    loading.value = true;
    const res = await axios.get('http://localhost:3000/multiplayer-tic-tac-toe/available');
    games.value = res.data || [];
  } catch (e: any) {
    error.value = e?.response?.data?.message || e.message;
  } finally {
    loading.value = false;
  }
};

const join = (gameId: string) => {
  router.push(`/games/active/${gameId}`);
};

onMounted(loadGames);
</script>

<template>
  <main class="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute w-full h-full animate-starfield bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto py-16 px-6">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400">
        Доступные игры
      </h1>

      <p v-if="loading" class="text-center text-lg">Загрузка...</p>
      <p v-if="error" class="text-center text-red-400 mb-4">{{ error }}</p>

      <ul v-if="!loading && games.length" class="space-y-6">
        <li v-for="game in games" :key="game.id"
          class="bg-gradient-to-r from-purple-800 via-indigo-900 to-black p-6 rounded-2xl shadow-xl flex justify-between items-center hover:scale-105 transform transition cursor-pointer">
          <span class="text-lg font-semibold text-pink-300">
            Игра #{{ game.id.slice(-6) }} — создатель {{ game.playerXId === userStore.user?.id ? 'Вы' : game.playerXId }}
          </span>
          <button @click="join(game.id)"
            class="bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-full text-white font-medium shadow-lg transition transform hover:scale-105">
            Присоединиться
          </button>
        </li>
      </ul>

      <p v-if="!loading && !games.length" class="text-center text-gray-200 mt-6">
        Пока нет открытых игр. Создайте первую!
      </p>

      <div class="mt-12 text-center">
        <RouterLink
          to="/games/create"
          class="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 px-10 py-3 rounded-full text-lg font-bold shadow-xl hover:scale-110 transform transition"
        >
          Создать новую игру
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style>
@keyframes starfield {
  0% { background-position: 0 0; }
  100% { background-position: -1000px 1000px; }
}

.animate-starfield {
  animation: starfield 200s linear infinite;
}

.animate-text-glow {
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  0% { text-shadow: 0 0 10px #ff79c6, 0 0 20px #bd93f9, 0 0 30px #8be9fd; }
  100% { text-shadow: 0 0 20px #ff79c6, 0 0 40px #bd93f9, 0 0 60px #8be9fd; }
}
</style>
