<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed } from 'vue'
const AppStore = useAppStore(); // Init un store avec pinia

const inputField = [
  { label : "Id"},
  { label : "Nom"},
  { label : "Prénom"},
  { label : "Id"},
  { label : "Libellé"},
  { label : "Vol H"},
]

const createInputFieldComputed = <
    T extends keyof typeof AppStore.inputField, 
    F extends keyof typeof AppStore.inputField[T]>
    (objName: T, fieldName: F) => 
    computed({
        get: () => AppStore.inputField[objName][fieldName],
        set: (newValue) => {
            AppStore.setInputFieldValue(objName, fieldName, newValue);
        },
});


const givenIdTeacher = createInputFieldComputed("teacher", "givenId");
const firstnameTeacher = createInputFieldComputed("teacher", "firstname");
const lastnameTeacher = createInputFieldComputed("teacher", "lastname");

const givenIdLesson = createInputFieldComputed("lesson", "givenId");
const amountHoursLesson = createInputFieldComputed("lesson", "amountHours");
const labelLesson = createInputFieldComputed("lesson", "label");


</script>

<template>
     <tr v-if="AppStore.isCreatingItem">

        <td>
            <div class="text-field-container">
                <v-text-field
                hide-details
                class=""
                v-model="givenIdTeacher"
                />
            </div>
        </td>

        <td>
            <div class="text-field-container">
                <v-text-field
                hide-details
                class=""
                v-model="lastnameTeacher"
                />
            </div>
        </td>

        <td>
            <div class="text-field-container">
                <v-text-field
                hide-details
                class=""
                v-model="firstnameTeacher"
                />
            </div>
        </td>

        <td>
            <div class="text-field-container">
                <v-text-field
                hide-details
                class=""
                v-model="givenIdLesson"
                />
            </div>
        </td>

        <td>
            <div class="text-field-container">
                <v-text-field
                hide-details
                class=""
                v-model="labelLesson"
                />
            </div>
        </td>

        <td>
            <div class="text-field-container">
                <v-text-field
                hide-details
                class=""
                v-model="amountHoursLesson"
                />
            </div>
        </td>

        <td>
          <v-btn
            icon="mdi-trash-can-outline"
            color="red"
            variant="plain"
          />
          <v-btn
            icon="mdi-check-circle-outline"
            color="green"
            variant="plain"
          />
        </td>
      </tr>
</template>


<style>
tr td  .text-field-container {
    padding: 15px;
}
</style>