import { DeepReadonly, Ref, ref } from "vue";

export const headers: Ref<DeepReadonly<any[]>> = ref([
  { title: 'Prénom', align: 'start', sortable: false, key: 'firstName' },
  { title: 'Nom', align: 'start', sortable: false, key: 'lastName' },
  { title: 'Email', align: 'start', sortable: false, key: 'email' },
]);

export const userPerPageText = ref('Résultats par page');

export interface UserRow {
    firstName: string,
    lastName: string,
    email: string,
}