<template>
    <v-data-table :headers="headers" :items="serviceData" :items-per-page-text="itemsPerPageText" class="styled-table-details primary bg-background-container">
    </v-data-table>
</template>
     
  
<script lang="ts" setup>
import { Item } from '../../../types';
import { Service } from '../../../types/service.types';
import { computed } from 'vue';
import { parseSemester, headers, itemsPerPageText, ServiceRow } from './details-service-table';
import { id } from '@/components/services/searchbar-services/searchbar-services.component';

const props = defineProps({
    service: {
        type : Object as () => Service, 
        required : true
    }
});

const serviceData = computed(() => {
    const data : ServiceRow[]|undefined = props.service.items?.map((item : Item) => {
        return {
            givenId: item.lesson?.givenId ?? "",
            name: item.lesson?.name ?? "",
            types : item.lessonTypes.map(lesson => lesson.lessonType.name + " "),
            semester : parseSemester(item.lesson?.givenId ?? ""),
            amountHours : calculateTotalHours(item)
        }
    })
    return data;
});

const calculateTotalHours = (item : Item) => {
    return item.lessonTypes.reduce((acc,lessonType) => lessonType.amountHours + acc, 0)
}
</script>