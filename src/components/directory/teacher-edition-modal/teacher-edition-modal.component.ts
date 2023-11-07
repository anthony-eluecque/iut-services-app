import { Routes, updateData } from "@/api";
import { useAppStore } from "@/store";
import { computed } from "vue";


interface AppStore {
    getUpdatingTeacher: () => ReturnType<typeof useAppStore>['getUpdatingTeacher'],
    fetchTeachers: () => Promise<void>,
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        getUpdatingTeacher: () => useAppStore().getUpdatingTeacher,
        fetchTeachers: async () => await useAppStore().fetchTeachers(),
    };
}  


const AppStore = useAppStore();

const currentTeacher = computed(() => AppStore.getUpdatingTeacher)
export const state = computed(() => currentTeacher.value ?? {
    givenId: '',
    firstName : '',
    id : '',
    lastName : '',
})

export const removeModal = () => {
    AppStore.setStateDialog(false)
}

export const editTeacher = async () => {
    const updatedData = {
        id : state.value.id,
        givenId: state.value.givenId,
        firstName: state.value.firstName,
        lastName: state.value.lastName
    }
    await updateData(Routes.TEACHERS, updatedData);
    await AppStore.fetchTeachers();
    removeModal();
}