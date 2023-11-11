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


/**
 * Ferme le modal en mettant l'état de la propriété openUpdateCard de appStoreInstance à false.
 */
export const removeModal = () => {
    appStoreInstance?.setStateDialog(false);
}

/**
 * Crée un nouveau professeur en utilisant les valeurs saisies et met à jour la liste des professeurs.
 * Appelle la fonction addTeacher de appStoreInstance pour ajouter le nouveau professeur.
 * Ensuite, appelle la fonction fetchTeachers de appStoreInstance pour rafraîchir la liste des professeurs.
 * Enfin, appelle la fonction removeModal pour fermer le modal.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
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