import { Metadata } from "next";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CategoryClient } from "./categoryClient";

export const metadata: Metadata = {
  title: "Sujeito Pizza - Categorias",
  description: "Página de login do site Sujeito Pizza",
};

export default function CategoryPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('@pizzaria.token');

  if (!token) {
    redirect('/');
    return null; // Garantir que o componente não renderize nada após o redirecionamento
  }
  return <CategoryClient />;
}
