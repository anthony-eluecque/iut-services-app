<template>
    <section class="container d-flex flex-column">
        <v-container fluid class="d-flex container-title primary bg-background-container">
            <h2>Répertoire</h2>
            <h2>logo</h2>
        </v-container>
        <EditionCard v-if="isUpdatingTeacher" />
        <DeletionCard v-if="isDeletingTeacher" />
        <CreationCard v-if="isCreatingTeacher" />
        <div class="container-content-tabs d-flex">
            <v-card>
                <v-tabs v-model="tab" color="primary" align-tabs="start">
                    <v-tab :value="1">Professeurs</v-tab>
                    <v-tab :value="2">Leçons</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item :value="1">
                        <v-container fluid>
                            <h1>Filtrer :</h1>
                            <div class="mt-2 d-flex flex-row justify-space-between">
                                <div class="pa-2 container-fields-filter flex-row d-flex">
                                    <v-text-field v-model="givenIdTeacher" hide-details label="Matricule Enseignant"
                                        variant="outlined" />
                                    <v-text-field v-model="firstnameTeacher" hide-details label="Prénom"
                                        variant="outlined" />
                                    <v-text-field v-model="lastnameTeacher" hide-details label="Nom" variant="outlined" />
                                </div>
                                <div class="pt-2 pb-2">
                                    <v-btn height="55px" append-icon="mdi-plus" text="Ajouter un professeur" @click="openModalCreate"
                                        color="primary" />
                                </div>
                            </div>
                            <div class="mt-12 teachers d-flex">
                                <TeacherCard
                                    @emitUpdate="openModalUpdate" :is-updating-teacher="isUpdatingTeacher"
                                    @emitDelete="openModalDelete" :is-deleting-teacher="isDeletingTeacher"
                                    class="teacher-grow" :teacher="t" :index="i" v-for="(t, i) in teachers">test
                                </TeacherCard>
                            </div>
                        </v-container>
                    </v-window-item>
                    <LessonsTab :lessons="lessons" />
                </v-window>
            </v-card>
        </div>
    </section>
</template>


<script setup lang="ts">
import TeacherCard from '@/components/TeacherCard.vue';
import { Lesson, Teacher } from '@/types';
import { useAppStore } from '@/store';
import _ from 'lodash';
import { onBeforeMount, ref, watch, Ref, computed } from 'vue';
import LessonsTab from '@/components/directory/lessons/LessonsTab.vue'
import EditionCard from '@/components/directory/teachers/EditionCard.vue';
import DeletionCard from '@/components/directory/teachers/DeletionCard.vue';
import CreationCard from '@/components/directory/teachers/CreationCard.vue';

const AppStore = useAppStore();
//const teachers: Ref<Teacher[]> = ref([]);
const teachers = computed(() => AppStore.getTeachers);
const lessons: Ref<Lesson[]> = ref([]);
const givenIdTeacher: Ref<string> = ref('');
const firstnameTeacher: Ref<string> = ref('');
const lastnameTeacher: Ref<string> = ref('');
const tab = ref("1")
const isUpdatingTeacher: Ref<boolean> = ref(false)
const isDeletingTeacher: Ref<boolean> = ref(false)
const isCreatingTeacher: Ref<boolean> = ref(false)

onBeforeMount(async () => {
    await AppStore.fetchTeachers()
    await AppStore.fetchLessons()
    lessons.value = AppStore.getLessons
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

const openModalUpdate = (index: number) => {
    isUpdatingTeacher.value = true
    isDeletingTeacher.value = false
    isCreatingTeacher.value = false
    AppStore.setUpdateTeacher(AppStore.getTeachers[index])
    AppStore.setStateDialog(true);
}

const openModalDelete = (index: number) => {
    isDeletingTeacher.value = true
    isUpdatingTeacher.value = false
    isCreatingTeacher.value = false
    AppStore.setDeleteTeacher(AppStore.getTeachers[index])
    AppStore.setStateDialog(true);
}

const openModalCreate = () => {
    isCreatingTeacher.value = true
    isDeletingTeacher.value = false
    isUpdatingTeacher.value = false
    AppStore.setStateDialog(true);
}

watch(givenIdTeacher, filterTeacher)
watch(firstnameTeacher, filterTeacher)
watch(lastnameTeacher, filterTeacher)
</script>


<style>
.container-fields-filter {
    width: 600px;
    flex-wrap: wrap;
    gap: 12px;
    overflow: auto;
}

.teachers {
    flex-wrap: wrap;
    gap: 50px;
    overflow: auto;
}

.container-content-tabs {
    margin-top: 60px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.container {
    width: 95%;
    margin: auto;
    height: 100%;
}

.teacher-grow {
    flex-grow: 1;
}
</style>