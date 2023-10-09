<template>
    <!-- <tr @click="toggleDetails(props.item,$event,props.index)"> -->
    <tr :class="props.index%2 == 0 ? 'bg-background-tr-even' : 'bg-background-tr-odd'" :v-if="!props.isUpdated">
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
    <addServiceFields 
      v-if="props.isUpdated"
      :is-creating-item="true"
      :item="props.item"
    />
  </template>
  
  
<script setup lang="ts">
  
import { Item } from '@/types';
import addServiceFields from '../add-service-fields/add-service-fields.component.vue';
import {
    openItem,
    removeItem,
    initializeComponent
} from './row-table-services.component';

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

const emit = defineEmits<{
    (e:'emitUpdate',index : number): void
}>();

const emitToggleUpdate = (index : number) => {
    emit('emitUpdate',index)
}

initializeComponent()
</script>