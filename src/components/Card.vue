<template>
    <v-dialog 
      v-model="AppStore.getOpenDialog" 
      width="500"
      transition="slide-x-transition"
      content-class="custom-dialog"
      height="100vh"
    >
        <v-container fluid class="pa-0 d-flex container-edition"  >
            <div class="d-flex flex-column container-modal justify-space-between">
                <div class="mt-8 d-flex container-title-edition justify-center">
                    <h1 class="pa-6 text-container-modal">Modification d'un enseignement</h1>
                  </div>
                <section class="container-content-modal pa-4 justify-space-between">
                    <div class="content-about">
                        <h2 class="pa-3">A propos du professeur :</h2>
                        <v-text-field
                            v-model="currentTeacherId"
                            hide-details
                            class="pa-2"
                            label="Matricule Enseignant"
                            variant="outlined"
                            readonly
                        />
                        <div class="d-flex flex-row">
                            <v-text-field
                                v-model="currentTeacherFirstname"
                                hide-details
                                class="pa-2"
                                label="Prénom"
                                variant="outlined"
                                readonly
                            />
                            <v-text-field
                                v-model="currentTeacherLastname"
                                hide-details
                                class="pa-2"
                                label="Nom"
                                variant="outlined"
                                readonly
                            />
                        </div>
                    </div>
                    <div class="content-about mt-10">
                        <h2 class="pa-3">Information sur la leçon</h2>

                        <div class="d-flex flex-row">
                            <v-text-field
                                v-model="currentLessonGivenId"
                                hide-details
                                class="pa-2"
                                label="Ressource"
                                variant="outlined"
                                readonly
                            />
                            <v-text-field
                                v-model="currentLessonName"
                                hide-details
                                class="pa-2"
                                label="Libellé"
                                variant="outlined"
                            />
                        </div>

                        <div class="d-flex flex-row pa-2">                           
                            <v-checkbox hide-details label="Cours en CM"></v-checkbox>
                            <v-text-field
                                hide-details
                                label="Nombre d'heures"
                                variant="outlined"
                            />  
                        </div>
                        <div class="d-flex flex-row pa-2">                           
                            <v-checkbox hide-details label="Cours en TD"></v-checkbox>
                            <v-text-field
                                hide-details
                                label="Nombre d'heures"
                                variant="outlined"
                            />
                        </div>
                        <div class="d-flex flex-row pa-2">                           
                            <v-checkbox hide-details label="Cours en TP"></v-checkbox>
                            <v-text-field
                                hide-details
                                label="Nombre d'heures"
                                variant="outlined"
                            />
                        </div>
                    </div>
                </section>

                <section class="container-actions-modal pa-4">
                    <div class="d-flex justify-space-between">
                        <v-btn
                            color="error"
                            width="40%"
                            text="ANNULER"
                            @click="removeModal()"
                        />
                        <v-btn
                            color="green"
                            width="40%"
                            text="METTRE à JOUR"
                            
                        />

                    </div>
                
                </section>
            </div>
        </v-container>
    </v-dialog>

</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { Item } from '@/types';
import { computed } from 'vue';
import { onBeforeUpdate } from 'vue';

const AppStore = useAppStore();

const currentItem = computed(() => AppStore.getUpdatingItem)
const currentTeacher = computed(() => currentItem.value?.service?.teacher)
const currentTeacherId = computed(() => currentTeacher.value?.givenId ? currentTeacher.value?.givenId : '')
const currentTeacherFirstname = computed(() => currentTeacher.value?.firstName ? currentTeacher.value?.firstName : '')
const currentTeacherLastname = computed(() => currentTeacher.value?.lastName ? currentTeacher.value?.lastName : '')
const currentLesson = computed(() => currentItem.value?.lesson)
const currentLessonGivenId = computed(() => currentLesson.value?.givenId ? currentItem.value?.lesson?.givenId : '')
const currentLessonName = computed(() => currentLesson.value?.name ? currentItem.value?.lesson?.name : '')



onBeforeUpdate(() => {
    // console.log(AppStore.getUpdatingItem);
})


const removeModal = () => {
    AppStore.setStateDialog(false)
}
</script>

<style>
.custom-dialog {
  position: absolute;
  right: 0  ;
  margin: 0;
  min-height: 100%;
}

.container-edition{
    height: 100vh;
    background-color: white;
}

.container-title-edition{
    background-color: #4663F8;
}

.container-modal{
    width: 100%;
}

.text-container-modal{
    color: white;
    font-family: 'Montserrat',sans-serif;
    font-weight: bold;
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
}
</style>