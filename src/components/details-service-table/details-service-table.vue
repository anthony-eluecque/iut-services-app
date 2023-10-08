<template>
    <v-data-table :headers="headers" :items="serviceData" :items-per-page-text="itemsPerPageText" class="styled-table primary bg-background-container">
    </v-data-table>
  </template>
     
  
<script lang="ts" setup>
import { Item } from '../../types';
import { Service } from '../../types/service.types';
import { computed } from 'vue';
import { parseSemester, headers, itemsPerPageText, ServiceRow } from './details-service-table';

const props = defineProps({
    service: {
        type : Object as () => Service, 
        required : true
    }
});


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
