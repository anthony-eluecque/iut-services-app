<template>
  <tr>
    <td> {{ props.user.lastName }} </td>
    <td> {{ props.user.firstName }} </td>
    <td> {{ props.user.email }} </td>
    <td>
      <v-btn
        icon="mdi-trash-can-outline"
        color="red"
        variant="plain"
        @click="removeUser(props.user)"
      />
      <v-btn
        icon="mdi-pencil-outline"
        color="orange"
        variant="plain"
        @click="emitUpdate(props.index)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { User } from '@/types';
import { defineProps } from 'vue';
import {
  removeUser,
  initializeComponent
} from './user-row-table.component';

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isUpdated: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits<{
    (e: 'emitUpdate', index: number): void,
}>();

const emitUpdate = (index: number) => {
  emit('emitUpdate', index)
}

initializeComponent();

</script>