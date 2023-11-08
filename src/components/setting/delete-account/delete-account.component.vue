<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-title class="text-h5">
            Suppression de votre compte
          </v-card-title>
          <v-card-text
            >Voulez vous vraiment supprimez votre compte ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="text" @click="$emit('deleteAccount')">
              Oui
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="$emit('closeDialog')">
              Non
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    let dialog = ref(true)
  </script>
  