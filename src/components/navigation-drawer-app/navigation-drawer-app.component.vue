

<template>
  <v-card class="rounded-0">
    <v-navigation-drawer 
      class="bg-background-navigation-drawer disable-scrollbar"
      permanent
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
                  <span class="text-h5">{{ useUserStore().getUser.firstName[0] + useUserStore().getUser.lastName[0] }}</span>
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
          <v-list nav>
            <v-list-subheader class="menu-title">
              Menu
            </v-list-subheader>

            <v-list-item
              v-for="(item, index) in getItemsForRole"
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
import { postData } from '@/api';
import { menuItems } from './navigation-drawer.app.component'
import router from '@/router';
import { useAppStore, useUserStore } from '@/store';
import { computed } from 'vue';
const AppStore = useAppStore();

const displayParams = () => {
  AppStore.setDisplayParams(true);
}

const getItemsForRole = computed(() => menuItems.filter((item : any) => item.isAdmin === useUserStore().getUser.isAdmin))

const loggout = async () => {
  await postData('/users/logout',{});
  router.push('/login')
}
</script>