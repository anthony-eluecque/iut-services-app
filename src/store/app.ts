// Utilities
import { InputFieldType, Item, User, Lesson, Teacher,Pagination, Alert } from '@/types'
import { defineStore } from 'pinia'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData, postItem} from '@/api'
import { initStore } from './initStore'
import { postTeacher } from '@/api/helpers/Item'
import { Criterias } from '@/types/criterias.types';
import { ReponseItemsPage } from '@/types/response-items-page'
import { UserCriterias } from '@/types/userCriterias.types'
import { ResponseUsersPage } from '@/types/user-items-page'


/**
 * Store de l'application pour la gestion de l'état de l'application.
 *
 * @property {Item[]} dataRows - Les lignes de données actuelles.
 * @property {number|null} editingIndex - L'index de l'élément en cours d'édition, null s'il n'y en a pas.
 * @property {Teacher[]} teachers - La liste des enseignants.
 * @property {User[]} users - La liste des utilisateurs.
 * @property {Lesson[]} lessons - La liste des cours.
 * @property {number} currentYear - L'année universitaire en cours.
 * @property {Criterias} criterias - Les critères de recherche pour les éléments.
 * @property {UserCriterias} userCriterias - Les critères de recherche pour les utilisateurs.
 * @property {Pagination} pagination - Les paramètres de pagination.
 * @property {boolean} openUpdateCard - Indique si la carte de mise à jour est ouverte.
 * @property {Item|null} currentUpdateItem - L'élément en cours de mise à jour.
 * @property {Teacher|null} currentUpdateTeacher - L'enseignant en cours de mise à jour.
 * @property {Teacher|null} currentDeleteTeacher - L'enseignant en cours de suppression.
 * @property {User|null} currentUpdateUser - L'utilisateur en cours de mise à jour.
 * @property {User|null} currentDeleteUser - L'utilisateur en cours de suppression.
 * @property {boolean} isDisplayParams - Indique si les paramètres sont affichés.
 * @property {Alert} alert - Les informations sur l'alerte à afficher.
 */

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
  alert : Alert
  userCriterias: UserCriterias
  criterias: Criterias
  isDisplayParams: boolean;
}

