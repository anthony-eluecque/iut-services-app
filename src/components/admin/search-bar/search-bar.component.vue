<template>
    <v-container fluid class="container-fields">
        <v-row>
            <v-col cols="3">
            <v-text-field
                hide-details
                class="field-id"
                label="Nom"
                variant="outlined"
                clearable
                persistent-clear
            />
        </v-col>
        <v-col cols="3">
            <v-text-field
                hide-details
                class="field-id"
                label="Prénom"
                variant="outlined"
                clearable
                persistent-clear
            />
        </v-col>
        <v-col cols="3">
            <v-text-field
                hide-details
                class="field-id"
                label="Adresse mail"
                variant="outlined"
                clearable
                persistent-clear
            />
        </v-col>
        <v-col cols="3">
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
    </v-container>
</template>

<script setup lang="ts">

</script>

