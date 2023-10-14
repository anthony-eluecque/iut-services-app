// Utilities
import { InputFieldType, Item, Lesson, Teacher,Pagination } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData, postItem} from '@/api'
import { initStore } from './initStore'
import { Criterias } from '@/types/criterias.types';
import { ReponseItemsPage } from '@/types/response-items-page'

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
  criterias: Criterias
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
      this.fetchItemsPage(this.pagination.page)
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },
    async fetchItemsPage(pageNumber : number) {
      this.paginationHandler(pageNumber);

      const itemsPageResponse : ResponseData<ReponseItemsPage> = await fetchData(
        `${Routes.ITEMS}/${pageNumber}?year=${this.currentYear}&id=${this.criterias.id}&lastName=${this.criterias.prenom}&firstName=${this.criterias.nom}&givenId=${this.criterias.ressource}&nameLesson=${this.criterias.libelle}`
      )

      const itemsPage = extractData(itemsPageResponse);
      this.dataRows = itemsPage.items;
      this.pagination.totalItems =  itemsPage.count;
    },
    async sendCriteria(criterias : Criterias) {
      this.criterias = criterias;
      this.fetchItemsPage(1);
    },
    setStateDialog(newState : boolean){
      this.openUpdateCard = newState;
    }
  }
})