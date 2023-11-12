<template>
  <tr v-if="props.isCreatingUser">
    <td colspan="7">
      <v-form ref="form">
        <v-row>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="lastNameUserValue"
                class=""
                label="Nom Utilisateur"
                variant="outlined"
                :rules="[rules.required, rules.capitalizeAll]"
              />
            </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="firstNameUserValue"
                class=""
                label="Prénom Utilisateur"
                variant="outlined"
                :rules="[rules.required, rules.capitalize]"
              />
            </div>
          </v-col>
          <v-col>
            <div class="text-field-container">
              <v-text-field
                v-model="emailUserValue"
                class=""
                label="Mail Utilisateur"
                variant="outlined"
                :rules="[rules.required, rules.formatEmail]"
              />
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
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '@/store';
import { User } from '@/types';
import {
  initializeComponent,
  lastNameUserValue,
  firstNameUserValue,
  emailUserValue,
  cancelInput,
  AddOrUpdateUser
} from './add-user-component'

initializeComponent()

const emit = defineEmits<{
    (e: 'removeCreateComponent'): void
}>();

const props = defineProps({
  user: {
    type: Object as () => User,
    required: false
  },
  isCreatingUser: {
    type: Boolean,
    required: true
  }
})

const hints = {
  email: "Par exemple exemple@gmail.com",
};

const rules = {
  required: (value: string) => !!value || 'Champs requis',
  capitalize: (value: string) =>  {
    const regex = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/;
    return regex.test(value) || `La première lettre de chaque mot doit être une majuscule`;
  },
  capitalizeAll: (value: string) => {
    const regex = /^[A-Z\s]+$/;
    return regex.test(value) || `Toutes les lettres doivent être des majuscules`;
  },
  formatEmail: (value: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value) || `L'adresse email saisie n'est pas valide`;
  },
}

const deleteComponent = () => {
  cancelInput()
  emit('removeCreateComponent')
}

const form = ref(null)

/**
 * Valide le formulaire avant de déclencher une action.
 * Si le formulaire est valide, appelle la fonction AddOrUpdateUser, sinon affiche une alerte.
 *
 * @throws {Error} - Une erreur avec le message approprié en cas d'échec.
 */
const validateFormBeforeCallback = async () => {
  const res = await form.value.validate()
  const { errors, valid } = res
  if (valid) {
    await AddOrUpdateUser()
    cancelInput()
    emit('removeCreateComponent')
  } else {
    useAppStore().createAlert(
      'Formulaire invalide',
      `L'utilisateur que vous essayez de créer est invalide !`,
      'error'
    );
  }
}
</script>
