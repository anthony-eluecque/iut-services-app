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
      <InputField 
        :is-creating-item="isCreatingItem" 
      />
      <DataRow
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
import DataRow from './DataRow.vue'
import { useAppStore } from '@/store'
import InputField from './InputField.vue';
import { computed, onMounted, ref} from 'vue';

const AppStore = useAppStore();
const isLoading = ref(false)
const dataRows = computed(() => AppStore.getDataRows);

const props = defineProps({
  isCreatingItem: {
    type : Boolean,
    required : true
  }
})


onMounted(async () => {
  await AppStore.fetchItems(1)
  isLoading.value = true
})

const toggleUpdate = (index : number) : void => {
  AppStore.setEditingIndex(index);
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
</style>