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
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    label="Mot de passe"
                    counter
                    @click:append="showPassword = !showPassword"
                ></v-text-field>

                <p v-if="errorChangePassword" class="error-change-password">
                    {{errorChangePassword }}
                </p>

                <v-btn color="blue" text="Changer de mot de passe" class="change" @click="sendResetPassword(password)"/>
        </div>    

            <v-divider class="line-separor"></v-divider>

            <div class="remove-account-container">
                <p class="remove-account-title">Suppression du compte</p>
                <v-btn color="red" text="Supprimer mon compte"  @click="isDisplayDeleteAccount = true" />
            </div>
        </v-card>
    </v-dialog>
    <BoxDialogueSendEmail v-if="isDisplaySendMail" @resend-mail = "sendResetPassword(password)" @close-dialog="isDisplaySendMail = false"></BoxDialogueSendEmail>
    <DeleteAccount 
        v-if="isDisplayDeleteAccount" 
        :deleteAccount="deleteAccount"
        :is-display="isDisplayDeleteAccount"
        @closeDialog = "closeDialog()"

    ></DeleteAccount>

</template>
  
<script setup lang="ts">
    import { ref } from 'vue'
    import { initializeTheme, theme, hiddenParams, isDisplaySendMail, isDisplayDeleteAccount, errorChangePassword, sendResetPassword, deleteAccount} from './setting.component'
    import BoxDialogueSendEmail from "@/components/setting/change-password/box-dialogue-send-email/box-dialogue-send-email.component.vue"
    import DeleteAccount from "@/components/setting/delete-account/delete-account.component.vue"

    let showPassword = ref(false)
    let password = ref('')
    let dialog = ref(true)
    
    initializeTheme();

    const closeDialog = () => isDisplayDeleteAccount.value = false;
    

</script> 
  
