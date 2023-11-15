import { useAppStore } from '@/store'
import { Item } from '@/types';
import router from '@/router';
import { Routes, deleteItem } from '@/api';
  
interface AppStore {
    getUpdatingItem: () => ReturnType<typeof useAppStore>['getUpdatingItem'],
    setStateDialog: (value: boolean) => void,
    fetchItems: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
    createAlert: (title: string, text: string, type: "error" | "success" | "warning" | "info" | undefined) => void
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
  appStoreInstance = {
    getUpdatingItem: () => useAppStore().getUpdatingItem,
    setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
    fetchItems: async (pageNumber: number) => await useAppStore().fetchItemsPage(pageNumber),
    getCurrentIndexPage: () => useAppStore().getCurrentIndexPage,
    createAlert: (title, text, type) => useAppStore().createAlert(title,text,type)
  };
}  
    
export const removeItem = async (itemToDelete : Item) => {
  await deleteItem(Routes.ITEMS,itemToDelete.id);
  await appStoreInstance?.fetchItems(appStoreInstance.getCurrentIndexPage())
  appStoreInstance?.createAlert(
    "Supression d'un Item",
    "L'item a bien été supprimé de la base de données",
    'success'
  )
}
  
export const openItem = (itemToOpen : Item) => {
  const itemToOpenJSON = JSON.stringify(itemToOpen);
  router.push({
    name: 'ServicesDetails',
    params: {
      id: itemToOpen.service?.id,
    },
    query: {
      itemToOpenJSON: itemToOpenJSON,
    },
  });
}

export const calculateTotalHours = (item : Item) => {
  return item.lessonTypes.reduce((acc,lessonType) => lessonType.amountHours + acc, 0)
}