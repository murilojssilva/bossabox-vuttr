import React from "react";
import "./style.css";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const { signed, user, signIn } = useAuth();
  console.log(`Logado: ${signed} Usuário: ${user}`);
  async function handleSignIn() {
    signIn();
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
}
