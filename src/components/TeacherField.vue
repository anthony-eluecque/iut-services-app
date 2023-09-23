<template>
  <div class ="container-info d-flex">
    <v-text-field
        class="flex-item"
        :value="props.teacher.firstName"
        variant="solo"
        hide-details
        readonly
    />
    <v-text-field
      class="flex-item"
      :value="props.teacher.lastName"
      variant="solo"
      hide-details
      readonly
    />

    <v-text-field
      class="flex-item"
      :value="props.teacher.givenId"
      variant="solo"
      hide-details
      readonly
    />
  </div>
</template>

<script lang="ts" setup>
import { Teacher } from '@/types';

const props = defineProps({
  teacher: {
    type : Object as () => Teacher, 
    required : true
  }
})

</script>

<style>

.container-info{
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  background-color: white;
}

.flex-item {
  flex: 1;
  margin: 5px 20px;
  align-self: center;
}

</style>