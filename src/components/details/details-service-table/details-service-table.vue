<template>
    <v-data-table :headers="headers" :items="serviceData" :items-per-page-text="itemsPerPageText" class="styled-table-details primary bg-background-container">
    </v-data-table>
</template>
     
  
<script lang="ts" setup>
import { Item } from '../../../types';
import { Service } from '../../../types/service.types';
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