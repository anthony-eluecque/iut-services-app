<template>
  <!-- <v-app>
    <NavigationDrawer />
    <BtnTheme></BtnTheme>
    <v-main>
      <router-view />
    </v-main>
  </v-app> -->
  <router-view />
</template>

<script lang="ts" setup>
import NavigationDrawer from '@/components/navigation-drawer-app/navigation-drawer-app.component.vue';
import BtnTheme from '@/components/btn-theme/btn-theme.component.vue';
</script>

