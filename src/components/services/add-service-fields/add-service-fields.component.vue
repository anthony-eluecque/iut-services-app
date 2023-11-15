
<template>
  <tr v-if="props.isCreatingItem">
    <td
      colspan="7"
      class="pa-0"
    >
      <v-container
        fluid
        class="pa-4 primary bg-background-container"
      >
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field
                v-model="givenIdTeacherValue"
                class=""
                label="n° Matricule"
                variant="outlined"
                :rules="[rules.required]"
                @input="inputDebounce"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="lastnameTeacherValue"
                class=""
                label="Nom Enseignant"
                variant="outlined"
                :rules="[rules.required,rules.counter]"
                counter
                maxlength="20"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="firstnameTeacherValue"
                class=""
                label="Prénom Enseignant"
                variant="outlined"
                :rules="[rules.required,rules.counter]"
                counter
                maxlength="20"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="givenIdLessonValue"
                variant="outlined"
                label="Unité d'enseignement"
                :rules="[rules.required,rules.formatRessource,rules.counter]"
                :hint="hints.ressource"
                @input="inputDebounceLesson"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="labelLessonValue"
                variant="outlined"
                class=""
                label="Libellé Matière"
                :rules="[rules.required,rules.counter]"
                counter
                maxlength="20"
                :hint="hints.lesson"
              />
            </v-col>
            <v-col>
              <v-text-field
                variant="outlined"
                disabled
              >
                0
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn
                icon="mdi-trash-can-outline"
                color="red"
                variant="plain"
                @click="deleteComponent()"
              />
              <v-btn
                icon="mdi-check-circle-outline"
                color="green"
                variant="plain"
                @click="validateFormBeforeCallback"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </td>
  </tr>
</template>

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
  AddOrUpdateItem,
  hints,
  rules,
  inputDebounce,
  inputDebounceLesson
} from './add-service-fields.component'
import { ref } from 'vue';
import { useAppStore } from '@/store';
import { VForm } from 'vuetify/lib/components/index.mjs';

initializeComponent()

const emit = defineEmits<{
    (e:'removeCreateComponent'): void
}>();

const props = defineProps({
  item: {
    type: Object as () => Item, 
    required: false,
  },
  isCreatingItem: {
    type : Boolean,
    required : true
  }
})


const deleteComponent = () => {
  cancelInput()
  emit('removeCreateComponent')
}


const form = ref(VForm)
const validateFormBeforeCallback = async () => {
  const res = await form.value.validate()
  const { errors, valid } = res
  if (valid) {
    await AddOrUpdateItem()
    cancelInput()
    emit('removeCreateComponent')
  } else {
    useAppStore().createAlert(
      'Formulaire Invalide',
      "L'item que vous essayez de créer est invalide !",
      'error'
    )
  }
}
</script>
