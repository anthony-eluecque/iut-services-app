import { defineStore } from "pinia";
import router from "@/router";
import Axios from "@/api";

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedUser: localStorage.getItem('token') ? true : false, 
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
        errorAuth: null
    }),

    getters: {
        isLogged: (state) => state.isLoggedUser,
        getToken: (state) => state.token,
        getRefreshToken: (state) => state.refreshToken,
        getErrorAuth: (state) => state.errorAuth
    },

    actions: {
        login(email: string, password: string) {
            Axios.post("token", {email, password})
                .then(response => {
                    if (response.status == 200) {
                        const token = response.data.token;
                        const refreshToken = response.data.refreshToken;
                        localStorage.setItem('token', token);
                        localStorage.setItem('refreshToken', refreshToken)
                        this.$state.errorAuth = null;
                        this.$state.isLoggedUser = true;
                        this.$state.token = token;
                        router.push('/');
                    }
              })
              .catch((error) => {
                if (error.response.status == 404) {
                    this.$state.errorAuth = error.response.data.data.error;

                    this.$state.isLoggedUser = false;
                }
              });
        },

        logout() {
            this.$state.token = null;
            this.$state.refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            this.$state.isLoggedUser = false;
            router.push('/login');
        }
    }
});

 
