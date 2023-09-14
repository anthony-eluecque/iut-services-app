<template>
  <v-app>
    <NavigationDrawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavigationDrawer from './components/NavigationDrawer.vue';


</script>


<style>
*{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>