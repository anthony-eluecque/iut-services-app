// Utilities
import { InputFieldType, Item, Lesson, Teacher } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'

type Pagination = {
  rowsPerPage : number,
  page : number
}

// L'interface du store
interface RootState {
  isCreatingItem : boolean
  inputField : InputFieldType
  dataRows : Item[],
  pagination : Pagination
  dataRowsCopy : Item[] // A SUPPRIMER QUAND L API DISPO
}

const initPagination = () : Pagination => {
  return {
    page : 1,
    rowsPerPage : 5  
  }
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
  const fakeData = generateFakerArrayItem()
  return {
    dataRows : fakeData,
    isCreatingItem : false,
    inputField : initInputField(),
    pagination : initPagination(),
    dataRowsCopy : structuredClone(fakeData)
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
    },
    getPages() : number{
      return Math.ceil(this.dataRowsCopy.length / this.pagination.rowsPerPage)
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
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber
      const pagination = { ...this.pagination }
      // Ajouter la logique API à la place
      const start = (pagination.page - 1) * pagination.rowsPerPage
      const end = (pagination.page) * pagination.rowsPerPage

      this.dataRows = this.dataRowsCopy.slice(start,end)
    }
  }
})
