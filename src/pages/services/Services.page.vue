<template>
    <section class="container-services">
      <v-container fluid class="container-title-services primary bg-background-container"  >
        <h2>Liste des Services prévisionnels</h2>
        <h2>logo</h2>
      </v-container>
      <div class="container-notifications">
        <v-fade-transition>
          <v-alert 
            v-model="alert.display"
            height="100%"
            :title="alert.title" 
            :text="alert.text" 
            :type="alert.type"
            width="400px"
            transition="slide-x-transition"
          />
        </v-fade-transition>
      </div>
      <TeacherEditionCard v-if="AppStore.getOpenDialog"/>
      <div class="container-actions-services">
        <v-row no-gutters>
          <v-col cols="7">
          </v-col>
          <v-col cols="5">
            <div class="content-v-select">
              <div class="content-v-select-title">
                <h3>
                  Année Universitaire :
                </h3>
              </div>            
              <div class="container-component-select">
                <v-select 
                  v-model="currentYear" 
                  hide-details
                  variant="outlined"
                  :items="nextYears"
                />
              </div>    
            </div>   
          </v-col>
        </v-row>
      </div>

      <div class="container-actions">
        <SearchField/>
        <div class="add-action">
            <v-btn
              height="55px"
              append-icon="mdi-plus"
              text="Ajouter un enseignement"
              color="primary"
              @click="addInputFields"
            />
        </div>
      </div>

      
      <div class="container-content">
        <DataTableService 
          @emit-update="openModalUpdate" 
          :is-creating-item="isCreatingItem"
          @remove-create-component="removeInputFields" 
        />
        <div class="container-pagination">
          <div class="title-hours">
            <h3 class="hours-text">Total Heures : {{  AppStore.getServiceHours }}</h3>
          </div>
          <v-pagination 
            v-model="page"
            active-color="primary"
            variant="elevated"
            :length="AppStore.getPages"
          />
        </div>
      </div>
    </section>
  </template>
    
<script lang="ts" setup>
import DataTableService from '@/components/services/data-table-service/data-table-service.component.vue'
import { useAppStore } from '@/store'
import { onMounted, ref,Ref, computed } from 'vue';
import TeacherEditionCard from '@/components/services/teacher-edition-card/teacher-edition-card.component.vue'
import SearchField from '@/components/services/searchbar-services/searchbar-services.component.vue';

const AppStore = useAppStore();
const isCreatingItem : Ref<boolean> = ref<boolean>(false)
const nextYears = Array.from({length : 30},(_,index) => AppStore.currentYear + index)

const page = computed({
  get : () => AppStore.pagination.page,
  set: async (newValue) => {
    await AppStore.fetchItemsPage(newValue)
  }
})

const alert = computed(() => AppStore.getAlert)

const currentYear = computed({
  get : () => AppStore.currentYear,
  set: async (newValue) => {
    AppStore.currentYear = newValue
    await AppStore.fetchItemsPage(1)
  }
})

onMounted(async () => {
  AppStore.paginationHandler(page.value);
})

const openModalUpdate = (index : number) => {
  AppStore.setUpdateItem(AppStore.getDataRows[index])
  AppStore.setStateDialog(true);
}

const addInputFields = () => {
  isCreatingItem.value = true
}

const removeInputFields = () => {
  isCreatingItem.value = false
}

</script>

<style lang="scss">
@import './services';
</style>