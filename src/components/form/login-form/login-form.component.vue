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
                @click="forgotPassword"
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
      @resend-mail="forgotPassword"
      @close-dialog="isDisplaySendMail = false"
    />
  </div>
</template>


<script setup lang="ts">
import boxDialogueSendEmail from "@/components/setting/change-password/box-dialogue-send-email/box-dialogue-send-email.component.vue"
import {
  isDisplaySendMail,
  forgotPassword,
  errorAuthentification,
  password,
  errorReinitPassword,
  email,
  postAuth
} from './login-form.component'
import { onMounted } from "vue";

onMounted(() => {
  password.value = ''
  email.value = ''
})
</script>