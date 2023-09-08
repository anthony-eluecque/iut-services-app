// Utilities
import { InputFieldType } from '@/types'
import { defineStore } from 'pinia'

interface RootState {
  isCreatingItem : boolean
  inputField : InputFieldType
}

const initInputField = () : InputFieldType => {
  return {
    lesson : {
      amountHours : 0,
      givenId : "",
      Id : "",
      label : ""
    },
    teacher : {
      firstname : "",
      givenId : "",
      Id : "",
      lastname : ""
    }
  }
}

// Méthode d'appel pour initialiser le store
const initStore = () : RootState => {
  return {
    isCreatingItem : false,
    inputField : initInputField()
  }
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{}, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
  actions:{ // Actions => changer un état => une méthode, JAMAIS CHANGER EN DEHORS DE CES METHODES IMPORTANT
    editIsCreatingItem(newState : boolean) {
      this.isCreatingItem = newState;
    },
    setInputFieldValue<K extends keyof InputFieldType, F extends keyof InputFieldType[K]>(
      objName: K,
      fieldName: F,
      newValue: InputFieldType[K][F]
    ) {
      this.inputField[objName][fieldName] = newValue;
    },
    clearInputField(){
      this.inputField.teacher.givenId = '';
      this.inputField.teacher.firstname = '';
      this.inputField.teacher.lastname = '';
      this.inputField.lesson.givenId = '';
      this.inputField.lesson.label = '';
      this.inputField.lesson.amountHours = 0;
    }
    
  }
})
