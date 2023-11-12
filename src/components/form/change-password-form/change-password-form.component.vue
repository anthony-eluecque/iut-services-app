<template>
  <v-container class="container-form-password">
    <v-card>
      <v-card-title>
        <v-layout class="layout-title">
          <h3>{{ isMessageSuccess ? "Votre mot de passe a été modifié" : "Changement de mot de passe" }}</h3>
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
            @click:append="showNewPassword = !showNewPassword"
          />

          <div class="password-score">
            <div
              :class="{
                'password-color-red' : scorePassword <= 1,
                'password-color-orange' : scorePassword == 2,
                'password-color-yellow' : scorePassword == 3,
                'password-color-green' : scorePassword == 4
              }"
            />
            <div
              :class="{
                'password-color-grey' : scorePassword <= 1,
                'password-color-orange': scorePassword == 2,
                'password-color-yellow' : scorePassword == 3,
                'password-color-green' : scorePassword == 4
              }"
            />
            <div
              :class="{
                'password-color-grey' : scorePassword <= 2,
                'password-color-yellow' : scorePassword == 3,
                'password-color-green' : scorePassword == 4
              }"
            />
            <div
              :class="{
                'password-color-grey' : scorePassword <= 3,
                'password-color-green' : scorePassword == 4
              }"
            />
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
            @click:append="showRenewPassword = !showRenewPassword"
          />
        </v-form>
      </v-card-text>

      <p
        v-if="showDisplayPasswordNotEqual"
        class="message-error"
      >
        Les mots de passe ne sont pas identiques
      </p>        

      <p
        v-if="isDisplayMessageError"
        class="message-error"
      >
        Le mot de passe n'a pu etre modifié
      </p>
      <v-card-actions>
        <v-btn
          variant="flat"
          color="primary"
          class="change-password-button"
          :disabled="errorForm"
          @click="postChangePassword"
        >
          Changer votre mot de passe
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
   
<script setup  lang="ts">
import { 
  postChangePassword,
  errorForm,
  rules,
  isDisplayMessageError,
  showDisplayPasswordNotEqual,
  showRenewPassword,
  showNewPassword,
  scorePassword,
  passwordNewRe,
  passwordNew,
  isMessageSuccess,
  initializeComponent
} from './change-password-form.component';
initializeComponent();
</script>
    
<style lang="scss">
@import './changePasswordForm';
</style>