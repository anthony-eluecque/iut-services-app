<script lang="ts" setup>
import { Item } from '@/types';

import {
    initializeComponent,
    givenIdLessonValue,
    givenIdTeacherValue,
    firstnameTeacherValue,
    lastnameTeacherValue,
    labelLessonValue,
    cancelInput,
    AddOrUpdateItem  
} from './add-service-fields.component'

initializeComponent()

const props = defineProps({
  item: {
    type: Object as () => Item, 
    required: false 
  },
  isCreatingItem: {
    type : Boolean,
    required : true
  }
})


</script>

<template>
  <tr v-if="props.isCreatingItem">
    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="givenIdTeacherValue"
          hide-details
          class=""
          label="n° Matricule"
          variant="outlined"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="lastnameTeacherValue"
          hide-details
          class=""
          label="Nom Enseignant"
          variant="outlined"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="firstnameTeacherValue"
          hide-details
          class=""
          label="Prénom Enseignant"
          variant="outlined"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="givenIdLessonValue"
          hide-details
          variant="outlined"
          class=""
          label="Unité d'enseignement"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="labelLessonValue"
          hide-details
          variant="outlined"
          class=""
          label="Libellé Matière"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          hide-details
          class=""
          variant="outlined"
        />
      </div>
    </td>

    <td>
      <v-btn
        icon="mdi-trash-can-outline"
        color="red"
        variant="plain"
        @click="cancelInput"
      />
      <v-btn
        icon="mdi-check-circle-outline"
        color="green"
        variant="plain"
        @click="AddOrUpdateItem"
      />
    </td>
  </tr>
</template>