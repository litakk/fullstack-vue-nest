<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useUserStore } from "../store/useStore"

const router = useRouter()
const email = ref("")
const password = ref("")
const error = ref("")

const useUser = useUserStore()

async function login() {
  try {
    const res = await axios.post("http://localhost:3000/users/login", {
      email: email.value,
      password: password.value,
    })

    const { user, token } = res.data

    useUser.setUser(user, token)

    router.push("/")
  } catch (e) {
    error.value = "Неверный email или пароль"
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
    <div class="bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-white">
      <h2
        class="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400">
        Login
      </h2>

      <form @submit.prevent="login">


        <input v-model="email" type="text" placeholder="Email"
          class="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" />

        <p v-if="error" class="text-red-400 mb-4">{{ error }}</p>

        <button type="submit"
          class="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 py-2 rounded-full font-semibold mb-2 hover:scale-105 transform transition">
          Login
        </button>
      </form>

      <RouterLink to="/register" class="w-full block text-center text-blue-400 hover:underline">
        Register
      </RouterLink>
    </div>
  </div>
</template>
