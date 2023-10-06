<template>
  <v-data-table :headers="headers" :items="serviceData" :items-per-page-text="itemsPerPageText" class="styled-table primary bg-background-container">
  </v-data-table>
</template>
   

<script lang="ts" setup>
import { Item } from '@/types';
import { Service } from '@/types/service.types';
import { Ref } from 'vue';
import { DeepReadonly, computed, ref } from 'vue';

const props = defineProps({
  service: {
    type : Object as () => Service, 
    required : true
  }
});

const itemsPerPageText = ref('Résultats par page');

interface ServiceRow {
  givenId: string;
  name: string;
  type: string;
  semester: number;
  amountHours: number;
}

const headers: Ref<DeepReadonly<any[]>> = ref([
  { title: 'Ressource', align: 'start', sortable: false, key: 'givenId' },
  { title: 'Enseignement', align: 'start', sortable: false, key: 'name' },
  { title: 'Type', align: 'start', sortable: false, key: 'type' },
  { title: 'Semestre', align: 'start', sortable: false, key: 'semester' },
  { title: 'Heures', align: 'start', sortable: false, key: 'amountHours' },
]);

const serviceData = computed(() => {
  const data: ServiceRow[] = [];
  props.service.items?.forEach((item : Item) => {
    const id = item.lesson?.givenId ? item.lesson?.givenId : ""
    data.push({
      givenId: id,
      name: item.lesson?.name!,
      type: item.type!,
      semester: parseSemester(id),
      amountHours: item.amountHours,
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
