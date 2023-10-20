<template>
    <v-dialog v-model="AppStore.getOpenDialog" width="500" transition="slide-x-transition" content-class="custom-dialog"
        height="100vh">
        <v-container fluid class="pa-0 d-flex container-creation primary bg-background-container">
            <div class="d-flex flex-column container-modal justify-space-between">
                <div class="mt-8 d-flex container-title-creation justify-center">
                    <h1 class="pa-6 text-container-modal">Ajout d'un enseignant</h1>
                </div>
                <section class="container-content-modal pa-4 justify-space-between">
                    <div class="content-about">
                        <h2 class="pa-3">A propos du professeur :</h2>
                        <v-text-field v-model="currentTeacherId" hide-details class="pa-2" label="Matricule Enseignant"
                            variant="outlined" />
                        <v-text-field v-model="currentTeacherFirstname" hide-details class="pa-2" label="Prénom"
                            variant="outlined" />
                        <v-text-field v-model="currentTeacherLastname" hide-details class="pa-2" label="Nom"
                            variant="outlined" />
                    </div>
                </section>
                <section class="container-actions-modal pa-4">
                    <div class="d-flex justify-space-between">
                        <v-btn color="error" width="40%" text="ANNULER" @click="removeModal()" />
                        <v-btn color="green" width="40%" text="AJOUTER" @click="createTeacher()" />
                    </div>
                </section>
            </div>
        </v-container>
    </v-dialog>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { useAppStore } from "@/store";
import { Teacher } from '@/types/teacher.types';

const AppStore = useAppStore();

const currentTeacherId = ref<string>('');
const currentTeacherFirstname = ref<string>('');
const currentTeacherLastname = ref<string>('');

const removeModal = () => {
    AppStore.setStateDialog(false);
}

const createTeacher = async () => {
    const newTeacher: Teacher = {
        id: '',
        givenId: currentTeacherId.value,
        firstName: currentTeacherFirstname.value,
        lastName: currentTeacherLastname.value,
    };
    await AppStore.addTeacher(newTeacher);
    await AppStore.fetchTeachers();
    removeModal();
}
</script>


<style>
.custom-dialog {
    border-radius: 0px !important;
}

.container-creation {
    height: 100vh;
    background-color: white;
}

.container-title-creation {
    background-color: #4663F8;
}

.container-creation {
    height: 100vh;
}

.container-modal {
    width: 100%;
}
</style>