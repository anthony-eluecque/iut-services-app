<template>
    <table
      v-if="isLoading"
      class="styled-table"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>NOM</th>
          <th>Prénom</th>
          <th>Ressource</th>
          <th>Libellé</th>
          <th>Vol H</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <addServiceFields 
          :is-creating-item="isCreatingItem" 
        />
        <rowTableServices
          v-for="(item,index) in dataRows"
          :item="item"
          :index="index"
          :is-updated="index === AppStore.getEditingIndex"
          @emitUpdate="toggleUpdate"
        />
      </tbody>
    </table>
  </template>
  
<script lang="ts" setup>
import rowTableServices from '../row-table-services/row-table-services.component.vue'
import { useAppStore } from '@/store'
import addServiceFields from '../add-service-fields/add-service-fields.component.vue';
import { computed, onMounted } from 'vue';

import {
    displayDataTable,
    isLoading,
} from './data-table-service.component'
import { onBeforeMount } from 'vue';

const AppStore = useAppStore()

const emit = defineEmits<{
    (e:'emitUpdate',index : number): void
}>();
  
const props = defineProps({
    isCreatingItem: {
      type : Boolean,
      required : true
    }
})

const dataRows = computed(() => AppStore.getDataRows);

onMounted(async () => {
    // await displayDataTable()
    await AppStore.fetchItems(1)
    isLoading.value = true;
})

// onBeforeMount(async () => await displayDataTable())
  
const toggleUpdate = (index : number) : void => {
    emit('emitUpdate',index)
}
</script>
  
  
<style scoped>

.styled-table{
    width: 100%;
    border-collapse: collapse;
}

.styled-table thead{
    background-color: #4663F8;
    font-family: 'Montserrat',sans-serif;
    font-weight: 500;
    font-size: 25px;
}


.styled-table thead tr {
    /* background-color: #009879; */
    color: #ffffff;
    text-align: left;
}

.styled-table th {
    padding: 10px 15px;
}

.styled-table td {
    padding: 15px 15px;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:nth-of-type(odd) {
    background-color: white;
}
.text-field-container {
    display: flex;
    align-items: center; 
}

</style>