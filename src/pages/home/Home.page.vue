<template>
  <div>
    <h1>Home page</h1>
    {{ userStore.getUser }}
  </div>
</template>
      
<script lang="ts" setup>
import { useUserStore } from '@/store';
const userStore = useUserStore()
</script>



<style lang="scss">
@import './home';
</style>