<script lang="ts" setup>
import { 
    search, 
    initializeComponent,
    id,
    nom,
    prenom,
    ressource,
    libelle  
} from './searchbar-services.component';

initializeComponent();
</script>

<template>
    <v-form @submit.prevent="search" class="container-criteres">
        <v-text-field
          v-model="id"
          hide-details
          class="field-id"
          label="Id"
          variant="outlined"
          clearable
          @click:clear="id = ''"
          persistent-clear
        />

        <v-text-field
          v-model="nom"
          hide-details
          class="field-text"
          label="Nom"
          variant="outlined"
          @click:clear="nom = ''"
          clearable
          persistent-clear
        />

        <v-text-field
          v-model="prenom"
          hide-details
          class="field-text"
          label="Prénom"
          variant="outlined"
          @click:clear="prenom = ''"
          clearable
          persistent-clear
        />

        <v-text-field
          v-model="ressource"
          hide-details
          class="field-text"
          label="Ressource"
          variant="outlined"
          @click:clear="ressource = ''"
          clearable
          persistent-clear
        />

        <v-text-field
          v-model="libelle"
          hide-details
          class="field-text"
          label="Libéllé"
          variant="outlined"
          @click:clear="libelle = ''"
          clearable
          persistent-clear
        />
        <v-btn
            type="submit"
            color="primary"
            class="search-button"
            append-icon="mdi-magnify"
            block
        >
            Filtrer
        </v-btn>
    </v-form>
        
</template>