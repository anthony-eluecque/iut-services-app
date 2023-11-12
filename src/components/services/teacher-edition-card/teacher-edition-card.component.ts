import { useAppStore } from '@/store';
import { computed, ref } from 'vue';
import { Item } from '@/types';
import { Routes, deleteTypeItemUser, updateData } from '@/api';


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
export const items = ref(new Array())
export const needToBeDeleted = ref(new Array())


export const updateDatas = ( ) => {
  createComponents()
}

const createComponents = () => {
  items.value = ['TD','TP','CM']
  validators.value = []
  needToBeDeleted.value = []
  const arr = new Array()
  const item = currentItem.value as Item
  if (!item) return []
  for (const type of item.lessonTypes) {
    arr.push({
      name:type.lessonType.name,
      amountHours:type.amountHours.toString(),
      id:type.id
    });
    validators.value.push(true);
    items.value = items.value.filter((n) => n !== type.lessonType.name);
  }
  children.value = arr;
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
    for (const id of needToBeDeleted.value) {
      await deleteTypeItemUser(id)
    }
    await updateData(Routes.ITEMS,itemToUpdate)
    await appStoreInstance?.fetchItemsPage(appStoreInstance.getCurrentIndexPage())
    removeModal()
  }
}

export const add = () => {
  children.value.push({name:'',amountHours:0})
  validators.value.push(false)
}

export const updateValues = (
  index : number, name : string, hours : number , isValidOrNot : boolean
) => {
  items.value = items.value.filter((n) => n !== name);
  children.value[index].name = name;
  children.value[index].amountHours = hours;
  validators.value[index] = isValidOrNot;
}

export const deleteValues = (index : number, id: string) => {
  if (id !== ''){
    needToBeDeleted.value.push(id)
  }
  children.value = children.value.filter((value,i) => i!==index);
  validators.value = validators.value.filter((value,i) => i!==index);
  const res = children.value.map((c,i) => c.name)
  items.value = ['CM','TP','TD'].filter((value,i) => !res.includes(value))
}