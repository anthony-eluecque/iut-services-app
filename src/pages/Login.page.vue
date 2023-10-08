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
    
  <style scoped>
    .login-card {
      max-width: 400px;
      margin: auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 10px #4A66F2;
    }
  
    .login-error {
      color: #e51522;
      margin-bottom: 8px;
    }
    
    .v-text-field {
      width: 100%;
    }
    
    .container {
      background: linear-gradient(180deg, rgba(74, 102, 242, 0.68) 0%, #4A66F2 100%);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    </style>