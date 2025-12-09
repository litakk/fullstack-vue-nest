<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/useStore';

const useUser = useUserStore()
const router = useRouter()

function logout() {
  useUser.logout()
  router.push("/login")
}

</script>

<template>
  <header class="bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-gray-200 shadow-md fixed w-full z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Left: Logo -->
      <div class="flex items-center gap-3">
        <RouterLink to="/">
          <img src="https://21-school.uz/assets/images/header/logo.svg" alt="Logo"
            class="h-10 w-auto transition-transform duration-300 hover:scale-105">
        </RouterLink>
      </div>

      <!-- Right: Navigation -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <RouterLink to="/" class="hover:text-white transition" active-class="text-green-400 font-bold">Главная
        </RouterLink>
        <RouterLink to="/games" class="hover:text-white transition" active-class="text-green-400 font-bold">Игры
        </RouterLink>
        <RouterLink to="/games/create" class="hover:text-white transition" active-class="text-green-400 font-bold">
          Создать игру</RouterLink>

        <button v-if="!useUser.isLoggedIn" @click="logout" class="hover:text-white transition cursor-pointer"
          active-class="text-green-400 font-bold">Войти</button>
        <button v-if="useUser.isLoggedIn" @click="logout" class="hover:text-white transition cursor-pointer"
          active-class="text-green-400 font-bold">Выйти</button>

      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-300 hover:text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </div>
  </header>
</template>