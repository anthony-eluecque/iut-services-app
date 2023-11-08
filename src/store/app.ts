// Utilities
import { InputFieldType, Item, User, Lesson, Teacher,Pagination, Alert } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData, postItem} from '@/api'
import { initStore } from './initStore'
import { postTeacher } from '@/api/helpers/Item'
import { Criterias } from '@/types/criterias.types';
import { ReponseItemsPage } from '@/types/response-items-page'
import { UserCriterias } from '@/types/userCriterias.types'
import { ResponseUsersPage } from '@/types/user-items-page'

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
  currentUpdateUser : User|null,
  currentDeleteUser : User|null,
  teachers : Teacher[]
  lessons : Lesson[]
  users: User[]
  criterias: Criterias,
  alert : Alert
  userCriterias: UserCriterias
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
      return this.dataRows.reduce((acc, item) => acc + 
        item.lessonTypes.reduce((acc,type) => acc+type.amountHours 
        ,0)
      ,0)
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
    getUsers: (state) : User[] => {
      return state.users;
    },
    getUpdatingTeacher: (state): Teacher|null => {
      return state.currentUpdateTeacher || null;
    },
    getDeletingTeacher: (state): Teacher|null => {
      return state.currentDeleteTeacher;
    },
    getDeletingUser: (state): User|null => {
      return state.currentDeleteUser;
    },
    getUpdatingUser: (state): User|null => {
      return state.currentUpdateUser;
    },
    getLessons: (state) : Lesson[] => {
      return state.lessons
    },
    getCurrentIndexPage: (state) : number => {
      return state.pagination.page
    },
    getAlert : (state) :  Alert => {
      return state.alert
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
    setUpdateUser(newValue: User | null) {
      this.currentUpdateUser = newValue;
    },
    setDeleteUser(newValue: User | null) {
      this.currentDeleteUser = newValue;
    },
    async addItem(item : Item){
      this.createAlert(
        'Item ajouté',
        'Votre item a bien été ajouté à la base de données',
        'success'
      );
      await postItem(item,this.currentYear)
      this.fetchItemsPage(this.pagination.page)
    },
    async addTeacher(teacher : Teacher){
      await postTeacher(teacher)
      this.fetchTeachers()
    },
    async addUser(user : User){
      await postData<User>(Routes.USERS,user)
      this.fetchUsersPage(this.pagination.page)
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
    async fetchUsersPage(pageNumber : number) {
      this.paginationHandler(pageNumber);
      const usersPageResponse : ResponseData<ResponseUsersPage> = await fetchData(
        `${Routes.USERS}/filter/${pageNumber}?lastName=${this.userCriterias.nom}&firstName=${this.userCriterias.prenom}&email=${this.userCriterias.email}`
      )
      const usersPage = extractData(usersPageResponse);
      this.users = usersPage.users;
      this.pagination.totalItems =  usersPage.count;
    },
    async sendCriteria(criterias : Criterias) {
      this.criterias = criterias;
      this.fetchItemsPage(1);
    },
    async sendUserCriterias(userCriterias : UserCriterias) {
      this.userCriterias = userCriterias;
      this.fetchUsersPage(1);
    },
    async fetchTeachers(){
      const data : ResponseData<Teacher[]> = await fetchData(Routes.TEACHERS)
      this.teachers = extractData(data)
    },
    async fetchLessons(){
      const data : ResponseData<Lesson[]> = await fetchData(Routes.LESSONS)
      this.lessons = extractData(data)
    },
    async fetchUsers(){
      const data : ResponseData<User[]> = await fetchData(Routes.USERS)
      this.users = extractData(data)
    },
    setStateDialog(newState : boolean){
      this.openUpdateCard = newState;
    },
    createAlert(title: string, text : string, type: typeof this.alert.type){
      this.alert.title = title;
      this.alert.text = text;
      this.alert.type = type,
      this.alert.display = true
      const interval = setInterval(() => {
        this.alert.display = false
        clearInterval(interval)
      },3000)
    }
  }
})