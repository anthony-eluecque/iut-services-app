<template>
    <v-row justify="center">
      <v-dialog v-model="props.isDisplay" width="auto">
        <v-card>
          <v-card-title class="text-h5">
            Suppression de votre compte
          </v-card-title>
          <v-card-text
            >Voulez vous vraiment supprimez votre compte ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="text" @click="props.deleteAccount()">
              Oui
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
              Non
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  
  <script setup lang="ts"> 
    const props = defineProps({
      deleteAccount: {
        type: Function,
        required:true
      },
      isDisplay : {
        type : Boolean,
        required: true
      }
    })

    const emit = defineEmits<{
      (e:'closeDialog') : void,
    }>();

    const closeDialog = () => emit('closeDialog')
    
  </script>
  