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

/**
 * Ferme le modal en mettant l'état de la propriété openUpdateCard de AppStore à false.
 */
export const removeModal = () => {
  AppStore.setStateDialog(false)
}

/**
 * Met à jour les informations d'un utilisateur et rafraîchit la liste des utilisateurs.
 * Appelle la fonction updateData de l'API pour effectuer la mise à jour.
 * Ensuite, appelle la fonction fetchUsersPage de AppStore pour rafraîchir la liste des utilisateurs.
 * Enfin, appelle la fonction removeModal pour fermer le modal.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const editUser = async () => {
  const updatedData = {
    id: state.value.id,
    email: state.value.email,
    firstName: state.value.firstName,
    lastName: state.value.lastName
  }
  await updateData(Routes.USERS, updatedData);
  await AppStore.fetchUsersPage(1);

  useAppStore().createAlert(
    "Mise à jour",
    "L'utilisateur a bien été mis à jour !",
    "success"
  )
  removeModal();
}