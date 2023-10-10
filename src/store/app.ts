// Utilities
import { InputFieldType, Item, Lesson, Teacher,Pagination } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, fetchDataFilter, postData, postItem} from '@/api'
import { initStore } from './initStore'
import { Criterias } from '@/types/criterias.types';

// L'interface du store
export interface RootState {
 // inputField : InputFieldType
  dataRows : Item[],
  token ?: string,
  pagination : Pagination,
  currentYear : number
  editingIndex : number | null
  openUpdateCard : boolean
  currentUpdateItem : Item|null
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
    },
    getServiceHours() : number {
      return this.dataRows.reduce((acc, item) => acc + item.amountHours, 0)
    },
    getOpenDialog(): boolean {
      return this.openUpdateCard;
    },
    getUpdatingItem : (state) : Item|null => {
      return state.currentUpdateItem;
    }
  }, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
  actions:{ // Actions => changer un état => une méthode, JAMAIS CHANGER EN DEHORS DE CES METHODES IMPORTANT
    setEditingIndex(index : number|null){
      this.editingIndex = index;
    },
    setUpdateItem(newValue : Item | null){
      this.currentUpdateItem = newValue;
    },
    async addItem(item : Item){
      await postItem(item,this.currentYear)
      this.fetchItems(this.pagination.page)
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },
    async fetchItems(pageNumber : number){
      const data : ResponseData<Item[]> = await fetchData(Routes.ITEMS+`/year/${this.currentYear}`);
      this.pagination.totalItems =  extractData(data).length
      this.paginationHandler(pageNumber);
      const dataFromPage : ResponseData<Item[]> = await fetchData(
        `${Routes.ITEMS}/${this.pagination.page.toString()}?year=${this.currentYear}`
      )
      this.dataRows = extractData(dataFromPage);
    },
    async sendCriteria(criterias : Criterias) {
      const dataFromPage : ResponseData<Item[]> = await fetchDataFilter(
        `${Routes.ITEMS}/search`, {year: 2023, criterias}
      );
    },
    setStateDialog(newState : boolean){
      this.openUpdateCard = newState;
    }

  }
})