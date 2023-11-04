import { Routes, deleteItem } from "@/api";
import { useAppStore } from "@/store";
import { Item } from "@/types";
import { defineComponent, ref } from "vue";

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


export const cancelInput = async () => {
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
            year : 0,
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

