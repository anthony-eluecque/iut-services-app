<template>
  <v-data-table :headers="headers" :items="serviceData" :items-per-page-text="itemsPerPageText" class="styled-table">
  </v-data-table>
</template>
   

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed, onMounted, ref } from 'vue';

const AppStore = useAppStore();
const dataRows = computed(() => AppStore.getDataRows);
const itemsPerPageText = ref('Résultats par page');

interface ServiceRow {
  givenId: string;
  name: string;
  type: string;
  semester: number;
  amountHours: number;
}

const headers = ref([
  { title: 'Ressource', align: 'start', sortable: false, key: 'givenId' },
  { title: 'Enseignement', align: 'start', sortable: false, key: 'name' },
  { title: 'Type', align: 'start', sortable: false, key: 'type' },
  { title: 'Semestre', align: 'start', sortable: false, key: 'semester' },
  { title: 'Heures', align: 'start', sortable: false, key: 'amountHours' },
]);

const serviceData = computed(() => {
  const data: ServiceRow[] = [];
  dataRows.value.forEach((value) => {
    const id = value.lesson?.givenId!;
    data.push({
      givenId: id,
      name: value.lesson?.name!,
      type: value.type!,
      semester: parseSemester(id),
      amountHours: value.amountHours,
    });
  });
  return data;
});

const parseSemester = (semester: string): number => {
  return parseInt(semester.split('.')[0].slice(1));
};
</script>


<style scoped>
.styled-table {
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background: white;
}

.styled-table td {
  border-bottom: 1px solid grey;
  text-align: center;
  vertical-align: middle;
}

.styled-table th {
  border-bottom: 1px solid grey;
  text-align: center;
}
</style>
