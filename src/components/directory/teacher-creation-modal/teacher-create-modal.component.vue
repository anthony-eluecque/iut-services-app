<template>
  <v-dialog
    v-model="useAppStore().getOpenDialog"
    width="500"
    transition="slide-x-transition"
    content-class="custom-dialog"
    height="100vh"
  >
    <v-container
      fluid
      class="pa-0 d-flex container-creation primary bg-background-container"
    >
      <div class="d-flex flex-column container-modal justify-space-between">
        <div class="mt-8 d-flex container-title-creation justify-center">
          <h1 class="pa-6 text-container-modal">
            Ajout d'un enseignant
          </h1>
        </div>
        <section class="container-content-modal pa-4 justify-space-between">
          <div class="content-about">
            <h2 class="pa-3">
              A propos du professeur :
            </h2>
            <v-text-field
              v-model="currentTeacherId"
              hide-details
              class="pa-2"
              label="Matricule Enseignant"
              variant="outlined"
            />
            <v-text-field
              v-model="currentTeacherFirstname"
              hide-details
              class="pa-2"
              label="Prénom"
              variant="outlined"
            />
            <v-text-field
              v-model="currentTeacherLastname"
              hide-details
              class="pa-2"
              label="Nom"
              variant="outlined"
            />
          </div>
        </section>
        <section class="container-actions-modal pa-4">
          <div class="d-flex justify-space-between">
            <v-btn
              color="error"
              width="40%"
              text="ANNULER"
              @click="removeModal()"
            />
            <v-btn
              color="green"
              width="40%"
              text="AJOUTER"
              @click="createTeacher()"
            />
          </div>
        </section>
      </div>
    </v-container>
  </v-dialog>
</template>


<script lang="ts" setup>
import { useAppStore } from '@/store';
import { 
  removeModal,
  createTeacher,
  currentTeacherFirstname,
  currentTeacherId,
  currentTeacherLastname,
  initializeComponent
} from './teacher-create-modal.component'

initializeComponent()
</script>

