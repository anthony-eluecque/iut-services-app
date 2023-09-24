<template>
      <v-btn @click="toggleTheme" class="v-btn--icon btn-theme">
        <v-icon>{{theme.global.name.value == 'lightTheme' ? 'mdi-weather-night' : 'mdi-weather-sunny'}}</v-icon>
      </v-btn>
</template>

<script setup>
  import { useTheme } from 'vuetify'
  
  const theme = useTheme()
  
  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
  }
</script>
<style>
    .btn-theme{
        position: fixed;
        bottom: 10px;
        right: 10px;
    }
</style>