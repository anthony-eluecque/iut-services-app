// Utilities
import { InputFieldType, Item, Lesson, Teacher } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import { ResponseData, Routes, extractData, fetchData} from '@/api'

type Pagination = {
  rowsPerPage : number,
  page : number
  totalItems : number
}

// L'interface du store
interface RootState {
  isCreatingItem : boolean
  inputField : InputFieldType
  dataRows : Item[],
  pagination : Pagination,
}

const initPagination = () : Pagination => {
  return {
    page : 1,
    rowsPerPage : 5,
    totalItems : 5
  }
}

// Reset / init les champs inputs au dessus
const initInputField = () : InputFieldType => {
  return {
    amountHours : 0,
    lesson : {
      givenId : "",
      Id : "",
      name : ""
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
  // const fakeData = generateFakerArrayItem()
  return {
    dataRows : [],
    isCreatingItem : false,
    inputField : initInputField(),
    pagination : initPagination(),
  };
}

// Créer un item du tableau (clean way)
const createItem = (teacher : Teacher, lesson : Lesson, amountHours : number) : Item => {
  return {
    amountHours : amountHours,
    lesson : lesson,
    teacher : teacher,
    type : "",
    Id : "" 
  };
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{
    getDataRows: (state) => {
      return state.dataRows;
    },
    getPages() : number{
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
      // Voir avec le clone dataRowsCopy
    },
    removeItem(itemToDelete : Item){
      this.dataRows = this.dataRows.filter(item => item !== itemToDelete)
      // changer la logique avec l'API
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },
    async fetchItems(pageNumber : number){
      try {
        const data : ResponseData<Item[]> = await fetchData(Routes.ITEMS);
        this.pagination.totalItems =  extractData(data).length
        this.paginationHandler(pageNumber);
        const dataFromPage : ResponseData<Item[]> = await fetchData(`${Routes.ITEMS}/${this.pagination.page.toString()}`)
        this.dataRows = extractData(dataFromPage)

      } catch (error) {
        throw error
      }
    }

  }
})