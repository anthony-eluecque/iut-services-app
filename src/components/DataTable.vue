<template>
  <table class="styled-table" v-if="isLoading">
    <thead>
      <tr>
        <th>ID</th>
        <th>NOM</th>
        <th>Prénom</th>
        <th>ID</th>
        <th>Libellé</th>
        <th>Vol H</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <InputField />
      <tr
        v-for="item in dataRows"
        :key="item.id"
      >
        <td>{{  item.service?.teacher?.givenId }}</td>
        <td>{{  item.service?.teacher?.lastName }}</td>
        <td>{{  item.service?.teacher?.firstName }}</td>
        <td>{{ item.lesson?.givenId }}</td>
        <td>{{ item.lesson?.name }}</td>
        <td>{{ item.amountHours }}</td>
        <td>
          <v-btn
            icon="mdi-trash-can-outline"
            color="red"
            variant="plain"
            @click="deleteItem(item)"
          />
          <v-btn
            icon="mdi-pencil-outline"
            color="orange"
            variant="plain"
          />
          <v-btn
            icon="mdi-download"
            color="primary"
            variant="plain"
            @click="openItem(item)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import InputField from './InputField.vue';
import { computed, onMounted, ref} from 'vue';
import { Item } from '@/types';
import router from '@/router';

const AppStore = useAppStore();

const isLoading = ref(false)

const dataRows = computed(() => AppStore.getDataRows);

const deleteItem = async (itemToDelete : Item) => {
  await AppStore.removeItem(itemToDelete)
  console.log(itemToDelete.id)

}

onMounted(async () => {
  await AppStore.fetchItems(1)
  isLoading.value = true
})

const openItem = (itemToOpen : Item) => {
  const itemToOpenJSON = JSON.stringify(itemToOpen);
  router.push({
    name: 'ServicesDetails',
    params: {
      id: itemToOpen.service?.id,
    },
    query: {
      itemToOpenJSON: itemToOpenJSON,
    },
  });
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