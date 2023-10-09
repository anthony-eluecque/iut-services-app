<script setup lang="ts">
import { menuItems } from './navigation-drawer.app.component'
</script>

<template>
  <v-card class="rounded-0">
    <v-navigation-drawer 
      class="bg-background-navigation-drawer disable-scrollbar"
      permanent
    >
      <div class="section-container">
        <h1 class="mx-auto title-app pa-5">
          IUT SERVICES APP
        </h1>

        <div class="section-nav">
          <v-list nav>
            <v-list-subheader class="menu-title">
              Menu
            </v-list-subheader>

            <v-list-item
              v-for="(item, index) in menuItems"
              :key="index"
              class="ml-4 list-item"
              :class="{ 'bottom-border': index < menuItems.length - 1 }"
              :to="item.path"
            >
              <v-icon class="white--text mr-5">
                {{ item.icon }}
              </v-icon> {{ item.text }}
            </v-list-item>
          </v-list>
        </div>
      </div>


      <template #append>
        <div class="pa-2">
          <v-btn
            block
            color="button-logout"
          >
            <p class="custom-text text-title-button-logout">
              Se déconnecter
            </p>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>
