<script setup lang="ts">
import Directory from '@/views/Directory.vue';
import Home from '@/views/Home.vue';
import Services from '@/views/Services.vue';
const menuItems = [
  { text: 'Accueil', path:'/home', icon: 'mdi-home-outline', component: Home },
  { text: 'Services', path:'/services', icon: 'mdi-book-account-outline', component: Services},
  { text: 'Directory', path:'/directory', icon: 'mdi-folder-outline', component: Directory},

]

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


<style scoped>

.list-item{
    font-family: 'Montserrat';
    font-size: 16px;
    font-weight: bold;
    border-radius: 0px;
}

.disable-scrollbar {
  /* Désactivez la barre de défilement */
  overflow: hidden;
}


.bottom-border{
    border-bottom: 1px solid white;
}

.section-nav{
    width: 100%;
}

.section-container {
    margin: auto;
    width: 90%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

}

.menu-title{
    color: white;
    font-family: 'Montserrat';
    font-size: 16px;
    font-weight: bold;
    /* width: 80%; */
}
.title-app{
    width: 80%;
    font-family: 'Roboto',sans-serif;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid white;
}

.custom-text {
    font-family: 'Montserrat',sans-serif;
    font-weight: bold;
}
</style>