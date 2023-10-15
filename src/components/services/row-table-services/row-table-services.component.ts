import { useAppStore } from '@/store'
import InputField from '../InputField.vue';
import { Item } from '@/types';
import router from '@/router';
import { Routes, deleteItem } from '@/api';
  
interface AppStore {
    getUpdatingItem: () => ReturnType<typeof useAppStore>['getUpdatingItem'],
    setStateDialog: (value: boolean) => void,
    fetchItems: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingItem: () => useAppStore().getUpdatingItem,
        setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
        fetchItems: async (pageNumber: number) => await useAppStore().fetchItemsPage(pageNumber),
        getCurrentIndexPage: () => useAppStore().getCurrentIndexPage,
    };
}  
    
export const removeItem = async (itemToDelete : Item) => {
    await deleteItem(Routes.ITEMS,itemToDelete.id);
    await appStoreInstance?.fetchItems(appStoreInstance.getCurrentIndexPage())
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