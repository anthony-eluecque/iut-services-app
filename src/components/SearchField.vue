<script lang="ts" setup>
    import { Criterias } from '@/types/criterias.types';
    import { computed, ref } from 'vue'
    import { useAppStore } from '@/store'

    const id = ref<string>('');
    const nom = ref<string>('');
    const prenom = ref<string>('');
    const ressource = ref<string>('');
    const libelle = ref<string>('');

const appStore = useAppStore()

const email = ''
const password = ''
  
const search = () => {
    const criterias: Criterias = {id: id.value, nom: nom.value, prenom: prenom.value, ressource: ressource.value, libelle: libelle.value};
    appStore.sendCriteria(criterias)
}
</script>

<template>
    <v-form @submit.prevent="search" class="container-criteres">
      <v-text-field
          v-model="id"
          hide-details
          class="field-id"
          label="Id"
          variant="outlined"
        />

        <v-text-field
          v-model="nom"
          hide-details
          class="field-text"
          label="Nom"
          variant="outlined"
        />

        <v-text-field
          v-model="prenom"
          hide-details
          class="field-text"
          label="Prénom"
          variant="outlined"
        />

        <v-text-field
          v-model="ressource"
          hide-details
          class="field-text"
          label="Ressource"
          variant="outlined"
        />

        <v-text-field
          v-model="libelle"
          hide-details
          class="field-text"
          label="Libéllé"
          variant="outlined"
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

<style>

.container-criteres {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 1fr 2fr 1.5fr;
    column-gap: 10px;
    margin-bottom: 16px;
    width: 70%;
}

.search-button {
  height: 100% !important;
}

</style>