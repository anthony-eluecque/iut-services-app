import { Item, Lesson } from "@/types";
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

export const calculateSumHours = (item : Item, lesson : Lesson) : number => {
    if (item.lesson?.name === lesson.name) {
        return item.lessonTypes.reduce(
            (acc,lessonType) => acc + lessonType.amountHours,0) || 0
    } else return 0
}   