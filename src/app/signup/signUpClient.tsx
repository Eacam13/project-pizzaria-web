"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.scss";
import logoImg from "../../../public/logo.svg";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUp, UserProps } from "@/functions/signUp";

export default function SignUpClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    // Validação simples
    if (name === '' || email === '' || password === '') {
      toast.warn("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user: UserProps | null = await signUp({ name, email, password });
      
      if (user) {
        console.log("usuario:", user);
        toast.success("Cadastrado com sucesso!");
        router.push("/");
      } else {
        setError("Falha ao cadastrar. Tente novamente.");
        toast.error("Falha ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      console.error('Erro ao cadastrar', err);
      setError("Erro ao cadastrar. Tente novamente.");
      toast.error("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo do site" />
      <div className={styles.login}>
        <h1>Criar sua conta</h1>
        <form onSubmit={handleSignUp}>
          <Input 
            placeholder="Digite seu nome" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && <p className={styles.error}>{error}</p>} {/* Mostrar mensagem de erro */}
          <Button 
            type="submit" 
            loading={loading}
          >
            Cadastrar
          </Button>
        </form>
        <Link href="/" className={styles.text}>
          Já possui conta? Acessar!
        </Link>
      </div>
    </div>
  );
}
