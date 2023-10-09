import Directory from '@/pages/directory/Directory.page.vue';
import Home from '@/pages/home/Home.page.vue';
import Services from '@/pages/services/Services.page.vue';

export const menuItems = [
  { text: 'Accueil', path:'/home', icon: 'mdi-home-outline', component: Home },
  { text: 'Services', path:'/services', icon: 'mdi-book-account-outline', component: Services},
  { text: 'Répertoire', path:'/directory', icon: 'mdi-folder-outline', component: Directory},

]