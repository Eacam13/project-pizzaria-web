// src/functions/signIn.ts
import { apiClient } from "@/service/apiClient";
import { setCookie } from "nookies";

interface SignInProps {
    email: string;
    password: string;
}

export interface UserProps {
    id: string;
    name: string;
    email: string;
}

export async function signIn({ email, password }: SignInProps): Promise<UserProps | null> {
    try {
        const response = await apiClient.post("/session", {
            email,
            password,
        });

        const { id, name, token } = response.data;

        setCookie(undefined, "@pizzaria.token", token, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: "/",
        });

        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

        return { id, name, email }; // Retorna os dados do usuário
    } catch (err) {
        console.error('Erro ao logar', err);
        return null; // Retorna null em caso de erro
    }
}
