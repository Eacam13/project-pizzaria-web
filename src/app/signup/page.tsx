import { Metadata } from "next";
import SignUpClient from "./signUpClient";

export const metadata: Metadata = {
  title: "Faça seu cadastro!",
  description: "Página de cadastro do site Sujeito Pizza",
};

export default function SignUpPage() {
  return <SignUpClient />;
}