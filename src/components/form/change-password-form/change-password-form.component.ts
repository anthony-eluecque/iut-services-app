import { ResponseData, Routes, postData } from "@/api";
import router from "@/router";
import { computed, ref, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import zxcvbn from "zxcvbn";


let route : RouteLocationNormalizedLoaded|null = null

export const initializeComponent = () => {
    route = useRoute()
}

export const showNewPassword = ref(false);
export const showRenewPassword = ref(false);
export const passwordNew = ref('');
export const passwordNewRe = ref('');
export const isMessageSuccess = ref(false);
export const isDisplayMessageError = ref(false);
export const scorePassword = computed(() => zxcvbn(passwordNew.value).score);
export const showDisplayPasswordNotEqual = ref(false);

export const rules = {
    required: (value: string) => !!value || 'La saisie est obligatoire',
    min: (value: string) => value.length >= 8 || 'Il faut plus de 8 caractères',
}
  

export const errorForm = computed(() => {
    return !(rules.required(passwordNew.value) && rules.min(passwordNew.value) &&
             rules.required(passwordNewRe.value) && rules.min(passwordNewRe.value) &&
             passwordNew.value === passwordNewRe.value);
});
  

watchEffect(() => {
    showDisplayPasswordNotEqual.value = 
      rules.required(passwordNew.value) &&
      rules.required(passwordNewRe.value) &&
      passwordNew.value !== passwordNewRe.value;
    isDisplayMessageError.value = false;
  });
  
export const postChangePassword = async() => {
    const changePasswordResponse : ResponseData<any> = await postData(
        `${Routes.USERS}/changePassword`,
        {password: passwordNew.value, token: route?.query.token});
  
    if (changePasswordResponse.status == 200) {
      isMessageSuccess.value = true;
      await postData('/users/logout',{});
  
      setTimeout(() => {
        router.push('/login');            
      }, 2000)
    }
    else {
      isDisplayMessageError.value = true;
    }
  }