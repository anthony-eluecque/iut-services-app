import { DeepReadonly, Ref, ref } from "vue";

export const parseSemester = (semester: string): number => {
    return parseInt(semester.split('.')[0].slice(1));
};

export const headers: Ref<DeepReadonly<any[]>> = ref([
    { title: 'Ressource', align: 'start', sortable: false, key: 'givenId' },
    { title: 'Enseignement', align: 'start', sortable: false, key: 'name' },
    { title: 'Type', align: 'start', sortable: false, key: 'type' },
    { title: 'Semestre', align: 'start', sortable: false, key: 'semester' },
    { title: 'Heures', align: 'start', sortable: false, key: 'amountHours' },
]);

export const itemsPerPageText = ref('Résultats par page');


export interface ServiceRow {
    givenId: string;
    name: string;
    type: string;
    semester: number;
    amountHours: number;
}