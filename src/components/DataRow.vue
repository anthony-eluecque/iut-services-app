<template>
    <tr @click="toggleDetails(props.item,$event,props.index)"
      >
        <td>{{  props.item.service?.teacher?.givenId }}</td>
        <td>{{  props.item.service?.teacher?.lastName }}</td>
        <td>{{  props.item.service?.teacher?.firstName }}</td>
        <td>{{ props.item.lesson?.givenId }}</td>
        <td>{{ props.item.lesson?.name }}</td>
        <td>{{ props.item.amountHours }}</td>
        <td>
          <v-btn
            icon="mdi-trash-can-outline"
            color="red"
            variant="plain"
            @click="deleteItem(props.item)"
          />
          <v-btn
            icon="mdi-pencil-outline"
            color="orange"
            variant="plain"
            @click="toggleUpdate(props.index)"
          />
          <v-btn
            icon="mdi-download"
            color="primary"
            variant="plain"
            @click="openItem(props.item)"
          />
        </td>
      </tr>
</template>


<script setup lang="ts">

import { useAppStore } from '@/store'
import InputField from './InputField.vue';
import { computed, onMounted, ref} from 'vue';
import { Item } from '@/types';
import router from '@/router';

const AppStore = useAppStore();
const showDetailsIndex = ref<number | null>(null);
const editingIndex = ref<number | null>(null)

// const props = defineProps(['Item','Index']);
const props = defineProps({
  item: {
      type: Object as () => Item, 
      required: true, 
  },
  index: {
      type: Number, 
      required: true, 
  },
});


console.log(props)


const closeDetails = () : void => {
  const existingDetails = document.querySelector('.details-row');
    if (existingDetails) {
      existingDetails.remove();
    }
}


const toggleUpdate = (index : number) => {
  editingIndex.value = index
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

const dataRows = computed(() => AppStore.getDataRows);

const deleteItem = async (itemToDelete : Item) => {
  await AppStore.removeItem(itemToDelete)
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