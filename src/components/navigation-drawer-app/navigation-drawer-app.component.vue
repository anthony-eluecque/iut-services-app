

<template>
  <v-card class="rounded-0">
    <v-navigation-drawer 
      class="bg-background-navigation-drawer disable-scrollbar"
      permanent
    >
      <div class="section-container">
        <h1>
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
              class="list-item"
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
        <div class="section-bottom-nav">
          <v-btn
            block
            color="button-logout"
            @click="loggout"
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


<script setup lang="ts">
import {fetchData, postData } from '@/api';
import { menuItems } from './navigation-drawer.app.component'

const loggout = async () => {
  await postData('/users/logout',{});
}
</script>