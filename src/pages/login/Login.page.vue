<template>
    <section class="container d-flex flex-column">
      <v-container fluid>
        <v-card class="login-card">
          <v-card-title class="text-center">
            CONNEXION AUX SERVICES
          </v-card-title>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Entrez votre adresse mail"
              required
            />
            <v-text-field
              v-model="password"
              label="Entrez votre mot de passe"
              type="password"
              required
            />
            <p
              v-if="userStore.getErrorAuth"
              class="login-error"
            >
              {{ userStore.getErrorAuth }}
            </p>
            <v-btn
              type="submit"
              color="primary"
              block
            >
              Se connecter
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </section>
  </template>
    
<script lang="ts" setup>
import axios from 'axios'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const email = ''
const password = ''
  
const login = () => {
  userStore.login('rerez', '24h');
}
</script>


<style lang="scss">
@import './login';
</style>