<template>
  <section class="container d-flex flex-column">
    <v-container fluid class="d-flex container-title primary bg-background-container"  >
      <h2>Liste des Services prévisionnels</h2>
      <h2>logo</h2>
    </v-container>
    <div class="container-actions d-flex">
      <v-row no-gutters>
        <v-col cols="7">
          <!-- Ajouter ici les filtres (GL :))-->
        </v-col>
        <v-col cols="5">
          <div class="content-v-select">
            <div class="content-v-select-title">
              <h3 class="mr-2">
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
          <div class="add-action">
            <v-btn
              height="55px"
              append-icon="mdi-plus"
              text="Ajouter un enseignement"
              color="primary"
              @click="addInputFields"
            />
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="container-content">
      <DataTable :is-creating-item="isCreatingItem" />
      <div class="container-pagination">
        <div class="d-flex justify-end">
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
import DataTable from '@/components/DataTable.vue'
import { useAppStore } from '@/store'
import { onMounted, ref, computed } from 'vue';

const AppStore = useAppStore();
const isCreatingItem = ref<boolean>(false)
const nextYears = Array.from({length : 30},(_,index) => AppStore.currentYear + index)

const page = computed({
  get : () => AppStore.pagination.page,
  set: async (newValue) => {
    await AppStore.fetchItems(newValue)
  }
})

const currentYear = computed({
  get : () => AppStore.currentYear,
  set: async (newValue) => {
    AppStore.currentYear = newValue
    await AppStore.fetchItems(1)
  }
})

onMounted(async () => {
  AppStore.paginationHandler(page.value);
})

const addInputFields = () => {
  isCreatingItem.value = true
}



</script>
  
<style>
.container{
    width: 95%;
    margin: auto;
    /* height: 100vh; */
    display: flex;
    padding: 20px;
    justify-content: space-around;
}

.container-content {
    /* background-color: white; */
    margin-top: 40px;
    display: flex;
    height: 550px;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.hours-text{
  font-family: 'Roboto',sans-serif;
  font-weight: 800;
  font-size: 20px;
  text-transform: uppercase;
}

.container-actions{
    margin-top: 10px;
    height: 8%;
    justify-content: flex-end;
    align-items: center;
}

.container-title{
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;
}

.container-title h2{
    font-family: 'Montserrat',sans-serif;
    font-weight: bold;
    font-size: 32px;
}

.add-action{
    margin-top: 20px;
    display: flex;
    justify-content: end;
}

.content-v-select-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-v-select-title h3{
  font-family: 'Roboto',sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;

}

.content-v-select{
  display: flex;
  justify-content: end;
}

.container-component-select{
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>