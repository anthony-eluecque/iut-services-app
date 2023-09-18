<template>
    <section>
        <h1>{{ id }}</h1>
    </section>
</template>


<script setup lang="ts">
import router from '@/router';
const id = router.currentRoute.value.params.id

</script>


<style>

</style>