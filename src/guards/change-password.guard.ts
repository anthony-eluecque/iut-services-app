import router from "@/router";
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { jwtDecode } from "jwt-decode";


/**
 * Garde de Changement de Mot de Passe
 *
 * @param {RouteLocationNormalized} to - Route cible de la navigation.
 * @param {RouteLocationNormalized} from - Route actuelle de la navigation.
 * @param {NavigationGuardNext} next - Fonction pour résoudre la garde de navigation.
 *
 * @returns {Promise<void>} Une promesse représentant l'exécution asynchrone de la garde.
 *
 * @throws {Error} En cas d'erreur pendant la vérification du jeton.
 *
 * @description
 * Cette fonction sert de garde pour la modification du mot de passe. Elle vérifie la validité
 * du jeton dans l'URL, redirige vers '/changePasswordExpirate' si expiré, sinon vers '/login'.
 */
export const changePasswordGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  try {
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