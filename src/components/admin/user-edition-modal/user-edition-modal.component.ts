import { Routes, updateData } from "@/api";
import { useAppStore } from "@/store";
import { computed } from "vue";


interface AppStore {
    getUpdatingUser: () => ReturnType<typeof useAppStore>['getUpdatingUser'],
    fetchUsers: () => Promise<void>,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingUser: () => useAppStore().getUpdatingUser,
        fetchUsers: async () => await useAppStore().fetchUsers(),
    };
}

const AppStore = useAppStore();
const currentUser = computed(() => AppStore.getUpdatingUser)
export const state = computed(() => currentUser.value ?? {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
})

export const removeModal = () => {
    AppStore.setStateDialog(false)
}

export const editUser = async () => {
    const updatedData = {
        id: state.value.id,
        email: state.value.email,
        firstName: state.value.firstName,
        lastName: state.value.lastName
    }
    await updateData(Routes.USERS, updatedData);
    await AppStore.fetchUsersPage(1);
    removeModal();
}