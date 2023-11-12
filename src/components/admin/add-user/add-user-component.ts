import { Routes, postData } from "@/api";
import { useAppStore } from "@/store";
import { User } from "@/types";
import { ref } from "vue";

interface AppStore {
    getUpdatingUser: () => ReturnType<typeof useAppStore>['getUpdatingUser'],
    setStateDialog: (value: boolean) => void,
    fetchUsersPage: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
    addUser: (user: User) => Promise<void>,
    setEditingIndex: (index: number | null) => void,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
  appStoreInstance = {
    getUpdatingUser: () => useAppStore().getUpdatingUser,
    setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
    fetchUsersPage: async (pageNumber: number) => await useAppStore().fetchUsersPage(pageNumber),
    getCurrentIndexPage: () => useAppStore().getCurrentIndexPage,
    addUser: async (user: User) => await useAppStore().addUser(user),
    setEditingIndex: (index: number | null) => useAppStore().setEditingIndex(index),
  };
}

export const firstNameUserValue = ref<string>('');
export const lastNameUserValue = ref<string>('');
export const emailUserValue = ref<string>('');

/**
 * Annule les valeurs des champs de saisie pour un utilisateur.
 */
export const cancelInput = () => {
  firstNameUserValue.value = '';
  lastNameUserValue.value = '';
  emailUserValue.value = '';
}

/**
 * Ajoute un nouvel utilisateur ou met à jour un utilisateur existant.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const AddOrUpdateUser = async () => {
  const newUser = {
    firstName: firstNameUserValue.value,
    lastName: lastNameUserValue.value,
    email: emailUserValue.value,
  }

  await appStoreInstance?.addUser(newUser as User);
}

