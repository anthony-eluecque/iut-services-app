// Utilities
import { InputFieldType, Item, Lesson, Teacher } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData, postItem} from '@/api'

type Pagination = {
  rowsPerPage : number,
  page : number
  totalItems : number
}

// L'interface du store
interface RootState {
 // inputField : InputFieldType
  dataRows : Item[],
  token ?: string,
  pagination : Pagination,
  currentYear : number
  editingIndex : number | null
}

const initPagination = () : Pagination => {
  return {
    page : 1,
    rowsPerPage : 5,
    totalItems : 5
  }
}

// Méthode d'appel pour initialiser le store
const initStore = () : RootState => {
  // const fakeData = generateFakerArrayItem()
  return {
    dataRows : [],
    // inputField : initInputField(), 
    editingIndex : null,
    token : undefined,
    pagination : initPagination(),
    currentYear : new Date().getFullYear()
  };
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{
    getDataRows: (state) : Item[] => {
      return state.dataRows;
    },
    getPages() : number{
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    getEditingIndex: (state) : number|null => {
      return state.editingIndex;
    }
  }, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
  actions:{ // Actions => changer un état => une méthode, JAMAIS CHANGER EN DEHORS DE CES METHODES IMPORTANT
    setEditingIndex(index : number|null){
      this.editingIndex = index;
    },
    async addItem(item : Item){
      await postItem(item,this.currentYear)
      this.fetchItems(this.pagination.page)
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },
    async fetchItems(pageNumber : number){
      const data : ResponseData<Item[]> = await fetchData(Routes.ITEMS);
      this.pagination.totalItems =  extractData(data).length
      this.paginationHandler(pageNumber);
      const dataFromPage : ResponseData<Item[]> = await fetchData(
        `${Routes.ITEMS}/${this.pagination.page.toString()}?year=${this.currentYear}`
      )

      this.dataRows = extractData(dataFromPage);
    }

  }
})