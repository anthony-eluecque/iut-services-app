import { useAppStore } from '@/store';
import { computed, markRaw, ref } from 'vue';
import lessonTypesField from '@/components/services/lesson-types-fields/lesson-types.component.vue'
import { Item, Lesson, Teacher } from '@/types';
import { Routes, updateData } from '@/api';


interface AppStore {
    getUpdatingItem: () => ReturnType<typeof useAppStore>['getUpdatingItem'],
    setStateDialog: (value: boolean) => void,
    fetchItemsPage: (pageNumber : number) => Promise<void>
    getCurrentIndexPage: () => ReturnType<typeof useAppStore>['getCurrentIndexPage']
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingItem: () => useAppStore().getUpdatingItem,
        setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
        fetchItemsPage: async (pageNumber : number) => await useAppStore().fetchItemsPage(pageNumber),
        getCurrentIndexPage: () => useAppStore().getCurrentIndexPage
    };
}

const currentItem = computed(() => appStoreInstance?.getUpdatingItem())
export const currentTeacher = computed(() => currentItem.value?.service?.teacher ?? {
    firstName : '',
    lastName : '',
    givenId : '',
    id : ''
})
export const currentLesson = computed(() => currentItem.value?.lesson ?? {
    name : '',
    givenId: '',
    id : '',
})

export const removeModal = () => {
    appStoreInstance?.setStateDialog(false)
}

export const children = ref(new Array())
export const validators = ref(new Array())

export const updateDatas = ( ) => {
    createComponents()
}

export const items = ref(new Array())


const createComponents = () => {
    items.value = ['TD','TP','CM']
    validators.value = []
    const arr = new Array()
    const item = currentItem.value as Item
    if (!item) return []
    for (const type of item.lessonTypes) {
        arr.push({name:type.lessonType.name,amountHours:type.amountHours.toString()})
        validators.value.push(true)
        items.value = items.value.filter((n) => n !== type.lessonType.name)
    }
    children.value = arr
}

export const updateItem = async () => {
    const item = currentItem.value as Item
    const { lessonTypes, ...rest } = item
    const itemToUpdate = {
        types:children.value,
        ...rest
    }



    const valid = () => validators.value.every((v:boolean) => v === true);
    if (valid()){
        await updateData(Routes.ITEMS,itemToUpdate)
        await appStoreInstance?.fetchItemsPage(appStoreInstance.getCurrentIndexPage())
        removeModal()
    }
}

export const add = () => {
    children.value.push({name:'',amountHours:0})
    validators.value.push(false)
}