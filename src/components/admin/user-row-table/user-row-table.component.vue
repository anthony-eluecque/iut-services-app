<template>
    <tr>
        <td> {{  props.item.lastName }}</td>
        <td> {{ props.item.firstName }}</td>
        <td>{{ props.item.email }}</td>
        <td>
            <v-btn
            icon="mdi-trash-can-outline"
            color="red"
            variant="plain"
            />
            <v-btn
            icon="mdi-pencil-outline"
            color="orange"
            variant="plain"
            />
        </td>
    </tr>
</template>

<script setup lang="ts">
import { User } from '@/types';

const props = defineProps({
    item: {
      type: Object as () => User, 
      required: true, 
    }
});

</script>


