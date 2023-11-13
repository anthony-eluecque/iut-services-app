import { useAppStore } from "@/store";
import { Item, Lesson, Teacher } from "@/types";
import { ref } from "vue";
import debounce from 'lodash/debounce';
import { ResponseData, Routes, extractData, fetchData } from '@/api';

interface AppStore {
    getUpdatingItem: () => ReturnType<typeof useAppStore>['getUpdatingItem'],
    setStateDialog: (value: boolean) => void,
    fetchItems: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
    addItem: (item: Item) => Promise<void>,
    setEditingIndex: (index: number | null) => void,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
  appStoreInstance = {
    getUpdatingItem: () => useAppStore().getUpdatingItem,
    setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
    fetchItems: async (pageNumber: number) => await useAppStore().fetchItemsPage(pageNumber),
    getCurrentIndexPage: () => useAppStore().getCurrentIndexPage,
    addItem: async (item: Item) => await useAppStore().addItem(item),
    setEditingIndex: (index: number | null) => useAppStore().setEditingIndex(index),
  };
}  

export const givenIdTeacherValue = ref<string>('');
export const firstnameTeacherValue = ref<string>('');
export const lastnameTeacherValue = ref<string>('');
export const givenIdLessonValue = ref<string>('');
export const labelLessonValue = ref<string>('');


export const cancelInput = () => {
  firstnameTeacherValue.value = '';
  labelLessonValue.value = '';  
  givenIdLessonValue.value = '';
  lastnameTeacherValue.value = '';
  givenIdTeacherValue.value = '';
}


export const AddOrUpdateItem = async () => {

  const newItem : Item = {
    lessonTypes : [],
    lesson : {
      givenId : givenIdLessonValue.value,
      id : "",
      name : labelLessonValue.value
    },
    id : '',
    type : '',
    service : {
      id : '',
      year : useAppStore().currentYear,
      teacher : {
        firstName : firstnameTeacherValue.value,
        givenId : givenIdTeacherValue.value,
        id : '',
        lastName : lastnameTeacherValue.value
      }
    }   
  }
  await appStoreInstance?.addItem(newItem)
}



export const hints = {
  ressource : "Par exemple R1.01, SAÉ S2 01, Stage, ...",
  lesson : "Par exemple Cryptographie, ..."
}



export const rules = {
  required: (value : string) => !!value || 'Champs requis',
  formatRessource: (value: string) => {
    const regex = /^(R[1-6]\.\d{2}|P[1-6]\.\d{2}|SAÉ.S[1-6]\.\d{2}|S[1-6].[A-Z]\.\d{2}|R[1-6].[A-Z]\.\d{2}|Stage)$/;
    return regex.test(value) || 'Repecter le format des Ressources de BUT (Ex: R1.01, ...) ';
  },
  formatText: (value: string) => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(value) || 'Format [A-Z][xx]';
  },
  counter: (value:string) => value.length <= 20 || 'Max 20 characters'
}


export const inputDebounce = debounce(async (e) => {
    const res : ResponseData<Teacher> = await fetchData(`${Routes.TEACHERS}/givenid/${givenIdTeacherValue.value}`)
    const data : Teacher = extractData(res)
    if (data.id){
      firstnameTeacherValue.value = data.firstName
      lastnameTeacherValue.value = data.lastName
    } else {
      firstnameTeacherValue.value = ""
      lastnameTeacherValue.value = ""
    }
  }, 500);



  export const inputDebounceLesson = debounce(async (e) => {
    const res : ResponseData<Lesson> = await fetchData(`${Routes.LESSONS}/givenid/${givenIdLessonValue.value}`)
    const data = extractData(res)
    if (data.id){
      labelLessonValue.value = data.name
    } else {
        labelLessonValue.value = ""
    }
  }, 500);