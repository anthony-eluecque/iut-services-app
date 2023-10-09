<template>
    <v-card variant="outlined" width="300">
        <template v-slot:title>
            {{ props.teacher.firstName }} {{ props.teacher.lastName }}
        </template>
        <template v-slot:subtitle>
            Professeur
        </template>
        <v-card-actions>
            <v-btn color="warning" @click="emitToggleUpdate(props.index)">
                Modifier
            </v-btn>
            <v-btn color="error" @click="emitToggleDelete(props.index)">
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
    },
    index: {
        type: Number,
        required: true,
    }
})

const emit = defineEmits<{
    (e: 'emitUpdate', index: number): void
    (e: 'emitDelete', index: number): void
}>();

const emitToggleUpdate = (index: number) => {
    emit('emitUpdate', index)
}

const emitToggleDelete = (index: number) => {
    emit('emitDelete', index)
}
</script>


<style></style>