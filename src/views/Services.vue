<template>
  <section class="container d-flex flex-column">
    <v-container class="container-title d-flex primary bg-background-container"  >
      <h2>Liste des Services prévisionnels</h2>
      <h2>logo</h2>
    </v-container>
    <div class="container-actions d-flex">
      <div class="add-action">
        <v-btn
          class="d-flex" 
          height="55px"
          append-icon="mdi-plus"
          text="Ajouter un enseignement"
          color="primary"
          @click="addInputFields"
        />
      </div>
    </div>

    <div class="container-content">
      <DataTable />
      <div class="container-pagination">
        <v-pagination 
          active-color="primary"
          variant="elevated"
          :length="AppStore.getPages"
          v-model="page"
          >
        </v-pagination>
      </div>
    </div>

  </section>
</template>
  
<script lang="ts" setup>
import DataTable from '@/components/DataTable.vue'
import { useAppStore } from '@/store'
import { onMounted } from 'vue';
import { computed } from 'vue';

const AppStore = useAppStore();

const page = computed({
  get : () => AppStore.pagination.page,
  set: async (newValue) => {
    await AppStore.fetchItems(newValue)
  }
})

const addInputFields = () => {
  AppStore.editIsCreatingItem(true)
}

onMounted(async () => {
  AppStore.paginationHandler(page.value);
})



</script>
  
<style>
.container-pagination{
  margin-top: 30px;
}

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
    margin-top: 80px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.container-actions{
    margin-top: 80px;
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
    display: flex;
}

</style>