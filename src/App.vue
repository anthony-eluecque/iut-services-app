<template>
  <v-app>
    <NavigationDrawer />
    <BtnTheme></BtnTheme>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavigationDrawer from './components/NavigationDrawer.vue';
import BtnTheme from './components/BtnTheme.vue';


</script>

<style>
  .v-main {
    flex: unset !important;
  }
</style>

