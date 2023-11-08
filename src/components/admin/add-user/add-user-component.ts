import { useAppStore } from "@/store";
import { User } from "@/types";
import { ref } from "vue";

interface AppStore {
    getUpdatingUser: () => ReturnType<typeof useAppStore>['getUpdatingUser'],
    setStateDialog: (value: boolean) => void,
    fetchUsers: (pageNumber: number) => Promise<void>,
    getCurrentIndexPage: () => number,
    addUser: (user: User) => Promise<void>,
    setEditingIndex: (index: number | null) => void,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingUser: () => useAppStore().getUpdatingUser,
        setStateDialog: (value: boolean) => useAppStore().setStateDialog(value),
        fetchUsers: async (pageNumber: number) => await useAppStore().fetchUsersPage(pageNumber),
        getCurrentIndexPage: () => useAppStore().getCurrentIndexPage,
        addUser: async (user: User) => await useAppStore().addUser(user),
        setEditingIndex: (index: number | null) => useAppStore().setEditingIndex(index),
    };
}

export const firstNameUserValue = ref<string>('');
export const lastNameUserValue = ref<string>('');
export const emailUserValue = ref<string>('');

export const cancelInput = () => {
    firstNameUserValue.value = '';
    lastNameUserValue.value = '';
    emailUserValue.value = '';
}

export const AddOrUpdateUser = async () => {
    const newUser: User = {
        id: '',
        firstName: firstNameUserValue.value,
        lastName: lastNameUserValue.value,
        email: emailUserValue.value,
        password: '',
        isAdmin: false,
    }

    await appStoreInstance?.addUser(newUser)
}

