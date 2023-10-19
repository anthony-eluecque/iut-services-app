<template>
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
          <v-card-actions>
            <v-btn color="primary">
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
</template>


<script setup lang="ts">
import { extractData, postData, fetchData } from '@/api';
import router from '@/router';
import { ref } from 'vue';
const password = ref('');
const email = ref('');


const postAuth = async() => {
    const data = await postData('/users/login',{email : email.value, password : password.value})
    router.push('/')
}

</script>