import { useAppStore } from '@/store'
import { User } from '@/types';
import { Routes, deleteItem } from '@/api';

interface AppStore {
    getUpdatingUser: () => ReturnType<typeof useAppStore>['getUpdatingUser'],
    setStateDialog: (value: boolean) => void,
    fetchUser: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingUser: () => useAppStore().getUpdatingUser,
        setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
        fetchUser: async (pageNumber: number) => await useAppStore().fetchUsersPage(pageNumber),
        getCurrentIndexPage: () => useAppStore().getCurrentIndexPage,
    };
}

export const removeUser = async (userToDelete: User) => {
    await deleteItem(Routes.USERS, userToDelete.id);
    await appStoreInstance?.fetchUser(appStoreInstance.getCurrentIndexPage())
}