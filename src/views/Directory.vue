<template>
    <section class="container d-flex flex-column">
        <v-container fluid class="d-flex container-title primary bg-background-container"  >
        <h2>Répertoire</h2>
        <h2>logo</h2>
        </v-container>

        <div class="container-content-tabs d-flex">
            <v-card>
                <v-tabs
                v-model="tab"
                bg-color="primary"
                >
                    <v-tab value="teachers">Professeurs</v-tab>
                    <v-tab value="lessons">Enseignements</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-window v-model="tab">
                        <v-window-item class="" value="teachers">
                            <h1>Filtrer :</h1>
                            <div class="mt-2 d-flex flex-row container-filters">
                                <v-text-field
                                    hide-details
                                    label="Matricule Enseignant"
                                    variant="outlined"
                                    readonly
                                />
                                <v-text-field
                                    hide-details
                                    label="Prénom"
                                    variant="outlined"
                                    readonly
                                />
                                <v-text-field
                                    hide-details
                                    label="Nom"
                                    variant="outlined"
                                    readonly
                                />
                            </div>
                            <div class="mt-12 teachers d-flex">
                                <TeacherCard :teacher="testTeacher" v-for="i in 5">test</TeacherCard>
                            </div>
                        </v-window-item>

                        <v-window-item class="lessons d-flex" value="lessons">

                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </div>
    </section>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import TeacherCard from '@/components/TeacherCard.vue';
import { Teacher } from '@/types';

const testTeacher : Teacher = {
    firstName : 'Anthony',
    givenId : '123456789',
    id : '',
    lastName : 'ELUECQUE'
}

const tab = ref(0)

</script>


<style>

.container-filters{
    width: 60%;
    flex-wrap: wrap;
    gap: 12px;
    overflow: auto;
}

.teachers{
    flex-wrap: wrap;
    gap: 50px;
    overflow: auto;
}

.container-content-tabs{
    margin-top: 60px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.container{
    width: 95%;
    margin: auto;
    height: 100%;
}   
</style>