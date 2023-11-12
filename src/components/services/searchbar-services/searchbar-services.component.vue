<template>
  <v-form
    class="form-container"
    @submit.prevent="search"
  >
    <v-row>
      <v-col>
        <v-text-field
          v-model="id"
          class="field-id"
          label="Id"
          variant="outlined"
          clearable
          persistent-clear
          @click:clear="id = ''"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="nom"
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
          class="field-text"
          label="Prénom"
          variant="outlined"
          clearable
          persistent-clear
          @click:clear="prenom = ''"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="ressource"
          class="field-text"
          label="Ressource"
          variant="outlined"
          clearable
          persistent-clear
          @click:clear="ressource = ''"
        />            
      </v-col>
      <v-col>
        <v-text-field
          v-model="libelle"
          class="field-text"
          label="Libéllé"
          variant="outlined"
          clearable
          persistent-clear
          @click:clear="libelle = ''"
        />
      </v-col>
      <v-col>
        <v-btn
          type="submit"
          color="primary"
          append-icon="mdi-magnify"
          class="search-button"
        >
          Filtrer
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

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