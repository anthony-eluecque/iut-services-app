

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
        </v-container>
    </v-window-item>
</template>


<script setup lang="ts">
import { DeepReadonly, Ref, computed, ref } from 'vue';
import { Lesson } from "../../../types";
import { useAppStore } from "../../../store"

const AppStore = useAppStore(); // Init un store avec pinia

const props = defineProps({
  lessons: {
    type: Object as () => Lesson[], 
    required: true 
  }
})

const headers: Ref<DeepReadonly<any[]>> = ref([
  { title: 'ID Ressource', align: 'start', sortable: false, key: 'givenId' },
  { title: 'Enseignement', align: 'start', sortable: true, key: 'name' },
  { title: 'Total Heures', align: 'start', sortable: true, key: 'amountHours' },
]);


const lessonData = computed(() => {
    return props.lessons?.map((lesson : Lesson) => {
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