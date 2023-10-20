import { defineStore } from "pinia";
import router from "@/router";
import Axios from "@/api";
import { User } from '@/types'

interface UserStoreState {
  user : User|null
}

const initStore = () => {
  return {
    user : null
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => initStore(),
  getters : {
    getUser : (state) : User => state.user as User,
  },
  actions : {
    setUser(newUser : User) : void {
      this.user = newUser;
    },
  }
});

 
