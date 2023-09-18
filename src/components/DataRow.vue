<template>
  <!-- <tr @click="toggleDetails(props.item,$event,props.index)"> -->
  <tr v-if="!props.isUpdated">
    <td>{{ props.item.service?.teacher?.givenId }}</td>
    <td>{{ props.item.service?.teacher?.lastName }}</td>
    <td>{{ props.item.service?.teacher?.firstName }}</td>
    <td>{{ props.item.lesson?.givenId }}</td>
    <td>{{ props.item.lesson?.name }}</td>
    <td>{{ props.item.amountHours }}</td>
    <td>
      <v-btn
        icon="mdi-trash-can-outline"
        color="red"
        variant="plain"
        @click="removeItem(props.item)"
      />
      <v-btn
        icon="mdi-pencil-outline"
        color="orange"
        variant="plain"
        @click="emitToggleUpdate(props.index)"
      />
      <v-btn
        icon="mdi-download"
        color="primary"
        variant="plain"
        @click="openItem(props.item)"
      />
    </td>
  </tr>
  <InputField 
    v-if="props.isUpdated"
    :is-creating-item="true"
    :item="props.item"
  />
</template>


<script setup lang="ts">

import { useAppStore } from '@/store'
import InputField from './InputField.vue';
import { computed, onMounted, ref} from 'vue';
import { Item } from '@/types';
import router from '@/router';
import { Routes, deleteItem } from '@/api';

const AppStore = useAppStore();
const showDetailsIndex = ref<number | null>(null);

const emit = defineEmits<{
  (e:'emitUpdate',index : number): void
}>();

const props = defineProps({
  item: {
    type: Object as () => Item, 
    required: true, 
  },
  index: {
    type: Number, 
    required: true, 
  },
  isUpdated : {
    type : Boolean,
    required : true
  }
});


const emitToggleUpdate = (index : number) => {
  emit('emitUpdate',index)
}

const closeDetails = () : void => {
  const existingDetails = document.querySelector('.details-row');
  if (existingDetails) {
    existingDetails.remove();
  }
}

const toggleDetails = (item: Item, event: Event, index: number) : void => {

  if (showDetailsIndex.value === index) {
    showDetailsIndex.value = null;
    closeDetails()
    return;
  }

  showDetailsIndex.value = index;
  const clickedTr = event.currentTarget as HTMLElement;
  closeDetails()
  const detailsTr = document.createElement('tr');
  detailsTr.className = 'details-row';
  detailsTr.innerHTML = `<td colspan="7">Contenu des détails ici</td>`;
  clickedTr.insertAdjacentElement('afterend', detailsTr);
}

const removeItem = async (itemToDelete : Item) => {
  await deleteItem(Routes.ITEMS,itemToDelete.id);
  await AppStore.fetchItems(AppStore.pagination.page)
}

const openItem = (itemToOpen : Item) => {
  router.push('/services/'+itemToOpen.service?.id)
}

</script>


<style scoped> 

.styled-table td {
    padding: 15px 15px;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:nth-of-type(odd) {
    background-color: white;
}
</style>