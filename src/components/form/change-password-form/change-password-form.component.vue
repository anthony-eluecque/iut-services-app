<template>
    <v-container class="container-form-password">
      <v-card>
        <v-card-title>
            <v-layout class="layout-title">
              <h3>{{isMessageSuccess ? "Votre mot de passe a été modifié" : "Changement de mot de passe"}}</h3>
            </v-layout>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <p>Veuillez changer votre mot de passe</p>
          <v-form class="change-password-form-fields">
            <v-text-field
              v-model="passwordNew"
              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showNewPassword ? 'text' : 'password'"
              name="passwordNew"
              label="Nouveau mot de passe"
              hint="Au minimum 8 caractères"
              counter
              @click:append="showNewPassword = !showNewPassword">
            </v-text-field>

            <div class="password-score">
              <div v-bind:class="{
                    'password-color-red' : scorePassword <= 1,
                    'password-color-orange' : scorePassword == 2,
                    'password-color-yellow' : scorePassword == 3,
                    'password-color-green' : scorePassword == 4
                }"></div>
              <div v-bind:class="{
                    'password-color-grey' : scorePassword <= 1,
                    'password-color-orange': scorePassword == 2,
                    'password-color-yellow' : scorePassword == 3,
                    'password-color-green' : scorePassword == 4
                }"></div>
            <div v-bind:class="{
                    'password-color-grey' : scorePassword <= 2,
                    'password-color-yellow' : scorePassword == 3,
                    'password-color-green' : scorePassword == 4
                }"></div>
            <div v-bind:class="{
                    'password-color-grey' : scorePassword <= 3,
                    'password-color-green' : scorePassword == 4
                }"></div>
          </div>

          <v-text-field
              v-model="passwordNewRe"
              :append-icon="showRenewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showRenewPassword ? 'text' : 'password'"
              name="passwordNewRe"
              label="Resaissir le nouveau mot de passe"
              hint="Au minimum 8 caractères"
              counter
              @click:append="showRenewPassword = !showRenewPassword">
            </v-text-field>
          </v-form>
        </v-card-text>

        <p v-if="showDisplayPasswordNotEqual" class="message-error">
            Les mots de passe ne sont pas identiques</p>        

        <p v-if="isDisplayMessageError" class="message-error">
          Le mot de passe n'a pu etre modifié
        </p>
        <v-card-actions>
          <v-btn
            variant="flat"
            color="primary"
            class="change-password-button"
            :disabled="errorForm"
            @click="postChangePassword">
               Changer votre mot de passe
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
</template>
   
  <script setup  lang="ts">
      import { ref } from 'vue'
      import { ResponseData, Routes, postData } from "@/api";
      import { useRoute } from 'vue-router'
      import router from '@/router';
      import zxcvbn from 'zxcvbn';
      import { computed } from 'vue';

      const route = useRoute()
      const showNewPassword = ref(false);
      const showRenewPassword = ref(false);
      const passwordNew = ref('');
      const passwordNewRe = ref('');
      const isMessageSuccess = ref(false);
      const isDisplayMessageError = ref(false);
      const scorePassword = computed(() => zxcvbn(passwordNew.value).score);
      const showDisplayPasswordNotEqual = ref(false);

      let rules = {
        required: (value: string) => !!value || 'La saisie est obligatoire',
        min: (value: string) => value.length >= 8 || 'Il faut plus de 8 caractères',
      }

      const errorForm = computed(() => {
        showDisplayPasswordNotEqual.value = rules.required(passwordNew.value) == true && rules.required(passwordNewRe.value) == true &&
              passwordNew.value != passwordNewRe.value;
        isDisplayMessageError.value = false;

        return !(rules.required(passwordNew.value) == true && rules.min(passwordNew.value) == true &&
        rules.required(passwordNewRe.value) == true && rules.min(passwordNewRe.value) == true &&
        passwordNew.value == passwordNewRe.value) == true
      });
  

      const postChangePassword = async() => {
        const changePasswordResponse : ResponseData<any> = await postData(`${Routes.USERS}/changePassword`, {password: passwordNew.value, token: route.query.token});
    
        if (changePasswordResponse.status == 200) {
          isMessageSuccess.value = true;
          await postData('/users/logout',{});

          setTimeout(() => {
            router.push('/login');            
          }, 2000)
        }
        else {
          isDisplayMessageError.value = true;
        }
      }
  </script>
    
  <style lang="scss">
    @import './changePasswordForm';
  </style>