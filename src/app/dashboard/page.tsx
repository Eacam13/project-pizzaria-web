import { Metadata } from "next";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from "./dashboardClient";

export const metadata: Metadata = {
  title: "Sujeito Pizza - Dashboard",
  description: "Página inicial",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('@pizzaria.token');

  if (!token) {
    redirect('/');
    return null; // Garantir que o componente não renderize nada após o redirecionamento
  }

  return <DashboardClient />;
}

