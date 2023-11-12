import { defineStore } from "pinia";
import { User } from '@/types'

interface UserStoreState {
  user : User|null
}

/**
 * Définit l'état initial de la gestion des utilisateurs.
 *
 * @returns {UserStoreState} - L'état initial de la gestion des utilisateurs.
 */
const initStore = () => {
  return {
    user : null
  }
}

/**
 * Gère l'état des utilisateurs avec des getters et des actions.
 */
export const useUserStore = defineStore('user', {
  state: (): UserStoreState => initStore(),
  getters : {
    /**
     * Récupère l'utilisateur actuellement enregistré.
     *
     * @param {UserStoreState} state - L'état actuel de la gestion des utilisateurs.
     * @returns {User} - L'utilisateur actuellement enregistré.
     */
    getUser : (state) : User => state.user as User,
  },
  actions : {
    /**
     * Modifie l'utilisateur actuellement enregistré.
     *
     * @param {User} newUser - Le nouvel utilisateur à enregistrer.
     */
    setUser(newUser : User) : void {
      this.user = newUser;
    },
  }
});

 
