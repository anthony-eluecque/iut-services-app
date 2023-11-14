<template>
  <section class="container-services">
    <v-container
      fluid
      class="container-title-services primary bg-background-container"
    >
      <h2>Liste des Services prévisionnels</h2>
      <div class="container-img-title">
        <img
          src="../../assets/IUT.png"
          alt="Logo de l'IUT"
        >
      </div>
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
    <TeacherEditionCard v-if="AppStore.getOpenDialog" />
    <div class="container-actions-services">
      <v-row no-gutters>
        <v-col
          cols="0"
          sm="2"
          md="7"
          lg="8"
          xl="9"
        />        
        <v-col
          cols="12"
          sm="10"
          md="5"
          lg="4"
          xl="3"
          class="d-flex flex-row align-center"
        >            
          <div class="container-title">
            <h3>
              Année Universitaire :
            </h3>
          </div>

          <v-select 
            v-model="currentYear"
            class="pb-2 pt-2" 
            hide-details
            variant="outlined"
            :items="nextYears"
          />
        </v-col>
      </v-row>
    </div>
    <v-row class="d-flex justify-space-between">
      <v-col
        cols="12"
        sm="12"
        md="7"
        lg="8"
        xl="9"
      >
        <SearchField />
      </v-col>
      <v-col 
        cols="12"
        sm="12"
        md="5"
        lg="4"
        xl="3"  
      >
        <v-btn
          block
          height="55px"
          append-icon="mdi-plus"
          text="Ajouter un enseignement"
          color="primary"
          @click="addInputFields"
        />
      </v-col>
    </v-row>
    <div class="container-content">
      <DataTableService 
        :is-creating-item="isCreatingItem" 
        @emit-update="openModalUpdate"
        @remove-create-component="removeInputFields" 
      />
      <div class="container-pagination">
        <div class="title-hours">
          <h3 class="hours-text">
            Total Heures : {{ AppStore.getServiceHours }}
          </h3>
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