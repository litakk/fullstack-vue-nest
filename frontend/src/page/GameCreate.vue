<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/useStore';

const userStore = useUserStore();
const router = useRouter();

const createBotGame = async () => {
  if (!userStore.user?.id) {
    alert('Нужно войти в аккаунт');
    return;
  }
  try {
    const res = await axios.post('http://localhost:3000/tic-tac-toe/create', {
      playerId: userStore.user?.id,
    });
    router.push(`/games/active/${res.data?.id}`);
  } catch (e) {
    console.error(e);
    alert('Не удалось создать игру с ботом');
  }
};

const createMultiplayerGame = async () => {
  if (!userStore.user?.id) {
    alert('Нужно войти в аккаунт');
    return;
  }
  try {
    const res = await axios.post(
      'http://localhost:3000/multiplayer-tic-tac-toe/create',
      { playerId: userStore.user?.id },
    );
    router.push(`/games/active/${res.data?.id}`);
  } catch (e) {
    console.error(e);
    alert('Не удалось создать мультиплеерную игру');
  }
};
</script>

<template>
  <main
    class="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white overflow-hidden flex items-center justify-center">

    <!-- Stars background -->
    <div class="absolute inset-0">
      <div
        class="absolute w-full h-full animate-starfield bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      </div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 bg-gradient-to-r from-indigo-900 via-purple-800 to-black p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full">

      <h1
        class="text-4xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 ">
        Создать игру
      </h1>

      <div class="flex flex-col sm:flex-row gap-6 justify-center">

        <p @click="createBotGame"
          class="relative inline-block px-3 py-5 font-bold text-lg bg-gradient-to-r from-via-purple-500 via-pink-600 to-teal-600 rounded-full shadow-lg text-white hover:scale-105 transform transition duration-300 before:absolute before:-inset-1 before:bg-gradient-to-r  before:rounded-full">
          Играть vs Компьютер
        </p>

        <p @click="createMultiplayerGame"
          class="relative inline-block px-3 py-5 font-bold text-lg bg-gradient-to-r from-via-purple-500 via-pink-600 to-teal-600 rounded-full shadow-lg text-white hover:scale-105 transform transition duration-300 before:absolute before:-inset-1 before:bg-gradient-to-r  before:rounded-full">
          Играть vs Игрок
      </p>
      </div>

    </div>

  </main>
</template>

<style>
@keyframes starfield {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -1000px 1000px;
  }
}

.animate-starfield {
  animation: starfield 200s linear infinite;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 10px #ff79c6, 0 0 20px #bd93f9, 0 0 30px #8be9fd;
  }

  100% {
    text-shadow: 0 0 20px #ff79c6, 0 0 40px #bd93f9, 0 0 60px #8be9fd;
  }
}
</style>
