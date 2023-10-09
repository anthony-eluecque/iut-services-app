import { getCurrentInstance } from 'vue'
import { ThemeInstance, useTheme } from 'vuetify'

export let theme : ThemeInstance

export const initializeTheme = () => {
  theme = useTheme()
}

export const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}


