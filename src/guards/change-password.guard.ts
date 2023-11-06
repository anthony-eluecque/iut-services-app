import { ResponseData, Routes, extractData, fetchData } from "@/api";
import router from "@/router";
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { jwtDecode } from "jwt-decode";

export const changePasswordGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  try {
    next();
    return;
    const token = to.query["token"]?.toString();
    if (token) {
        const decodeDecode = jwtDecode(token);

        if (decodeDecode.exp) {
            if (new Date(decodeDecode.exp * 1000) < new Date()) {
                router.push('/changePasswordExpirate')  
            } 
        }
    }
    else {
        router.push('/login')
    }

    next();
  } catch (error) {
    console.error('Erreur dans changePasswordGuard :', error);
    next('/error');
  }
};