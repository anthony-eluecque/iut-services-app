import { ThemeInstance, useTheme } from "vuetify/lib/framework.mjs"
import { useAppStore } from "@/store";
import { Ref, ref } from "vue";
import { ResponseData, Routes, postData } from "@/api";
import router from "@/router";
const AppStore = useAppStore();

export let theme : ThemeInstance;
export const isDisplaySendMail = ref(false);
export const errorChangePassword: Ref<string | null> = ref(null);
export const isDisplayAccount = ref(false);
export const isDisplayDeleteAccount = ref(false);
export const showPassword = ref(false);
export const password = ref('');
export const dialog = ref(true);

export const initializeTheme = () => {
  theme = useTheme()
}

export const hiddenParams = () => {
  AppStore.setDisplayParams(false);
};

export const sendResetPassword = async(password: string) => {
  errorChangePassword.value = null;
  const response: ResponseData<any> = await postData(`${Routes.USERS}/resetPassword`, {password});
  if (response.status === 200) {
    isDisplaySendMail.value = true;
  }
  else if (response.status === 404) {
    errorChangePassword.value = response.data.data;
  }
  else {
    errorChangePassword.value = "Erreur lors de la réinitialisation du mot de passe";   
  }
}

export const deleteAccount = async() => {
  const response: ResponseData<any> = await postData(`${Routes.USERS}/deleteAccount`, {});
  if (response.status === 200) {
    await postData('/users/logout',{});
    router.push('/login');     }
  else {
    errorChangePassword.value = "Erreur lors de la réinitialisation du mot de passe";   
  }
}

    
