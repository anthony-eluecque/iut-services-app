// Utilities
import { defineStore } from 'pinia'

// Utile pour typer son store
interface RootState {
  isCreatingItem : boolean
}

// Méthode d'appel pour initialiser le store
const initStore = () : RootState => {
  return {
    isCreatingItem : false
  }
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{}, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
  actions:{ // Actions => changer un état => une méthode, JAMAIS CHANGER EN DEHORS DE CES METHODES IMPORTANT
    editIsCreatingItem(newState : boolean) {
      this.isCreatingItem = newState;
    }
  }
})
