import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | { id: string; name: string; email: string },
        token: null as null | string,
    }),

    actions: {
        setUser(userData: { id: string; name: string; email: string }, token: string) {
            this.user = userData
            this.token = token
        },
        logout() {
            this.user = null
            this.token = null
        }
    },

    getters: {
        isLoggedIn: (state) => !!state.user && !!state.token
    },

    persist: true
})
