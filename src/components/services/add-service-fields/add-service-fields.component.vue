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
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';
import { useAppStore } from '@/store';

initializeComponent()

const emit = defineEmits<{
    (e:'removeCreateComponent'): void
}>();

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

const hints = {
  ressource : "Par exemple R1.01, SAÉ S2 01, Stage, ...",
  lesson : "Par exemple Cryptographie, ..."
}

const rules = {
  required: (value : string) => !!value || 'Champs requis',
  formatRessource: (value: string) => {
    const regex = /^(R[1-6]\.\d{2}|P[1-6]\.\d{2}|SAÉ.S[1-6]\.\d{2}|S[1-6].[A-Z]\.\d{2}|R[1-6].[A-Z]\.\d{2}|Stage)$/;
    return regex.test(value) || 'Repecter le format des Ressources de BUT (Ex: R1.01, ...) ';
  },
  formatText: (value: string) => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(value) || 'Format [A-Z][xx]';
  },
  counter: (value:string) => value.length <= 20 || 'Max 20 characters'
}

const deleteComponent = () => {
  cancelInput()
  emit('removeCreateComponent')
}

const form = ref(null)
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

<template>
  <tr v-if="props.isCreatingItem" >
    <td colspan="7" class="pa-0">
      <v-container fluid class="pa-4 primary bg-background-container">
        <v-form ref="form" >
        <v-row>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="givenIdTeacherValue"
                class=""
                label="n° Matricule"
                variant="outlined"
                :rules="[rules.required]"
              />
            </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
            <v-text-field
              v-model="lastnameTeacherValue"
              class=""
              label="Nom Enseignant"
              variant="outlined"
              :rules="[rules.required,rules.counter]"
              counter
              maxlength="20"
            />
          </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="firstnameTeacherValue"
                class=""
                label="Prénom Enseignant"
                variant="outlined"
                :rules="[rules.required,rules.counter]"
                counter
                maxlength="20"
              />
            </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="givenIdLessonValue"
                variant="outlined"
                class=""
                label="Unité d'enseignement"
                :rules="[rules.required,rules.formatRessource,rules.counter]"
                :hint="hints.ressource"
              />
            </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="labelLessonValue"
                variant="outlined"
                class=""
                label="Libellé Matière"
                :rules="[rules.required,rules.formatText,rules.counter]"
                counter
                maxlength="20"
                :hint="hints.lesson"
              />
            </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                class=""
                variant="outlined"
                disabled
              >0</v-text-field>
            </div>
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