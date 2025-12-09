<script setup>
</script>

<template>
  <main class="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white overflow-hidden">

    <!-- Stars background -->
    <div class="absolute inset-0 bg-black/60">
      <div class="absolute top-0 left-0 w-full h-full animate-starfield bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
      <h1 class="text-5xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-800 to-indigo-400 ">
        School 21 Galactic Games
      </h1>
      <p class="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl">
        Погрузись в космическую вселенную игр! Создавай комнаты, подключайся к друзьям и сражайся в реальном времени.  
        В каждой игре — новая галактика, новые приключения.
      </p>

      <div class="flex flex-col sm:flex-row gap-6">
        <RouterLink
          to="/games/create"
          class="relative inline-block px-8 py-4 font-bold text-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 rounded-full shadow-lg text-white hover:scale-105 transform transition duration-300 before:absolute before:-inset-1 before:bg-gradient-to-r    before:rounded-full"
        >
          Создать игру
        </RouterLink>

        <RouterLink
          to="/games"
          class="relative inline-block px-8 py-4 font-bold text-lg border-2 border-white rounded-full text-white hover:text-black hover:bg-white transition duration-300"
        >
          Смотреть игры
        </RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <div class="bg-gradient-to-tr from-purple-800 via-indigo-900 to-black p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
        <h3 class="font-bold text-xl mb-2 text-pink-400">Быстрое подключение</h3>
        <p class="text-gray-300 text-sm">Присоединяйся к любой игре мгновенно и сражайся в космосе.</p>
      </div>

      <div class="bg-gradient-to-tr from-indigo-900 via-purple-800 to-black p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
        <h3 class="font-bold text-xl mb-2 text-purple-400">Создание галактических игр</h3>
        <p class="text-gray-300 text-sm">Создай свою комнату и управляй своей космической вселенной.</p>
      </div>

      <div class="bg-gradient-to-tr from-black via-purple-900 to-indigo-900 p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
        <h3 class="font-bold text-xl mb-2 text-indigo-400">Уникальный интерфейс</h3>
        <p class="text-gray-300 text-sm">Современный космический стиль с анимациями и эффектами свечения.</p>
      </div>
    </section>

    <!-- Call To Action Section -->
    <section class="relative z-10 text-center py-20">
      <h2 class="text-3xl md:text-4xl font-extrabold mb-10 text-gradient ">
        Готов отправиться в космос?
      </h2>
      <RouterLink
        to="/games/create"
        class="px-10 py-4 text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 rounded-full shadow-xl text-white hover:scale-110 transform transition duration-300"
      >
        Создать игру
      </RouterLink>
    </section>

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
