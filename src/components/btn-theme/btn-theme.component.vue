<template>
    <v-btn @click="toggleTheme" class="v-btn--icon btn-theme">
      <v-icon>{{theme.global.name.value == 'lightTheme' ? 'mdi-weather-night' : 'mdi-weather-sunny'}}</v-icon>
    </v-btn>
</template>

<script setup lang="ts">
import { toggleTheme, initializeTheme, theme } from './btn-theme.component'
initializeTheme();
</script>