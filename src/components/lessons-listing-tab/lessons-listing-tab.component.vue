

<template>
    <v-window-item :value="2">
        <v-container fluid>
            <h1>Filtrer :</h1>
            <div class="mt-2 d-flex flex-row justify-space-between">
                <div class="pa-2 container-fields-filter flex-row d-flex">
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
            <div class="mt-5">
                <v-data-table :headers="headers" :items="lessonData" :items-per-page-text="itemsPerPageText" class="styled-table primary bg-background-container">
                </v-data-table>
            </div>
        </v-container>
    </v-window-item>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { Lesson } from "../../types";
import {
    RowDataTable,
    headers,
    itemsPerPageText
} from './lessons-listing-tab.component'

const props = defineProps({
  lessons: {
    type: Object as () => Lesson[], 
    required: true 
  }
})

const lessonData = computed(() => {
    return props.lessons?.map((lesson : Lesson) : RowDataTable => {
        const totalAmountHours = lesson.items?.reduce((acc, item) => {
            return acc + (item.amountHours || 0); 
        }, 0) || 0;
        return {
            givenId : lesson.givenId,
            name : lesson.name,
            amountHours : totalAmountHours
        }
    })
})
</script>

<style>

</style>