<template>
    <section class="container d-flex flex-column">
        <v-container fluid class="d-flex container-title primary bg-background-container"  >
        <h2>Répertoire</h2>
        <h2>logo</h2>
        </v-container>
        <div class="container-content-tabs d-flex">
            <v-card class="mb-4" >
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
                            <div class="mt-2 d-flex flex-row justify-space-between">
                                <div class="pa-2 container-fields-filter flex-row d-flex">
                                    <v-text-field
                                        v-model="givenIdTeacher"
                                        hide-details
                                        label="Matricule Enseignant"
                                        variant="outlined"
                                    />
                                    <v-text-field
                                        v-model="firstnameTeacher"
                                        hide-details
                                        label="Prénom"
                                        variant="outlined"
                                    />
                                    <v-text-field
                                        v-model="lastnameTeacher"
                                        hide-details
                                        label="Nom"
                                        variant="outlined"
                                    />
                                </div>
                                <div class="pt-2 pb-2">
                                    <v-btn
                                        height="55px"
                                        append-icon="mdi-plus"
                                        text="Ajouter un professeur"
                                        color="primary" 
                                    />
                                </div>
                            </div>
                            <div class="mt-12 teachers d-flex">
                                <TeacherCard class="teacher-grow" :teacher="t" v-for="(t,i) in teachers">test</TeacherCard>
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
import { Ref } from 'vue';
import { useAppStore } from '@/store';
import _ from 'lodash';
import { watch } from 'vue';
import { onBeforeMount } from 'vue';

const AppStore = useAppStore();
const teachers : Ref<Teacher[]> = ref([]);
const givenIdTeacher : Ref<string> = ref('');
const firstnameTeacher : Ref<string> = ref('');
const lastnameTeacher : Ref<string> = ref('');
const tab = ref(0)

onBeforeMount(async() => {
    await AppStore.fetchTeachers()
    teachers.value = AppStore.getTeachers
})

const filterTeacher = () => {
  teachers.value = AppStore.getTeachers.filter((teacher) => {
    return (
      teacher.givenId.includes(givenIdTeacher.value) &&
      teacher.firstName.includes(firstnameTeacher.value) &&
      teacher.lastName.includes(lastnameTeacher.value)
    );
  });
};


watch(givenIdTeacher,filterTeacher)
watch(firstnameTeacher,filterTeacher)
watch(lastnameTeacher,filterTeacher)

</script>


<style>

.container-fields-filter{
    width: 600px;
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

.teacher-grow{
    flex-grow: 1;
}
</style>