export const useAppStore = defineStore('app', {
  state: () : RootState => initStore(),
  getters:{
    /**
      * Récupère les lignes de données actuelles.
      *
      * @returns {Item[]} Les lignes de données actuelles.
    */
    getDataRows: (state) : Item[] => {
      return state.dataRows;
    },


    /**
      * Récupère le nombre total de pages en fonction des éléments par page.
      *
      * @returns {number} Le nombre total de pages.
    */
    getPages() : number{
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },


    /**
      * Récupère l'index de l'élément en cours d'édition, null s'il n'y en a pas.
      *  
      * @returns {number|null} L'index de l'élément en cours d'édition, null s'il n'y en a pas.
    */
    getEditingIndex: (state) : number|null => {
      return state.editingIndex;
    },


    /**
      * Calcule le total des heures pour le service sélectionné.
      *
      * @returns {number} Le total des heures pour le service sélectionné.
    */
    getServiceHours() : number {
      return this.dataRows.reduce((acc, item) => acc + 
        item.lessonTypes.reduce((acc,type) => acc+type.amountHours 
        ,0)
      ,0)
    },


    /**
     * Indique si la carte de mise à jour est ouverte.
     *
     * @returns {boolean} true si la carte de mise à jour est ouverte, sinon false.
    */
    getOpenDialog(): boolean {
      return this.openUpdateCard;
    },


    /**
     * Récupère l'élément en cours de mise à jour.
     *
     * @returns {Item|null} L'élément en cours de mise à jour, null s'il n'y en a pas.
    */
    getUpdatingItem : (state) : Item|null => {
      return state.currentUpdateItem;
    },


    /**
     * Récupère la liste des enseignants.
     *
     * @returns {Teacher[]} La liste des enseignants.
    */
    getTeachers: (state) : Teacher[] => {
      return state.teachers;
    },


    /**
     * Récupère la liste des utilisateurs.
     *
     * @returns {User[]} La liste des utilisateurs.
    */
    getUsers: (state) : User[] => {
      return state.users;
    },


    /**
     * Récupère l'enseignant en cours de mise à jour.
     *
     * @returns {Teacher|null} L'enseignant en cours de mise à jour, null s'il n'y en a pas.
    */
    getUpdatingTeacher: (state): Teacher|null => {
      return state.currentUpdateTeacher || null;
    },


    /**
     * Récupère l'enseignant en cours de suppression.
     *
     * @returns {Teacher|null} L'enseignant en cours de suppression, null s'il n'y en a pas.
    */
    getDeletingTeacher: (state): Teacher|null => {
      return state.currentDeleteTeacher;
    },


    /**
     * Récupère l'utilisateur en cours de suppression.
     *
     * @returns {User|null} L'utilisateur en cours de suppression, null s'il n'y en a pas.
     */
    getDeletingUser: (state): User|null => {
      return state.currentDeleteUser;
    },


    /**
     * Récupère l'utilisateur en cours de mise à jour.
     *
     * @returns {User|null} L'utilisateur en cours de mise à jour, null s'il n'y en a pas.
     */
    getUpdatingUser: (state): User|null => {
      return state.currentUpdateUser;
    },


    /**
     * Récupère la liste des cours.
     *
     * @returns {Lesson[]} La liste des cours.
    */
    getLessons: (state) : Lesson[] => {
      return state.lessons
    },


    /**
     * Récupère l'index de la page actuelle.
     *
     * @returns {number} L'index de la page actuelle.
     */
    getCurrentIndexPage: (state) : number => {
      return state.pagination.page
    },


    /**
     * Indique si les paramètres sont affichés.
     *
     * @returns {boolean} true si les paramètres sont affichés, sinon false.
     */
    getDisplayParam: (state) : boolean => {
      return state.isDisplayParams
    },


    /**
     * Récupère les informations sur l'alerte à afficher.
     *
     * @returns {Alert} Les informations sur l'alerte à afficher.
     */
    getAlert : (state) :  Alert => {
      return state.alert
    }
  }, // Getters => transformations nécessaire avant d'être utiliser dans le code (pas forcément nécessaire dans un premier temps)
  actions:{ // Actions => changer un état => une méthode, JAMAIS CHANGER EN DEHORS DE CES METHODES IMPORTANT
    
    /**
     * Modifie l'index de l'élément en cours d'édition.
     *
     * @param {number|null} index - Le nouvel index de l'élément en cours d'édition, ou null s'il n'y en a pas.
      */
    setEditingIndex(index : number|null){
      this.editingIndex = index;
    },


    /**
     * Met à jour l'élément en cours de mise à jour.
     *
     * @param {Item|null} newValue - Le nouvel élément en cours de mise à jour, ou null s'il n'y en a pas.
     */
    setUpdateItem(newValue : Item | null){
      this.currentUpdateItem = newValue;
    },


    /**
     * Met à jour l'enseignant en cours de mise à jour.
     *
     * @param {Teacher|null} newValue - Le nouvel enseignant en cours de mise à jour, ou null s'il n'y en a pas.
     */
    setUpdateTeacher(newValue: Teacher | null) {
      this.currentUpdateTeacher = newValue;
    },


    /**
     * Met à jour l'enseignant en cours de suppression.
     *
     * @param {Teacher|null} newValue - Le nouvel enseignant en cours de suppression, ou null s'il n'y en a pas.
     */
    setDeleteTeacher(newValue: Teacher | null) {
      this.currentDeleteTeacher = newValue;
    },


    /**
     * Met à jour l'utilisateur en cours de mise à jour.
     *
     * @param {User|null} newValue - Le nouvel utilisateur en cours de mise à jour, ou null s'il n'y en a pas.
     */
    setUpdateUser(newValue: User | null) {
      this.currentUpdateUser = newValue;
    },

    /**
     * Met à jour l'utilisateur en cours de suppression.
     *
     * @param {User|null} newValue - Le nouvel utilisateur en cours de suppression, ou null s'il n'y en a pas.
     */
    setDeleteUser(newValue: User | null) {
      this.currentDeleteUser = newValue;
    },


    /**
     * Ajoute un élément à la base de données et met à jour l'affichage.
     *
     * @param {Item} item - L'élément à ajouter.
     * @returns {Promise<void>} Une promesse représentant l'ajout de l'élément.
     */
    async addItem(item : Item): Promise<void>{
      this.createAlert(
        'Item ajouté',
        'Votre item a bien été ajouté à la base de données',
        'success'
      );
      await postItem(item,this.currentYear)
      this.fetchItemsPage(this.pagination.page)
    },

    /**
     * Ajoute un enseignant à la base de données et met à jour l'affichage.
     *
     * @param {Teacher} teacher - L'enseignant à ajouter.
     * @returns {Promise<void>} Une promesse représentant l'ajout de l'enseignant.
     */
    async addTeacher(teacher : Teacher): Promise<void>{
      await postTeacher(teacher)
      this.fetchTeachers()
    },

    /**
     * Ajoute un utilisateur à la base de données et met à jour l'affichage.
     *
     * @param {User} user - L'utilisateur à ajouter.
     * @returns {Promise<void>} Une promesse représentant l'ajout de l'utilisateur.
     */
    async addUser(user : User){
      await postData<User>(Routes.USERS,user)
      this.fetchUsersPage(this.pagination.page)
    },

    /**
     * Gère la pagination en changeant la page actuelle.
     *
     * @param {number} pageNumber - Le numéro de la nouvelle page.
     */
    paginationHandler(pageNumber : number){
      this.pagination.page = pageNumber ;     
    },

    /**
     * Récupère et affiche la page d'éléments correspondant à la nouvelle page spécifiée.
     *
     * @param {number} pageNumber - Le numéro de la nouvelle page.
     */
    async fetchItemsPage(pageNumber : number) {
      this.paginationHandler(pageNumber);
      const itemsPageResponse : ResponseData<ReponseItemsPage> = await fetchData(
        `${Routes.ITEMS}/${pageNumber}?year=${this.currentYear}&id=${this.criterias.id}&lastName=${this.criterias.nom}&firstName=${this.criterias.prenom}&givenId=${this.criterias.ressource}&nameLesson=${this.criterias.libelle}`
      )
      const itemsPage = extractData(itemsPageResponse);
      this.dataRows = itemsPage.items;
      this.pagination.totalItems =  itemsPage.count;
    },

    /**
      * Récupère et affiche la page d'utilisateurs correspondant à la nouvelle page spécifiée.
      *
      * @param {number} pageNumber - Le numéro de la nouvelle page.
      */
    async fetchUsersPage(pageNumber : number) {
      this.paginationHandler(pageNumber);
      const usersPageResponse : ResponseData<ResponseUsersPage> = await fetchData(
        `${Routes.USERS}/filter/${pageNumber}?lastName=${this.userCriterias.nom}&firstName=${this.userCriterias.prenom}&email=${this.userCriterias.email}`
      )
      const usersPage = extractData(usersPageResponse);
      this.users = usersPage.users;
      this.pagination.totalItems =  usersPage.count;
    },

    /**
     * Envoie les critères de recherche et affiche la page d'éléments correspondant à ces critères.
     *
     * @param {Criterias} criterias - Les critères de recherche pour les éléments.
     */
    async sendCriteria(criterias : Criterias) {
      this.criterias = criterias;
      this.fetchItemsPage(1);
    },

    /**
     * Envoie les critères de recherche et affiche la page d'utilisateurs correspondant à ces critères.
     *
     * @param {UserCriterias} userCriterias - Les critères de recherche pour les utilisateurs.
     */
    async sendUserCriterias(userCriterias : UserCriterias) {
      this.userCriterias = userCriterias;
      this.fetchUsersPage(1);
    },

    /**
     * Récupère et affiche la liste des enseignants depuis l'API.
     */
    async fetchTeachers(){
      const data : ResponseData<Teacher[]> = await fetchData(Routes.TEACHERS)
      this.teachers = extractData(data)
    },

    /**
     * Récupère et affiche la liste des cours depuis l'API.
     */
    async fetchLessons(){
      const data : ResponseData<Lesson[]> = await fetchData(Routes.LESSONS)
      this.lessons = extractData(data)
    },

    /**
     * Récupère et affiche la liste des utilisateurs depuis l'API.
     */
    async fetchUsers(){
      const data : ResponseData<User[]> = await fetchData(Routes.USERS)
      this.users = extractData(data)
    },

    /**
     * Modifie l'état de l'application pour indiquer si la boîte de dialogue est ouverte ou fermée.
     *
     * @param {boolean} newState - Le nouvel état de la boîte de dialogue (ouvert ou fermé).
     */
    setStateDialog(newState : boolean){
      this.openUpdateCard = newState;
    },


    /**
     * Modifie l'état de l'application pour indiquer si les paramètres sont affichés ou masqués.
     *
     * @param {boolean} isDisplayParams - Le nouvel état des paramètres (affichés ou masqués).
     */
    setDisplayParams(isDisplayParams: boolean) {
      this.isDisplayParams = isDisplayParams;
    },

    /**
     * Crée une alerte avec le titre, le texte et le type spécifiés, puis l'affiche pendant un certain temps.
     *
     * @param {string} title - Le titre de l'alerte.
     * @param {string} text - Le texte de l'alerte.
     * @param {string} type - Le type de l'alerte (success, error, warning, etc.).
     */
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