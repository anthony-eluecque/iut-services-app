<script lang="ts" setup>
import { useAppStore } from '@/store'
import { ref } from 'vue'
// import _ from 'lodash';
import { Item, Lesson, Teacher } from '@/types';
import { Routes, deleteItem } from '@/api';


const AppStore = useAppStore(); // Init un store avec pinia

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

const givenIdTeacherValue = ref<string>(props.item?.service?.teacher?.givenId ?? '');
const firstnameTeacherValue = ref<string>(props.item?.service?.teacher?.firstName ?? '');
const lastnameTeacherValue = ref<string>(props.item?.service?.teacher?.lastName ?? '');
const givenIdLessonValue = ref<string>(props.item?.lesson?.givenId ?? '');
const labelLessonValue = ref<string>(props.item?.lesson?.name ?? '');


const removeOrCancelInput = async () => {
  if (props.item){ // remove de la bdd
    await deleteItem(Routes.ITEMS,props.item.id);
    await AppStore.fetchItems(AppStore.pagination.page)
    AppStore.setEditingIndex(null)
    // AppStore.editIsCreatingItem(false)
    // AppStore.clearInputField()
  } else{
    firstnameTeacherValue.value = '';
    labelLessonValue.value = '';  
    givenIdLessonValue.value = '';
    lastnameTeacherValue.value = '';
    givenIdTeacherValue.value = '';
  }
}

const AddOrUpdateItem = async () => {

  if (props.item){ // update de la bdd
    // Faire l'update demain
    console.log(props.item)
    const lesson : Lesson = {...props.item.lesson} as Lesson;
    const teacher : Teacher = {...props.item.service?.teacher} as Teacher
    
  


    AppStore.setEditingIndex(null)
  } else{
    const newItem : Item = {
      amountHours : 0,
      lesson : {
        givenId : givenIdLessonValue.value,
        id : "",
        name : labelLessonValue.value
      },
      id : '',
      type : '',
      service : {
        id : '',
        year : 0,
        teacher : {
          firstName : firstnameTeacherValue.value,
          givenId : givenIdTeacherValue.value,
          id : '',
          lastName : lastnameTeacherValue.value
        }
      }
    }

    await AppStore.addItem(newItem)
    // AppStore.editIsCreatingItem(false)
    // AppStore.addItem()
    // AppStore.clearInputField()
  }
}



// const onInputTeacher = (fieldName : string, targetValue : string) => {
  
//   const foundObject : Item|undefined  = _.find(
//     AppStore.getDataRows, 
//     item => _.get(item, fieldName) === targetValue);

//   if (foundObject){
//     firstnameTeacher.value = foundObject.service?.teacher?.firstName as string
//     lastnameTeacher.value = foundObject.service?.teacher?.lastName as string
//     givenIdTeacher.value = foundObject.service?.teacher?.givenId as string
//   } else{
//     // firstnameTeacher.value = ''
//     // lastnameTeacher.value = '' 
//   }
// }

// const onInputLesson = (fieldName : string, targetValue : string) => {
//   const foundObject : Item|undefined  = _.find(
//     AppStore.getDataRows, 
//     item => _.get(item, fieldName) === targetValue);

//   if (foundObject){
//     labelLesson.value = foundObject.lesson?.name as string;
//     givenIdLesson.value = foundObject.lesson?.givenId as string;
//   } else{
//     // firstnameTeacher.value = ''
//     // lastnameTeacher.value = '' 
//   }
// }



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
        @click="removeOrCancelInput"
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


<style>
tr td  .text-field-container {
    padding: 15px;
}
</style>