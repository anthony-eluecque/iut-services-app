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
const amountHoursLesson = computed({
  get: () => AppStore.inputField.amountHours,
  set: (newValue) => {
    AppStore.inputField.amountHours = newValue
  }
})


const removeInput = () => {
  AppStore.editIsCreatingItem(false)
  AppStore.clearInputField()
}

const AddItem = () => {
  AppStore.editIsCreatingItem(false)
  AppStore.addItem()
  AppStore.clearInputField()
}

const givenIdTeacher = createInputFieldComputed("teacher", "givenId");
const firstnameTeacher = createInputFieldComputed("teacher", "firstName");
const lastnameTeacher = createInputFieldComputed("teacher", "lastName");

const givenIdLesson = createInputFieldComputed("lesson", "givenId");
const labelLesson = createInputFieldComputed("lesson", "name");

</script>

<template>
  <tr v-if="AppStore.isCreatingItem">
    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="givenIdTeacher"
          hide-details
          class=""
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="lastnameTeacher"
          hide-details
          class=""
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="firstnameTeacher"
          hide-details
          class=""
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="givenIdLesson"
          hide-details
          class=""
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="labelLesson"
          hide-details
          class=""
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="amountHoursLesson"
          hide-details
          class=""
        />
      </div>
    </td>

    <td>
      <v-btn
        icon="mdi-trash-can-outline"
        color="red"
        variant="plain"
        @click="removeInput"
      />
      <v-btn
        icon="mdi-check-circle-outline"
        color="green"
        variant="plain"
        @click="AddItem"
      />
    </td>
  </tr>
</template>


<style>
tr td  .text-field-container {
    padding: 15px;
}
</style>