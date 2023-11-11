<template>
  <div>
    <v-container class="container-form">
      <v-layout class="wrap container-wrap">
        <div class="login-form-container">
          <v-card>
            <v-card-title>
              <v-layout class="layout-title">
                <h3>Bienvenue sur IUT Services</h3>
              </v-layout>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <p>Connectez vous avec votre adresse mail et votre mot de passe</p>
              <v-form class="login-form-fields">
                <v-text-field
                  v-model="email" 
                  variant="outlined"
                  label="Adresse mail"   
                />

                <v-text-field
                  v-model="password"
                  variant="outlined"
                  hide-details
                  label="Mot de passe"
                  type="password"
                />
              </v-form>
            </v-card-text>

            <p
              v-if="errorAuthentification"
              class="error_authentification"
            >
              L'adresse mail ou le mot de passe n'est pas correct
            </p>
            <p
              v-if="errorReinitPassword"
              class="error_authentification"
            >
              {{ errorReinitPassword }}
            </p>

            <v-card-actions>
              <v-btn
                color="primary"
                @click="forgotPassword()"
              >
                Mot de passe oublié?
              </v-btn>
              <v-spacer />
              <v-btn
                variant="flat"
                color="primary"
                @click="postAuth"
              >
                <v-icon
                  start
                  icon="mdi-lock"
                />
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-layout>
    </v-container>
    <boxDialogueSendEmail
      v-if="isDisplaySendMail"
      @resend-mail="forgotPassword()"
      @close-dialog="isDisplaySendMail = false"
    />
  </div>
</template>


<script setup lang="ts">
import { postData, Routes, ResponseData } from '@/api';
import router from '@/router';
import { useUserStore } from '@/store';
import { ref } from 'vue';
import { User } from '@/types'
import boxDialogueSendEmail from "@/components/setting/change-password/box-dialogue-send-email/box-dialogue-send-email.component.vue"
import { Ref } from 'vue';

const password = ref('');
const email = ref('');
const errorAuthentification = ref(false);
let isDisplaySendMail = ref(false);
const errorReinitPassword: Ref<string | null> = ref(null);

const forgotPassword = async() => {
  isDisplaySendMail.value = false;
  errorAuthentification.value = false;

  errorReinitPassword.value = null;
  const response : ResponseData<any> = await postData(Routes.USERS + '/forgotPassword', {
    email : email.value
  });

  if (response.status === 200) {
    isDisplaySendMail.value = true;
  }
  else if (response.status === 404) {
    errorReinitPassword.value = response.data.data;
  }
  else {
    errorReinitPassword.value = "Erreur lors de la réinitialisation du mot de passe";   
  }
}

const postAuth = async() => {
  errorAuthentification.value = false;
  useUserStore()
  const res : ResponseData<User> = await postData(Routes.USERS + '/login',{
    email : email.value, password : password.value
  });

  if (res.status == 204) {
    router.push('/')
  }
  else if (res.status == 400) {
    errorAuthentification.value = true;
  }
}

</script>