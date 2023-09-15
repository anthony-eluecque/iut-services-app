import router from "@/router";
import { useUserStore } from "@/store"

export const authGuard = () => {
    const UserStore = useUserStore();

    if (UserStore.isLogged == false) {
        router.push('/login');
    }

    return true;
}