import "../styles/page.module.scss";
import SignIn from "./signin/page";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Sujeito Pizza - Faça seu pedido!",
  description: "Página inicial",
};

export default function Home() {

  const cookieStore = cookies();
  const token = cookieStore.get('@pizzaria.token');

  // Redirecione para o dashboard se o token estiver presente
  if (token) {
    redirect('/dashboard');
  }

  return (
    <>
      <SignIn />
    </>
  );
}

