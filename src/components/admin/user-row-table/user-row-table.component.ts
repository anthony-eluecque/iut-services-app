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

/**
 * Supprime un utilisateur spécifié en utilisant l'API de suppression.
 * Après la suppression, rafraîchit la liste des utilisateurs en appelant la fonction fetchUser de appStoreInstance.
 *
 * @param {User} userToDelete - L'utilisateur à supprimer.
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const removeUser = async (userToDelete: User) => {
  await deleteItem(Routes.USERS, userToDelete.id);
  await appStoreInstance?.fetchUser(appStoreInstance.getCurrentIndexPage())
}