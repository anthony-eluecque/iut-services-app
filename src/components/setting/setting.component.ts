import { ThemeInstance, useTheme } from "vuetify/lib/framework.mjs"
import { useAppStore } from "@/store";
const AppStore = useAppStore();

export let theme : ThemeInstance

export const initializeTheme = () => {
  theme = useTheme()
}

export const hiddenParams = () => {
    AppStore.setDisplayParams(false);
};