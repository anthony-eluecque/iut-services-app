import Directory from '../../pages/Directory.page.vue';
import Home from '../../pages/Home.page.vue';
import Services from '../../pages/Services.page.vue';

export const menuItems = [
  { text: 'Accueil', path:'/home', icon: 'mdi-home-outline', component: Home },
  { text: 'Services', path:'/services', icon: 'mdi-book-account-outline', component: Services},
  { text: 'Directory', path:'/directory', icon: 'mdi-folder-outline', component: Directory},

]