<template>
  <v-container fluid class ="container-info d-flex primary bg-background-container">
    <v-text-field
      class="flex-item"
      :model-value="props.teacher.givenId"
      variant="outlined"
      label="N° Matricule"
      hide-details
      readonly
    />
    <v-text-field
        class="flex-item"
        :model-value="props.teacher.firstName"
        variant="outlined"
        label="Prénom"
        hide-details
        readonly
    />
    <v-text-field
      class="flex-item"
      :model-value="props.teacher.lastName"
      variant="outlined"
      label="Nom"
      hide-details
      readonly
    />
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

<style>

.container-info{
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  background-color: white;
}

.flex-item {
  flex: 1;
  margin: 5px 20px;
  align-self: center;
}
</style>