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


export const rules = {
  required: (value: string) => !!value || 'Champs requis',
  capitalize: (value: string) =>  {
    const regex = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/;
    return regex.test(value) || `La première lettre de chaque mot doit être une majuscule`;
  },
  capitalizeAll: (value: string) => {
    const regex = /^[A-Z\s]+$/;
    return regex.test(value) || `Toutes les lettres doivent être des majuscules`;
  },
  formatEmail: (value: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value) || `L'adresse email saisie n'est pas valide`;
  },
}
