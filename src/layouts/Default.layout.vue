<template>
  <v-app>
    <NavigationDrawer />
    <BtnTheme />
    <DefaultView />
  </v-app>
</template>



<script lang="ts" setup>
import NavigationDrawer from '@/components/navigation-drawer-app/navigation-drawer-app.component.vue';
import BtnTheme from '@/components/btn-theme/btn-theme.component.vue';
import DefaultView from './View.layout.vue';
</script>