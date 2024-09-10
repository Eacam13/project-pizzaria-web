import { destroyCookie } from "nookies";

export function signOut() {
    destroyCookie(undefined, '@pizzaria.token');
}