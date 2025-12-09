<script setup lang="ts">
import axios from "axios"
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const email = ref("")
const name = ref("")
const password = ref("")
const confirmPassword = ref("")

const error = ref("")

async function register() {

  if (password.value !== confirmPassword.value) {
    error.value = "Пароли не совпадают!"
    return
  }

  try {
    await axios.post("http://localhost:3000/users/register", {
      email: email.value,
      name: name.value,
      password: password.value,
    })

    router.push("/login")
    console.log("Регистрация прошла успешно");
    
  }
  catch (e) {
    console.log(e);

  }
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
    <div class="bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-white">
      <h2
        class="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-teal-400">
        Register
      </h2>

      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required
          class="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" />

        <input v-model="name" type="text" placeholder="Name" required
          class="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" />

        <input v-model="password" type="password" placeholder="Password" required
          class="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" />

        <input v-model="confirmPassword" type="password" placeholder="Confirm Password"
          class="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white" />

        <p v-if="error" class="text-red-400 mb-4"> {{ error }}</p>

        <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>

      <RouterLink to="/login" class="w-full block text-center text-green-400 hover:underline mt-4">
        Back to Login
      </RouterLink>
    </div>
  </div>
</template>

<style>
.animate-text-glow {
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 10px #50fa7b, 0 0 20px #8be9fd, 0 0 30px #bd93f9;
  }

  100% {
    text-shadow: 0 0 20px #50fa7b, 0 0 40px #8be9fd, 0 0 60px #bd93f9;
  }
}
</style>
