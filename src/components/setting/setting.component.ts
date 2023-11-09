import { ThemeInstance, useTheme } from "vuetify/lib/framework.mjs"
import { useAppStore } from "@/store";
import boxDialogueSendEmail from "@/components/setting/change-password/box-dialogue-send-email/box-dialogue-send-email.component.vue"
import { Ref, ref } from "vue";
import { ResponseData, Routes, extractData, postData } from "@/api";
const AppStore = useAppStore();

export let theme : ThemeInstance
export const isDisplaySendMail = ref(false)
export const errorChangePassword: Ref<string | null> = ref(null);

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
