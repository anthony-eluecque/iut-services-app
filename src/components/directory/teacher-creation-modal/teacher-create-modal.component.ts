import { useAppStore } from "@/store";
import { Teacher } from "@/types";
import { ref } from "vue";


interface AppStore {
    addTeacher: (teacher : Teacher) => Promise<void>,
    fetchTeachers: () => Promise<void>,
    setStateDialog: (newState: boolean) => void
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        addTeacher: (teacher : Teacher) => useAppStore().addTeacher(teacher),
        fetchTeachers: async () => await useAppStore().fetchTeachers(),
        setStateDialog: (newState : boolean) => useAppStore().setStateDialog(newState)
    };
}  

export const currentTeacherId = ref<string>('');
export const currentTeacherFirstname = ref<string>('');
export const currentTeacherLastname = ref<string>('');

export const removeModal = () => {
    appStoreInstance?.setStateDialog(false);
}

export const createTeacher = async () => {
    const newTeacher: Teacher = {
        id: '',
        givenId: currentTeacherId.value,
        firstName: currentTeacherFirstname.value,
        lastName: currentTeacherLastname.value,
    };
    await appStoreInstance?.addTeacher(newTeacher);
    await appStoreInstance?.fetchTeachers();
    removeModal();
}