<template>
  <v-window-item :value="2">
    <v-container fluid>
      <h1>Filtrer :</h1>
      <div class="container-lessons-titles">
        <div class="container-fields-filter">
          <v-text-field
            v-model="searchGivenId"
            hide-details
            label="Matricule Ressource"
            variant="outlined"
          />
          <v-text-field
            v-model="searchName"
            hide-details
            label="Nom"
            variant="outlined"
          />
        </div>
      </div>
      <v-data-table
        :headers="headers"
        :items="lessonData"
        :items-per-page-text="itemsPerPageText"
        class="primary bg-background-container"
      />
    </v-container>
  </v-window-item>
</template>


<script setup lang="ts">
import { Lesson } from "@/types";
import {
  headers,
  itemsPerPageText,
  searchGivenId,
  searchName,
  lessonData,
  createArrayLessons
} from './lessons-listing-tab.component';
import { onUpdated } from 'vue';

const props = defineProps({
  lessons: {
    type: Object as () => Lesson[], 
    required: true 
  }
});

onUpdated(() => createArrayLessons(props.lessons));
</script>