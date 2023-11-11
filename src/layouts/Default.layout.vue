<template>
  <v-app>
    <NavigationDrawer />
    <DefaultView />
    <Settings v-if="AppStore.getDisplayParam" />
  </v-app>
</template>



<script lang="ts" setup>
import NavigationDrawer from '@/components/navigation-drawer-app/navigation-drawer-app.component.vue';
import DefaultView from './View.layout.vue';
import Settings  from '@/components/setting/setting.component.vue';

import { useAppStore } from "@/store";
const AppStore = useAppStore();

</script>