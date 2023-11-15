

<template>
  <v-card class="rounded-0">
    <v-toolbar 
      v-if="!mdAndUp" 
      class="bg-background-navigation-drawer"
    >
      <v-list
        bg-color="transparent"
        width="100%"
        class="d-flex justify-space-evenly"
        nav
        density="compact"
      >
      <v-list-item>
        <v-menu
            min-width="200px"
            rounded
          >
            <template #activator="{ props }">
              <v-btn
                icon
                v-bind="props"
              >
                <v-avatar
                  color="primary"
                  size="large"
                >
                  <span class="text-h5">
                    {{ useUserStore().getUser.firstName[0] + useUserStore().getUser.lastName[0] }}
                  </span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar
                    color="primary"
                  >
                    <span class="text-h5">{{ useUserStore().getUser.firstName[0] + useUserStore().getUser.lastName[0] }}</span>
                  </v-avatar>
                  <h3 class="mt-4">
                    {{ useUserStore().getUser.firstName + " " + useUserStore().getUser.lastName }}
                  </h3>
                  <p class="text-caption mt-1">
                    {{ useUserStore().getUser.email }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
      </v-list-item>
        <v-list-item
          v-for="(item, index) in getItemsForRole"
          :key="index"
          class="icon-nav"
          :to="item.path"
        >
          <v-icon :icon="item.icon" />
        </v-list-item>
        <v-list-item>
          <v-icon
            class="change-theme-icon"
            @click="displayParams()"
          >
            mdi-cog-outline
          </v-icon>
        </v-list-item> 
        <v-list-item>
          <div class="section-bottom-nav">
            <v-btn
              block
              color="button-logout"
              icon="mdi-logout"
              @click="loggout"
            />
          </div>
        </v-list-item>     
      </v-list>
    </v-toolbar>
    <v-navigation-drawer 
      v-model="drawer"
      class="bg-background-navigation-drawer disable-scrollbar"
      :permanent="mdAndUp"
      elevation="24" 
      floating
    >
      <div class="section-container">
        <div class="container-top-profile">
          <v-menu
            min-width="200px"
            rounded
          >
            <template #activator="{ props }">
              <v-btn
                icon
                v-bind="props"
              >
                <v-avatar
                  color="primary"
                  size="large"
                >
                  <span class="text-h5">
                    {{ useUserStore().getUser.firstName[0] + useUserStore().getUser.lastName[0] }}
                  </span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar
                    color="primary"
                  >
                    <span class="text-h5">{{ useUserStore().getUser.firstName[0] + useUserStore().getUser.lastName[0] }}</span>
                  </v-avatar>
                  <h3 class="mt-4">
                    {{ useUserStore().getUser.firstName + " " + useUserStore().getUser.lastName }}
                  </h3>
                  <p class="text-caption mt-1">
                    {{ useUserStore().getUser.email }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
          <h1>
            IUT SERVICES APP
          </h1>
        </div>

        <div class="section-nav">
          <v-list
            nav
            density="compact"
          >
            <v-list-subheader class="menu-title">
              Menu
            </v-list-subheader>

            <v-list-item
              v-for="(item, index) in getItemsForRole"
              :key="index"
              class="list-item"
              :class="{ 'bottom-border': index < menuItems.length - 1 }"
              :to="item.path"
              :prepend-icon="item.icon"
              :title="item.text"
            />
          </v-list>
        </div>
      </div>
      <template #append>
        <v-icon
          class="change-theme-icon"
          @click="displayParams()"
        >
          mdi-cog-outline
        </v-icon>
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
import { menuItems, loggout } from './navigation-drawer.app.component'
import { useAppStore, useUserStore } from '@/store';
import { computed, ref } from 'vue';

const AppStore = useAppStore();

const displayParams = () => {
  AppStore.setDisplayParams(true);
}

const getItemsForRole = computed(() => menuItems.filter((item : any) => item.isAdmin === useUserStore().getUser.isAdmin))


const drawer = ref(null)

import { useDisplay } from 'vuetify'
const display = useDisplay()
const { xs, mdAndUp } = useDisplay()
</script>