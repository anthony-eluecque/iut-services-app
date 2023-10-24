<template>
    <v-form @submit.prevent="search" class="container-criterias">
        <v-text-field
          hide-details
          class="field-id"
          label="Nom"
          variant="outlined"
          clearable
          persistent-clear
        />
        <v-text-field
          hide-details
          class="field-id"
          label="Prénom"
          variant="outlined"
          clearable
          persistent-clear
        />
        <v-text-field
          hide-details
          class="field-id"
          label="Adresse mail"
          variant="outlined"
          clearable
          persistent-clear
        />
    </v-form>
</template>

<script setup lang="ts">

</script>

