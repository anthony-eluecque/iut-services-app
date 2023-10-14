<template>
    <v-dialog v-model="AppStore.getOpenDialog" width="500" transition="slide-x-transition" content-class="custom-dialog"
        height="100vh">
        <v-container fluid class="pa-0 d-flex container-edition primary bg-background-container">
            <div class="d-flex flex-column container-modal justify-space-between">
                <div class="mt-8 d-flex container-title-edition justify-center">
                    <h1 class="pa-6 text-container-modal">Suppression d'un enseignant</h1>
                </div>
                <section class="container-content-modal pa-4 justify-space-between">
                    <div class="content-about">
                        <h2 class="pa-3">A propos du professeur :</h2>
                        <v-text-field v-model="currentTeacherId" hide-details class="pa-2" label="Matricule Enseignant"
                            variant="outlined" readonly />
                        <div class="d-flex flex-row">
                            <v-text-field v-model="currentTeacherFirstname" hide-details class="pa-2" label="Prénom"
                                variant="outlined" readonly />
                            <v-text-field v-model="currentTeacherLastname" hide-details class="pa-2" label="Nom"
                                variant="outlined" readonly />
                        </div>
                    </div>
                </section>
                <section class="container-actions-modal pa-4">
                    <div class="d-flex justify-space-between">
                        <v-btn color="error" width="40%" text="ANNULER" @click="removeModal()" />
                        <v-btn color="green" width="40%" text="SUPPRIMER" @click="removeTeacher(currentTeacher)" />
                    </div>
                </section>
            </div>
        </v-container>
    </v-dialog>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from "@/store"
import { Routes, deleteTeacher } from '@/api';
import { Teacher } from '@/types/teacher.types';

const AppStore = useAppStore();
const currentTeacher = computed(() => AppStore.getDeletingTeacher!)
const currentTeacherId = computed(() => currentTeacher.value?.givenId ? currentTeacher.value?.givenId : '')
const currentTeacherFirstname = computed(() => currentTeacher.value?.firstName ? currentTeacher.value?.firstName : '')
const currentTeacherLastname = computed(() => currentTeacher.value?.lastName ? currentTeacher.value?.lastName : '')

const removeModal = () => {
    AppStore.setStateDialog(false)
}

const removeTeacher = async (teacherToDelete: Teacher) => {
    await deleteTeacher(Routes.TEACHERS, teacherToDelete.id);
    await AppStore.fetchTeachers();
    removeModal();
}
</script>


<style>
.custom-dialog {
    border-radius: 0px !important;
}

.container-edition {
    height: 100vh;
}

.container-modal {
    width: 100%;
}
</style>