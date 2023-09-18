<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed } from 'vue'
import _ from 'lodash';
import { Item } from '@/types';


const AppStore = useAppStore(); // Init un store avec pinia

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


const onInputTeacher = (fieldName : string, targetValue : string) => {
  
  const foundObject : Item|undefined  = _.find(
    AppStore.getDataRows, 
    item => _.get(item, fieldName) === targetValue);

  if (foundObject){
    firstnameTeacher.value = foundObject.service?.teacher?.firstName as string
    lastnameTeacher.value = foundObject.service?.teacher?.lastName as string
    givenIdTeacher.value = foundObject.service?.teacher?.givenId as string
  } else{
    // firstnameTeacher.value = ''
    // lastnameTeacher.value = '' 
  }
}

const onInputLesson = (fieldName : string, targetValue : string) => {
  const foundObject : Item|undefined  = _.find(
    AppStore.getDataRows, 
    item => _.get(item, fieldName) === targetValue);

  if (foundObject){
    labelLesson.value = foundObject.lesson?.name as string;
    givenIdLesson.value = foundObject.lesson?.givenId as string;
  } else{
    // firstnameTeacher.value = ''
    // lastnameTeacher.value = '' 
  }
}

</script>

<template>
  <tr v-if="AppStore.isCreatingItem">
    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="givenIdTeacher"
          hide-details
          class=""
          label="n° Matricule"
          variant="outlined"
          @input="onInputTeacher('service.teacher.givenId',givenIdTeacher)"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="lastnameTeacher"
          hide-details
          class=""
          label="Nom Enseignant"
          variant="outlined"
          @input="onInputTeacher('service.teacher.lastName',lastnameTeacher)"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="firstnameTeacher"
          hide-details
          class=""
          label="Prénom Enseignant"
          variant="outlined"
          @input="onInputTeacher('service.teacher.firstName',firstnameTeacher)"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="givenIdLesson"
          hide-details
          variant="outlined"
          class=""
          label="Unité d'enseignement"
          @input="onInputLesson('lesson.givenId',givenIdLesson)"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="labelLesson"
          hide-details
          variant="outlined"
          class=""
          label="Libellé Matière"
          @input="onInputLesson('lesson.name',labelLesson)"
        />
      </div>
    </td>

    <td>
      <div class="text-field-container">
        <v-text-field
          v-model="amountHoursLesson"
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