"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.scss";
import logoImg from "../../../public/logo.svg";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { signIn, UserProps } from "@/functions/signIn";
import { parseCookies } from "nookies";

export default function SignInClient() {
  const router = useRouter();
  const { setUser, user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('Quem ta logado...', user)

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies['@pizzaria.token']) {
      router.push("/dashboard");
    }
  }, [router]);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warn("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError(null); // Limpa erros anteriores

    try {
      const user: UserProps | null = await signIn({ email, password });

      if (user) {
        setUser(user);
        console.log("usuario:", user);
        toast.success("Logado com sucesso!");
        router.push("/dashboard");
      } else {
        setError("Falha ao fazer login. Verifique suas credenciais e tente novamente.");
        toast.error("Falha ao fazer login. Verifique suas credenciais e tente novamente.");
      }
    } catch (err) {
      setError("Erro ao logar! Tente novamente.");
      toast.error("Erro ao logar! Tente novamente.");
    } finally {
      setLoading(false); // Garante que o loading é desativado
    }
  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo do site" />
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input 
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            loading={loading}
          >
            Acessar
          </Button>
        </form>
        <Link href="/signup" className={styles.text}>
          Não possui conta? Cadastrar!
        </Link>
      </div>
    </div>
  );
}
