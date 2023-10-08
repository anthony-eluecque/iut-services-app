import { DeepReadonly, Ref, ref } from "vue";


export const itemsPerPageText = ref('Résultats par page');

export const headers: Ref<DeepReadonly<any[]>> = ref([
    { title: 'ID Ressource', align: 'start', sortable: false, key: 'givenId' },
    { title: 'Enseignement', align: 'start', sortable: true, key: 'name' },
    { title: 'Total Heures', align: 'start', sortable: true, key: 'amountHours' },
]);

export interface RowDataTable {
    givenId : string
    name : string
    amountHours : number
}