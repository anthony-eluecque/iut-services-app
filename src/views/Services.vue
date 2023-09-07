<template>
  <section class="container d-flex flex-column">
    <div class="container-title d-flex">
      <h2>Liste des Services prévisionnels</h2>
      <h2>logo</h2>
    </div>

    <div class="container-actions d-flex">
      <div class="add-action">
        <v-btn
            @click="addInputFields" 
            class="d-flex"
            height="55px"
            append-icon="mdi-plus"
            text="Ajouter un enseignement"
            color="primary"
        />
      </div>
    </div>

    <div class="container-content">
      <DataTable />
    </div>
  </section>
</template>
  
<script lang="ts" setup>
import DataTable from '@/components/DataTable.vue'
import { useAppStore } from '@/store'

const AppStore = useAppStore();

const addInputFields = () => {
    AppStore.editIsCreatingItem(true)
}

</script>
  
<style>
.container{
    width: 95%;
    margin: auto;
    height: 100vh;
    display: flex;
    padding: 20px;
    background-color: #F4F3F3;
    justify-content: space-around;
}

.container-content {
    /* background-color: white; */
    width: 100%;
    height: 50%;
}

.container-actions{
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
    background: white;
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