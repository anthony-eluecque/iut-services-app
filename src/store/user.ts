import { defineStore } from "pinia";
import router from "@/router";
import Axios from "@/api";

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedUser: localStorage.getItem('token') ? true : true, 
    token: localStorage.getItem('token'),
    errorAuth: null
  }),

  getters: {
    isLogged: (state) => state.isLoggedUser,
    getToken: (state) => state.token,
    getErrorAuth: (state) => state.errorAuth
  },

  actions: {
    login(email: string, password: string) {
      Axios.post("login", {email, password})
        .then(response => {
          if (response.status == 200) {
            const token = response.data.token;
            localStorage.setItem('token', token)
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
    }
  }
});

 
