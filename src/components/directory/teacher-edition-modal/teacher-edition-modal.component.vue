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
      class="container-edition primary bg-background-container"
    >
      <div class="container-modal">
        <div class="container-title-edition">
          <h1 class="pa-6 text-container-modal">
            Modification d'un enseignant
          </h1>
        </div>
        <section class="container-content-modal">
          <div class="content-about">
            <h2 class="pa-3">
              A propos du professeur :
            </h2>
            <v-text-field
              v-model="state.givenId"
              hide-details
              class="pa-2"
              label="Matricule Enseignant"
              variant="outlined"
            />
            <v-text-field
              v-model="state.firstName"
              hide-details
              class="pa-2"
              label="Prénom"
              variant="outlined"
            />
            <v-text-field
              v-model="state.lastName"
              hide-details
              class="pa-2"
              label="Nom"
              variant="outlined"
            />
          </div>
        </section>
        <section class="container-actions-modal">
          <div class="container-actions">
            <v-btn
              color="error"
              width="40%"
              text="ANNULER"
              @click="removeModal"
            />
            <v-btn
              color="green"
              width="40%"
              text="METTRE À JOUR"
              @click="editTeacher"
            />
          </div>
        </section>
      </div>
    </v-container>
  </v-dialog>
</template>


<script lang="ts" setup>
import { useAppStore } from "@/store"
import { initializeComponent, state, removeModal, editTeacher} from './teacher-edition-modal.component'
initializeComponent()
</script>