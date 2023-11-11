import { useAppStore } from "@/store";
import { UserCriterias } from "@/types/userCriterias.types";
import { ref } from "vue";

export const nom = ref<string>('');
export const prenom = ref<string>('');
export const email = ref<string>('');

interface AppStore {
    sendUserCriterias(criterias: UserCriterias): Promise<void>
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
    appStoreInstance = {
        sendUserCriterias: (criterias: UserCriterias) => useAppStore().sendUserCriterias(criterias)
    };
}

/**
 * Effectue une recherche d'utilisateurs en utilisant les critères de recherche saisis.
 * Appelle la fonction sendUserCriterias du Store de l'app pour mettre à jour la liste d'utilisateurs.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
export const search = () => {
    const criterias: UserCriterias = { nom: nom.value, prenom: prenom.value, email: email.value };
    appStoreInstance?.sendUserCriterias(criterias)
}