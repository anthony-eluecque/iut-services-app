<template>
    <v-card variant="outlined" width="400">
        <template v-slot:title>
            {{ props.teacher.firstName }} {{ props.teacher.lastName }}
        </template>

        <template v-slot:subtitle>
            Professeur
        </template>

        <v-card-actions>
            <v-btn color="primary">
                Button
            </v-btn>
            <v-btn color="primary">
                Button2
            </v-btn>
        </v-card-actions> </v-card>
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