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
  await AppStore.fetchItemsPage(1)
  isLoading.value = true
})

// onBeforeMount(async () => await displayDataTable())
  
const toggleUpdate = (index : number) : void => {
    emit('emitUpdate',index)
}
</script>
