<template>
    <v-card variant="outlined" width="300">
        <template v-slot:title>
            {{ props.teacher.firstName }} {{ props.teacher.lastName }}
        </template>

        <template v-slot:subtitle>
            Professeur
        </template>
        <v-card-actions>
            <v-btn color="warning">
                Modifier
            </v-btn>
            <v-btn color="error">
                Supprimer
            </v-btn>
        </v-card-actions> 
    </v-card>
</template>


<script setup lang="ts">
import { Teacher } from '@/types';

const props = defineProps({
    teacher: {
        type: Object as () => Teacher,
        required: true
    }
})
</script>

<style></style>