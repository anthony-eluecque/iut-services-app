import { useAppStore } from '@/store';
import { Item } from '@/types';
import { computed, ref} from 'vue';

interface AppStore {
    getUpdatingItem: () => ReturnType<typeof useAppStore>['getUpdatingItem'],
    setStateDialog: (value: boolean) => void,
    fetchItems: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
    addItem: (item: Item) => Promise<void>,
    setEditingIndex: (index: number | null) => void,
    getDataRows: () => Item[];
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
        getDataRows: () => useAppStore().getDataRows
    };
}  
export const isLoading = ref(false)

// PROBLEME A PARTIR DICI A CHECK DEMAIN
export const dataRows = computed(() => appStoreInstance?.getDataRows());


export const displayDataTable = async () => {
    await appStoreInstance?.fetchItems(1)
    isLoading.value = true;
}
