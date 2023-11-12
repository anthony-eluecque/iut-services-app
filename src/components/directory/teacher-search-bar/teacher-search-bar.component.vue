<template>
  <v-form
    class="form-container"
    @submit.prevent="search"
  >
    <v-row>
      <v-col>
        <v-text-field 
          v-model="matricule" 
          hide-details 
          class="field-text" 
          label="Matricule" 
          variant="outlined" 
          clearable
          persistent-clear 
          @click:clear="matricule = ''" 
        />
      </v-col>
      <v-col>
        <v-text-field 
          v-model="nom" 
          hide-details 
          class="field-text" 
          label="Nom" 
          variant="outlined" 
          clearable
          persistent-clear 
          @click:clear="nom = ''" 
        />
      </v-col>
      <v-col>
        <v-text-field 
          v-model="prenom" 
          hide-details 
          class="field-text" 
          label="Prénom" 
          variant="outlined" 
          clearable
          persistent-clear 
          @click:clear="prenom = ''" 
        />
      </v-col>
      <v-col>
        <v-btn 
          type="submit" 
          color="primary" 
          class="search-button" 
          append-icon="mdi-magnify" 
          block
        >
          Filtrer
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
  
<script setup lang="ts">
import {
  initializeComponent,
  matricule,
  nom,
  prenom,
  search,
} from './teacher-search-bar.component'
  
initializeComponent()
</script>