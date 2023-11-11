import { useAppStore } from "@/store";
import { Criterias } from "@/types/criterias.types";
import { ref } from "vue";

export const id = ref<string>('');
export const nom = ref<string>('');
export const prenom = ref<string>('');
export const ressource = ref<string>('');
export const libelle = ref<string>('');

interface AppStore {
    sendCriteria(criterias: Criterias): Promise<void>    
}

let appStoreInstance: AppStore | null = null;

export const initializeComponent = () => {
  appStoreInstance = {
    sendCriteria: (criterias : Criterias) => useAppStore().sendCriteria(criterias)
  };
}  

export const search = () => {
  const criterias: Criterias = {id: id.value, nom: nom.value, prenom: prenom.value, ressource: ressource.value, libelle: libelle.value};
  appStoreInstance?.sendCriteria(criterias)
}