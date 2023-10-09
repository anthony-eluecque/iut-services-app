<template>
    <v-dialog 
      v-model="AppStore.getOpenDialog" 
      width="500"
      transition="slide-x-transition"
      content-class="custom-dialog"
      height="100vh"
    >
        <v-container fluid class="container-edition primary bg-background-container"  >
            <div class="container-modal">
                <div class="container-title-edition">
                    <h1>Modification d'un enseignement</h1>
                  </div>
                <section class="container-content-modal">
                    <div class="about-teacher">
                        <h2>A propos du professeur :</h2>
                        <v-text-field
                            v-model="currentTeacherId"
                            hide-details
                            class="pa-2"
                            label="Matricule Enseignant"
                            variant="outlined"
                            readonly
                        />
                        <div class="container-v-fields">
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
                    <div class="about-lesson">
                        <h2>Information sur la leçon</h2>

                        <div class="container-v-fields">
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

                        <div class="container-lesson-types">                           
                            <v-checkbox hide-details label="Cours en CM"></v-checkbox>
                            <v-text-field
                                hide-details
                                label="Nombre d'heures"
                                variant="outlined"
                            />  
                        </div>
                        <div class="container-lesson-types">                           
                            <v-checkbox hide-details label="Cours en TD"></v-checkbox>
                            <v-text-field
                                hide-details
                                label="Nombre d'heures"
                                variant="outlined"
                            />
                        </div>
                        <div class="container-lesson-types">                           
                            <v-checkbox hide-details label="Cours en TP"></v-checkbox>
                            <v-text-field
                                hide-details
                                label="Nombre d'heures"
                                variant="outlined"
                            />
                        </div>
                    </div>
                </section>

                <section class="container-actions">
                    <div class="actions">
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
import { useAppStore } from '../../store';
import { 
    removeModal, 
    currentTeacherId,
    currentTeacherFirstname,
    currentTeacherLastname,
    currentLessonGivenId,
    currentLessonName,
    initializeComponent
} from './teacher-edition-card.component'
const AppStore = useAppStore();
initializeComponent();
</script>