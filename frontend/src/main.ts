import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './routes'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { useUserStore } from './store/useStore'
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')

const useUser = useUserStore()

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      useUser.logout()
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
