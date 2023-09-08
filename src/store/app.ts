// Utilities
import { InputFieldType, Item, Lesson, Teacher } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'

// L'interface du store
interface RootState {
  isCreatingItem : boolean
  inputField : InputFieldType
  dataRows : Item[]
}

// Reset / init les champs inputs au dessus
const initInputField = () : InputFieldType => {
  return {
    amountHours : 0,
    lesson : {
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
    dataRows : generateFakerArrayItem(),
    isCreatingItem : false,
    inputField : initInputField()
  }
}
// Créer un item du tableau (clean way)
const createItem = (teacher : Teacher, lesson : Lesson, amountHours : number) : Item => {
  return {
    amountHours : amountHours,
    lesson : lesson,
    teacher : teacher,
    Id : "" 
  }
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{
    getDataRows: (state) => {
      return state.dataRows;
    }
  }, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
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
      this.inputField = initInputField()
    },
    addItem(){
      const newTeacher = { ...this.inputField.teacher };
      const newLesson = { ...this.inputField.lesson };
      const newAmountHours = this.inputField.amountHours;
      const item = createItem(newTeacher, newLesson,newAmountHours);
      this.dataRows.push(item);
      // changer la logique avec l'API
    },
    removeItem(itemToDelete : Item){
      this.dataRows = this.dataRows.filter(item => item !== itemToDelete)
      // changer la logique avec l'API
    }
  }
})
