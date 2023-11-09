<template>
    <v-form @submit.prevent="search" class="form-container">
        <v-row>
            <v-col>
                <v-text-field 
                    v-model="nom" 
                    hide-details 
                    class="field-text" 
                    label="Nom" 
                    variant="outlined" 
                    clearable
                    @click:clear="nom = ''" 
                    persistent-clear 
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
                    @click:clear="prenom = ''" 
                    persistent-clear 
                />
            </v-col>
            <v-col>
                <v-text-field 
                    v-model="email" 
                    hide-details 
                    class="field-text" 
                    label="Email" 
                    variant="outlined" 
                    clearable
                    @click:clear="email = ''" 
                    persistent-clear 
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
    nom,
    prenom,
    email,
    search,
} from './search-bar.component'

initializeComponent()
</script>