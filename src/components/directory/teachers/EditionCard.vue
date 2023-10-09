<template>
    <v-dialog v-model="AppStore.getOpenDialog" width="500" transition="slide-x-transition" content-class="custom-dialog"
        height="100vh">
        <v-container fluid class="pa-0 d-flex container-edition primary bg-background-container">
            <div class="d-flex flex-column container-modal justify-space-between">
                <div class="mt-8 d-flex container-title-edition justify-center">
                    <h1 class="pa-6 text-container-modal">Modification d'un enseignant</h1>
                </div>
                <section class="container-content-modal pa-4 justify-space-between">
                    <div class="content-about">
                        <h2 class="pa-3">A propos du professeur :</h2>
                        <v-text-field v-model="currentTeacherId" hide-details class="pa-2" label="Matricule Enseignant"
                            variant="outlined" />
                        <div class="d-flex flex-row">
                            <v-text-field v-model="currentTeacherFirstname" hide-details class="pa-2" label="Prénom"
                                variant="outlined" />
                            <v-text-field v-model="currentTeacherLastname" hide-details class="pa-2" label="Nom"
                                variant="outlined" />
                        </div>
                    </div>
                </section>
                <section class="container-actions-modal pa-4">
                    <div class="d-flex justify-space-between">
                        <v-btn color="error" width="40%" text="ANNULER" @click="removeModal()" />
                        <v-btn color="green" width="40%" text="METTRE À JOUR" @click="editTeacher(currentTeacher)" />
                    </div>
                </section>
            </div>
        </v-container>
    </v-dialog>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from "@/store"
import { Teacher } from '@/types/teacher.types';
import { Routes, updateTeacher } from '@/api';

const AppStore = useAppStore();
const currentTeacher = computed(() => AppStore.getUpdatingTeacher!)
const currentTeacherId = computed({
    get: () => currentTeacher.value?.givenId ? currentTeacher.value?.givenId : '',
    set: (value) => currentTeacher.value!.givenId = value
})
const currentTeacherFirstname = computed({
    get: () => currentTeacher.value?.firstName ? currentTeacher.value?.firstName : '',
    set: (value) => currentTeacher.value!.firstName = value
})
const currentTeacherLastname = computed({
    get: () => currentTeacher.value?.lastName ? currentTeacher.value?.lastName : '',
    set: (value) => currentTeacher.value!.lastName = value
})

const removeModal = () => {
    AppStore.setStateDialog(false)
}

const editTeacher = async (teacherToUpdate: Teacher) => {
    const updatedData = {
        givenId: currentTeacherId.value,
        firstName: currentTeacherFirstname.value,
        lastName: currentTeacherLastname.value
    }
    await updateTeacher(Routes.TEACHERS, teacherToUpdate.id, updatedData);
    await AppStore.fetchTeachers();
    AppStore.setStateDialog(false)
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