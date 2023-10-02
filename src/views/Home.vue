<template>
  <h1>Home page</h1>
  <TeacherCard :teacher="teacher" />
</template>
    
<script lang="ts" setup>

import TeacherCard from '@/components/TeacherCard.vue';
import { ref } from 'vue';

const teacher = ref({
  firstName: 'John',
  lastName: 'Doe',
  givenId: '123456789',
  id: '1'
});
</script>