<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="hiddenParams()">
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Paramètre</v-toolbar-title>
            </v-toolbar>

            <div class="theme-container">
                <p>Thème</p>
                <v-switch :label="theme.global.name.value == 'lightTheme' ? 'Clair' : 'Sombre'" 
                v-model="theme.global.name.value"
                true-value="lightTheme"
                false-value="darkTheme"
                ></v-switch>
            </div>
    
            <v-divider></v-divider>
                
            <div class="parameter-password-container">
                <p class="change-password-title">Changement mot de passe</p>
                <v-text-field
                    v-model="passwordOld"
                    :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showOldPassword ? 'text' : 'password'"
                    name="password"
                    label="Ancien mot de passe"
                    hint="At least 8 characters"
                    counter
                    @click:append="showOldPassword = !showOldPassword"
                ></v-text-field>
        
                <v-btn color="blue" text="Changer de mot de passe" class="change" />
        </div>    

            <v-divider class="line-separor"></v-divider>

            <div class="remove-account-container">
                <p class="remove-account-title">Suppression du compte</p>
                <v-btn color="red" text="supprimer mon compte" />
            </div>
        </v-card>
    </v-dialog>
   </template>
  
  <script setup>
    import { ref } from 'vue'
    import { initializeTheme, theme, hiddenParams} from './setting.component'

    let showOldPassword = ref(false)
    let passwordOld = ref('')
    let dialog = ref(true)
    let rules = {
      required: (value) => !!value || 'La saisie est obligatoire',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    }

    
    initializeTheme();
  </script>
  
