
import { ResponseData, Routes, postData } from '@/api';
import router from '@/router';
import { useUserStore } from '@/store';
import { User } from '@/types';
import { Ref, ref } from 'vue';


export const password = ref('');
export const email = ref('');
export const errorAuthentification = ref(false);
export const isDisplaySendMail = ref(false);
export const errorReinitPassword: Ref<string | null> = ref(null);


export const forgotPassword = async() => {
    isDisplaySendMail.value = false;
    errorAuthentification.value = false;
  
    errorReinitPassword.value = null;
    const response : ResponseData<any> = await postData(
        Routes.USERS + '/forgotPassword', 
        { email : email.value }
    );
  
    if (response.status === 200) {
      isDisplaySendMail.value = true;
    }
    else if (response.status === 404) {
      errorReinitPassword.value = response.data.data;
    }
    else {
      errorReinitPassword.value = "Erreur lors de la réinitialisation du mot de passe";   
    }
  }
  

export const postAuth = async() => {
    errorAuthentification.value = false;
    useUserStore()
    const res : ResponseData<User> = await postData(Routes.USERS + '/login',{
      email : email.value, password : password.value
    });
  
    if (res.status == 204) {
      if (useUserStore().getUser.isAdmin) router.push('/users')
      else router.push('/services')
    }
    else if (res.status == 400) {
      errorAuthentification.value = true;
    }

    password.value = ''
    email.value = ''
  }