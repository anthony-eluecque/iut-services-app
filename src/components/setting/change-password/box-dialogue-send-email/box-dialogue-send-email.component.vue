<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Changer votre mot de passe
        </v-card-title>
        <v-card-text>
          Afin de pouvoir changer votre mot de passe, veuillez consulter votre boîte mail et cliquer sur le lien du message de changement de mot de passe. Le lien expirera dans 5 minutes.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="$emit('resendMail')"
          >
            Revoyer un mail
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="$emit('closeDialog')"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
let dialog = ref(true)
</script>
  