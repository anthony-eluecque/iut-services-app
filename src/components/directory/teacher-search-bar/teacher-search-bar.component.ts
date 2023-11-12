import { useAppStore } from "@/store";
import { TeacherCriterias } from "@/types/teacherCriterias";
import { ref } from "vue";

export const matricule = ref<string>('');
export const nom = ref<string>('');
export const prenom = ref<string>('');

interface AppStore {
    sendTeacherCriterias(criterias: TeacherCriterias): Promise<void>
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
  appStoreInstance = {
    sendTeacherCriterias: (criterias: TeacherCriterias) => useAppStore().sendTeacherCriterias(criterias)
  };
}

/**
 * Effectue une recherche de professeurs en utilisant les critères de recherche saisis.
 * Appelle la fonction sendTeacherCriterias du Store de l'app pour mettre à jour la liste de professeurs.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const search = () => {
  const criterias: TeacherCriterias = { matricule: matricule.value, nom: nom.value, prenom: prenom.value };
  appStoreInstance?.sendTeacherCriterias(criterias)
}