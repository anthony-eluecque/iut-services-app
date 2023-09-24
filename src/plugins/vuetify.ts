/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F4F3F3',
    surface: '#FFFFFF',
    primary: '#4663F8',
    secondary: '#242934',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'background-container': '#FFFFFF',
    'background-tr-even': '#f3f3f3',
    'background-tr-odd': '#FFFFFF',
    'background-navigation-drawer': '#242934',
    'button-logout': '#FFFFFF',
    'title-button-logout': '#4663F8'
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#191919',
    surface: '#36373B',
    primary: '#1663F8',
    secondary: '#242934',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'background-container': '#36373B',
    'background-tr-even': '#303135',
    'background-tr-odd': '#36373B',
    'background-navigation-drawer': '#303135',
    'button-logout': '#4663F8',
    'title-button-logout': '#FFFFFF'
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme
    },
  },
})

