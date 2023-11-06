import { ResponseData, Routes, extractData, fetchData } from "@/api";
import router from "@/router";
import { useUserStore } from "@/store"
import { User } from "@/types";
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';


export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  try {
    const userStore = useUserStore();
    const userData : ResponseData<User> = await fetchData(Routes.USERS + '/auth');
    userStore.setUser(extractData(userData));
    next();
  } catch (error) {
    console.error('Erreur dans l\'authGuard :', error);
    next('/error');
  }
};