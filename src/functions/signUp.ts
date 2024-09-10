// src/functions/signUp.ts
import { apiClient } from "@/service/apiClient";

interface SignUpProps {
    name: string;
    email: string;
    password: string;
}

export interface UserProps {
    id: string;
    name: string;
    email: string;
}

export async function signUp({ name, email, password }: SignUpProps): Promise<UserProps | null> {
    try {
        const response = await apiClient.post("/users", {
            name,
            email,
            password,
        });

        const { id } = response.data

        return { id, name, email}; // Retorna os dados do usuário
    } catch (err) {
        console.error('Erro ao cadastrar', err);
        throw err; // Relança o erro para ser capturado no componente
    }
}
