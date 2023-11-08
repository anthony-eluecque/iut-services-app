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

export const search = () => {
    const criterias: UserCriterias = { nom: nom.value, prenom: prenom.value, email: email.value };
    appStoreInstance?.sendUserCriterias(criterias)
}