<script setup>
</script>

<template>
<footer class="bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-gray-300 py-10 relative overflow-hidden">
  <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1508610048659-a06f9a6d81bc?auto=format&fit=crop&w=1350&q=80')] bg-cover blur-xl"></div>
  
  <div class="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
    <!-- Logo + About -->
    <div>
      <div class="flex items-center gap-3 mb-4">
        <img src="https://21-school.uz/assets/images/header/logo.svg" class="h-10 w-auto" alt="School 21 Logo">
        <span class="text-lg font-semibold text-white">School 21 Project</span>
      </div>
      <p class="text-gray-400 text-sm leading-relaxed">
        Учебный проект в рамках программы School 21.  
        Цель — освоение принципов декомпозиции, анализа и архитектуры систем.
      </p>
    </div>

    <!-- Links -->
    <div>
      <h3 class="text-white font-semibold mb-4 text-lg">Навигация</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-green-400 transition-colors">Главная</a></li>
        <li><a href="#" class="hover:text-green-400 transition-colors">Проект</a></li>
        <li><a href="#" class="hover:text-green-400 transition-colors">Задания</a></li>
        <li><a href="#" class="hover:text-green-400 transition-colors">Контакты</a></li>
      </ul>
    </div>

    <!-- Contacts -->
    <div>
      <h3 class="text-white font-semibold mb-4 text-lg">Контакты</h3>
      <ul class="space-y-2 text-sm">
        <li>Email: <span class="text-gray-400">info@school21.com</span></li>
        <li>Телефон: <span class="text-gray-400">+998 90 000 00 00</span></li>
        <li>Адрес: <span class="text-gray-400">Ташкент, Узбекистан</span></li>
      </ul>
    </div>
  </div>

  <!-- Bottom line -->
  <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 relative">
    © 2025 School 21 Project. Все права защищены.
  </div>
</footer>
</template>
