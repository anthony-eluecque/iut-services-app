<template>
  <tr
    :class="props.index%2 == 0 ? 'bg-background-tr-even' : 'bg-background-tr-odd'"
    :v-if="!props.isUpdated"
  >
    <td>{{ props.item.service?.teacher?.givenId }}</td>
    <td>{{ props.item.service?.teacher?.lastName }}</td>
    <td>{{ props.item.service?.teacher?.firstName }}</td>
    <td>{{ props.item.lesson?.givenId }}</td>
    <td>{{ props.item.lesson?.name }}</td>
    <td>{{ calculateTotalHours(props.item) }}</td>
    <td>
    <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-trash-can-outline"
          color="red"
          variant="plain"
        >
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Supression d'un Item">
          <v-card-text>
            Êtes-vous sur de vouloir supprimer cette ligne?
            <br>  
            <strong style="color: red;">Attention, cette action est irréversible</strong>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Annuler" variant="outlined" color="warning" @click="isActive.value = false"></v-btn>
            <v-btn text="Supprimer" variant="flat" color="red" @click="{removeItem(props.item);isActive.value = false}"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
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
</template>
  
  
<script setup lang="ts">
  
import { Item } from '@/types';
import {
  openItem,
  removeItem,
  initializeComponent,
  calculateTotalHours
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