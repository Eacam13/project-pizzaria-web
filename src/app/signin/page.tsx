import { Metadata } from "next";
import SignInClient from "./signInClient";

export const metadata: Metadata = {
  title: "Sujeito Pizza - Faça seu pedido",
  description: "Página de login do site Sujeito Pizza",
};

export default function SignInPage() {
  return <SignInClient />;
}
