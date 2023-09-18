// Utilities
import { InputFieldType, Item, Lesson, Teacher } from '@/types'
import { defineStore } from 'pinia'
import { generateFakerArrayItem } from './faker'
import Axios, { ResponseData, Routes, deleteItem, extractData, fetchData, postData} from '@/api'

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

// Reset / init les champs inputs au dessus
const initInputField = () : InputFieldType => {
  return {
    amountHours : 0,
    lesson : {
      givenId : "",
      id : "",
      name : ""
    },
    teacher : {
      firstName : "",
      givenId : "",
      id : "",
      lastName : ""
    }
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
      const teacher = item.service?.teacher as Teacher
      const lesson = item.lesson as Lesson
      const responseTeacher : ResponseData<Teacher> = await fetchData(Routes.TEACHERS+"/givenid/"+teacher.givenId);
      const responseLesson : ResponseData<Lesson> = await fetchData(Routes.LESSONS+"/givenid/"+lesson.givenId)
      
      console.log(responseLesson)
      console.log(responseTeacher)

      // on créer le teacher si il n'est pas trouvé
      if (responseTeacher.status === 404){
        responseTeacher.data = teacher;
        const newTeacher = {
          roleName : "admin",
          firstName : teacher.firstName,
          lastName : teacher.lastName,
          givenId : teacher.givenId
        }
        const postTeacher : ResponseData<Teacher> = await postData(Routes.TEACHERS,newTeacher);
        responseTeacher.data.id = postTeacher.data.id;
      }
      // on créer la leçon si elle n'est pas trouvé
      if (responseLesson.status === 404){
        responseLesson.data = lesson;
        const newLesson = {
          givenId : lesson.givenId,
          name : lesson.name
        }
        const postLesson :  ResponseData<Lesson>  = await postData(Routes.LESSONS,newLesson);
        responseLesson.data.id = postLesson.data.id;
      }

      const newItem = {
        amountHours : item.amountHours,
        type : "",
        lesson : responseLesson.data.id
      }
      const postItem :  ResponseData<Item> = await postData(Routes.ITEMS,newItem);

      const newService = {
        teacher : responseTeacher.data.id,
        itemsIds : [postItem.data.id],
        year : this.currentYear      
      }
      await postData(Routes.SERVICES,newService)
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