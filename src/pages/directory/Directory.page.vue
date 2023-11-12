<template>
  <section class="container-directory">
    <v-container
      fluid
      class="container-title primary bg-background-container"
    >
      <h2>Répertoire</h2>
      <div class="container-img-title">
        <img
          src="../../assets/IUT.png"
          alt="Logo de l'IUT"
        >
      </div>
    </v-container>
    <EditionCard v-if="isUpdatingTeacher" />
    <DeletionCard v-if="isDeletingTeacher" />
    <CreationCard v-if="isCreatingTeacher" />
    <div class="container-content-tabs d-flex">
      <v-card>
        <v-tabs
          v-model="tab"
          color="primary"
          align-tabs="start"
        >
          <v-tab :value="1">
            Professeurs
          </v-tab>
          <v-tab :value="2">
            Leçons
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-container fluid>
              <h1>Filtrer :</h1>
              <div class="container-filters-tabs">
                <SearchField />
                <div class="pb-2">
                  <v-btn
                    height="55px"
                    append-icon="mdi-plus"
                    text="Ajouter un professeur"
                    color="primary"
                    @click="openModalCreate"
                  />
                </div>
              </div>
              <div class="teachers">
                <TeacherCard
                  v-for="(t, i) in teachers"
                  :key="t.id"
                  :is-updating-teacher="isUpdatingTeacher"
                  :is-deleting-teacher="isDeletingTeacher"
                  class="teacher-grow"
                  :teacher="t"
                  :index="i"
                  @emitUpdate="openModalUpdate"
                  @emitDelete="openModalDelete"
                />
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
import TeacherCard from '@/components/directory/teacher-directory-card/teacher-directory-card.component.vue';
import { Lesson } from '@/types';
import { useAppStore } from '@/store';
import { onBeforeMount, ref, Ref, computed } from 'vue';
import LessonsTab from '@/components/directory/lessons-listing-tab/lessons-listing-tab.component.vue'
import EditionCard from '@/components/directory/teacher-edition-modal/teacher-edition-modal.component.vue'
import DeletionCard from '@/components/directory/teacher-delete-modal/teacher-delete-modal.component.vue'
import CreationCard from '@/components/directory/teacher-creation-modal/teacher-create-modal.component.vue'
import SearchField from '@/components/directory/teacher-search-bar/teacher-search-bar.component.vue';

const AppStore = useAppStore();
const teachers = computed(() => AppStore.getTeachers);
const lessons: Ref<Lesson[]> = ref([]);
const tab = ref("1")
const isUpdatingTeacher: Ref<boolean> = ref(false)
const isDeletingTeacher: Ref<boolean> = ref(false)
const isCreatingTeacher: Ref<boolean> = ref(false)

onBeforeMount(async () => {
  await AppStore.fetchTeachers()
  await AppStore.fetchLessons()
  lessons.value = AppStore.getLessons
})

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
</script>


<style lang="scss">
@import './directory';
</style>