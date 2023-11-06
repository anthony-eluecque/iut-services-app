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
    <v-form @submit.prevent="search" class="form-container">
        <v-row>
          <v-col>
            <v-text-field
              v-model="id"
              class="field-id"
              label="Id"
              variant="outlined"
              clearable
              @click:clear="id = ''"
              persistent-clear
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="nom"
              class="field-text"
              label="Nom"
              variant="outlined"
              @click:clear="nom = ''"
              clearable
              persistent-clear
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="prenom"
              class="field-text"
              label="Prénom"
              variant="outlined"
              @click:clear="prenom = ''"
              clearable
              persistent-clear
            />
          </v-col>

          <v-col>
            <v-text-field
              v-model="ressource"
              class="field-text"
              label="Ressource"
              variant="outlined"
              @click:clear="ressource = ''"
              clearable
              persistent-clear
            />            
          </v-col>
          <v-col>
            <v-text-field
              v-model="libelle"
              class="field-text"
              label="Libéllé"
              variant="outlined"
              @click:clear="libelle = ''"
              clearable
              persistent-clear
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