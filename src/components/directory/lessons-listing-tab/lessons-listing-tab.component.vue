<template>
    <v-window-item :value="2">
        <v-container fluid>
            <h1>Filtrer :</h1>
            <div class="container-lessons-titles">
                <div class="container-fields-filter">
                    <v-text-field
                        hide-details
                        label="Matricule Enseignant"
                        variant="outlined"
                    />
                    <v-text-field
                        hide-details
                        label="Nom"
                        variant="outlined"
                    />
                </div>
            </div>
            <v-data-table :headers="headers" :items="lessonData" :items-per-page-text="itemsPerPageText" class="primary bg-background-container">
            </v-data-table>
        </v-container>
    </v-window-item>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { Item, Lesson } from "@/types";
import {
    RowDataTable,
    headers,
    itemsPerPageText
} from './lessons-listing-tab.component';

const props = defineProps({
  lessons: {
    type: Object as () => Lesson[], 
    required: true 
  }
})

const calculateSumHours = (item : Item, lesson : Lesson) : number => {
    if (item.lesson?.name === lesson.name) {
        return item.lessonTypes.reduce(
            (acc,lessonType) => acc + lessonType.amountHours,0) || 0
    } else return 0
}   

const lessonData = computed(() => {
    return props.lessons?.map((lesson : Lesson) : RowDataTable => {
        const totalAmountHours = lesson.items?.reduce((acc, item) => {
            return acc + calculateSumHours(item,lesson)
        }, 0) || 0;
        return {
            givenId : lesson.givenId,
            name : lesson.name,
            amountHours : totalAmountHours
        }
    })
})
</script>