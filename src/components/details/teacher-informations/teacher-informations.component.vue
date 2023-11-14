<template>
  <v-container
    fluid
    class="container-info primary bg-background-container"
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          class="flex-item"
          :model-value="props.teacher.givenId"
          variant="outlined"
          label="N° Matricule"
          hide-details
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          class="flex-item"
          :model-value="props.teacher.firstName"
          variant="outlined"
          label="Prénom"
          hide-details
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          class="flex-item"
          :model-value="props.teacher.lastName"
          variant="outlined"
          label="Nom"
          hide-details
          readonly
        />
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script lang="ts" setup>
import { Teacher } from '@/types';

const props = defineProps({
  teacher: {
    type : Object as () => Teacher, 
    required : true
  }
})
</script>