// Utilities
import { InputFieldType, Item, Lesson, Teacher,Pagination } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData, postItem} from '@/api'
import { initStore } from './initStore'
import { Criterias } from '@/types/criterias.types'

// L'interface du store
export interface RootState {
 // inputField : InputFieldType
  dataRows : Item[],
  dataRowsFiltres : Item[],
  token ?: string,
  pagination : Pagination,
  currentYear : number
  editingIndex : number | null
  openUpdateCard : boolean
  currentUpdateItem : Item|null
  criterias: Criterias
  message: string | null;
  loadInProgress: boolean;
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{
    getLoadInProgress: (state): boolean => {
      return state.loadInProgress;
    },
    getDataRows: (state) : Item[] => {
      return state.dataRows;
    },
    getDataRowsFiltres: (state): Item[] => {
      return state.dataRowsFiltres.slice(state.pagination.rowsPerPage * (state.pagination.page - 1), 
      state.pagination.rowsPerPage * state.pagination.page);
    },
    getPages() : number{
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    getEditingIndex: (state) : number|null => {
      return state.editingIndex;
    },
    getServiceHours() : number {
      return this.dataRowsFiltres.reduce((acc, item) => acc + item.amountHours, 0)
    },
    getOpenDialog(): boolean {
      return this.openUpdateCard;
    },
    getUpdatingItem : (state) : Item|null => {
      return state.currentUpdateItem;
    },
    getMessage: (state) : string | null => {
      return state.message;
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
      const itemAdd = await postItem(item,this.currentYear)
      this.dataRows.push(itemAdd);
      this.message = "Ajout du service avec succès !";

      // Suppression du message au bout de 2s
      setTimeout(() => {
        this.message = null;
      }, 2000);
    },
    async removeItem(itemToDelete : Item) {
      await deleteItem(Routes.ITEMS,itemToDelete.id);
      let indexToDelete = this.dataRows.findIndex((item) => item.id == itemToDelete.id);
      this.dataRows.splice(indexToDelete, 1);

      this.dataRowsFiltres = this.dataRows;
      indexToDelete = this.dataRowsFiltres.findIndex((item) => item.id == itemToDelete.id);
      this.dataRowsFiltres.splice(indexToDelete, 1);
      this.pagination.totalItems = this.dataRowsFiltres.length;
      this.message = "Suppression du service avec succès";

      // Suppression du message au bout de 2s
      setTimeout(() => {
        this.message = null;
      }, 2000);
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },
    async fetchItems() {
      this.loadInProgress = true;
      const data : ResponseData<Item[]> = await fetchData(Routes.ITEMS+`/year/${this.currentYear}`);
      this.pagination.totalItems =  extractData(data).length
      this.paginationHandler(1);

      this.dataRows = extractData(data);
      this.dataRowsFiltres = this.dataRows;
      this.loadInProgress = false;
    },
    setStateDialog(newState : boolean){
      this.openUpdateCard = newState;
    },
    setUpdateCriterias(criterias: Criterias) {
      this.criterias = criterias;

      let dataRows = this.dataRows;
      
      if (criterias?.id) {
         dataRows = dataRows.filter((item => item.service?.teacher?.givenId?.toLowerCase() === criterias?.id?.toLowerCase()));
      }

      if (criterias?.nom) {
        dataRows = dataRows.filter((item => item.service?.teacher?.lastName?.toLowerCase() === criterias?.nom?.toLowerCase()));
     }    
     
     if (criterias?.prenom) {
      dataRows = dataRows.filter((item => item.service?.teacher?.firstName?.toLowerCase() === criterias?.prenom?.toLowerCase()));
     }

     if (criterias?.ressource) {
      dataRows = dataRows.filter((item => item.lesson?.givenId?.toLowerCase() === criterias?.ressource?.toLowerCase()));
     }      

     if (criterias?.libelle) {
      dataRows = dataRows.filter((item => item.lesson?.name?.toLowerCase() === criterias?.libelle?.toLowerCase()));
     }      

     this.dataRowsFiltres = dataRows;

     // On va déterminer la pagination
     this.pagination.page = dataRows.length > 0 ? 1 : 0;
     this.pagination.totalItems = dataRows.length;
    }
  }
})