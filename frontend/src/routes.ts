import { createRouter, createWebHistory } from "vue-router";
import Home from "./page/Home.vue";
import Login from "./page/Login.vue";
import Register from "./page/Register.vue";
import Games from "./page/Games.vue";
import GameCreate from "./page/GameCreate.vue";
import ActiveGame from "./page/ActiveGame.vue";
import { useUserStore } from "./store/useStore";

export const router = createRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login, },
        { path: '/register', component: Register, },
        { path: '/games', component: Games, meta: { requiresAuth: true } },
        { path: '/games/create', component: GameCreate, meta: { requiresAuth: true }},
        { path: '/games/active/:id', component: ActiveGame, meta: { requiresAuth: true }},
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // получаем Pinia store

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login'); // если не залогинен, редирект на логин
  } else if ((to.path === '/login' || to.path === '/register') && userStore.isLoggedIn) {
    next('/'); // если залогинен и идёт на login/register, редирект на главную
  } else {
    next(); // разрешаем переход
  }
});