import { ResponseData, Routes, extractData, fetchData } from "@/api";
import router from "@/router";
import { useUserStore } from "@/store"
import { User } from "@/types";
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const commonPermissions = ['','/']

const adminPermissions = [...commonPermissions,'users']
const usersPermissions = [...commonPermissions,'services','directory','notices','home']

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  try {
    const userStore = useUserStore();
    const userData : ResponseData<User> = await fetchData(Routes.USERS + '/auth');
    userStore.setUser(extractData(userData));

    let userPerm = null
    if (useUserStore().getUser.isAdmin) userPerm = adminPermissions
    else userPerm = usersPermissions
    console.log(userPerm,to.path)
    if (userPerm.includes(to.path.split('/')[1])) next();
    else next('/denied');

  } catch (error) {
    console.error('Erreur dans l\'authGuard :', error);
    next('/error');
  }
};