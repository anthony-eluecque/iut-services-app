// Utilities
import { InputFieldType, Item, Lesson, Teacher,Pagination } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData, postItem} from '@/api'
import { initStore } from './initStore'
import { postTeacher } from '@/api/helpers/Item'
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
  currentUpdateItem : Item|null,
  currentUpdateTeacher : Teacher|null,
  currentDeleteTeacher : Teacher|null,
  teachers : Teacher[]
  lessons : Lesson[]
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
    },
    getTeachers: (state) : Teacher[] => {
      return state.teachers;
    },
    getUpdatingTeacher: (state): Teacher|null => {
      return state.currentUpdateTeacher || null;
    },
    getDeletingTeacher: (state): Teacher|null => {
      return state.currentDeleteTeacher;
    },
    getLessons: (state) : Lesson[] => {
      return state.lessons
    },
    getCurrentIndexPage: (state) : number => {
      return state.pagination.page
    }
  }, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
  actions:{ // Actions => changer un état => une méthode, JAMAIS CHANGER EN DEHORS DE CES METHODES IMPORTANT
    setEditingIndex(index : number|null){
      this.editingIndex = index;
    },
    setUpdateItem(newValue : Item | null){
      this.currentUpdateItem = newValue;
    },
    setUpdateTeacher(newValue: Teacher | null) {
      this.currentUpdateTeacher = newValue;
    },
    setDeleteTeacher(newValue: Teacher | null) {
      this.currentDeleteTeacher = newValue;
    },
    async addItem(item : Item){
      await postItem(item,this.currentYear)
      this.fetchItemsPage(this.pagination.page)
    },
    async addTeacher(teacher : Teacher){
      await postTeacher(teacher)
      this.fetchTeachers()
    },
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },
    async fetchItemsPage(pageNumber : number) {
      this.paginationHandler(pageNumber);
      const itemsPageResponse : ResponseData<ReponseItemsPage> = await fetchData(
        `${Routes.ITEMS}/${pageNumber}?year=${this.currentYear}&id=${this.criterias.id}&lastName=${this.criterias.nom}&firstName=${this.criterias.prenom}&givenId=${this.criterias.ressource}&nameLesson=${this.criterias.libelle}`
      )
      const itemsPage = extractData(itemsPageResponse);
      this.dataRows = itemsPage.items;
      this.pagination.totalItems =  itemsPage.count;
    },
    async sendCriteria(criterias : Criterias) {
      this.criterias = criterias;
      this.fetchItemsPage(1);
    },
    async fetchTeachers(){
      const data : ResponseData<Teacher[]> = await fetchData(Routes.TEACHERS)
      this.teachers = extractData(data)
    },
    async fetchLessons(){
      const data : ResponseData<Lesson[]> = await fetchData(Routes.LESSONS)
      this.lessons = extractData(data)
    },
    setStateDialog(newState : boolean){
      this.openUpdateCard = newState;
    }
  }
})