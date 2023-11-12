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

/**
 * Ferme le modal en mettant l'état de la propriété openUpdateCard de AppStore à false.
 */
export const removeModal = () => {
  AppStore.setStateDialog(false)
}

/**
 * Met à jour les informations d'un professeur et rafraîchit la liste des professeurs.
 * Appelle la fonction updateData de l'API pour effectuer la mise à jour.
 * Ensuite, appelle la fonction fetchTeachers de AppStore pour rafraîchir la liste des professeurs.
 * Enfin, appelle la fonction removeModal pour fermer le modal.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
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