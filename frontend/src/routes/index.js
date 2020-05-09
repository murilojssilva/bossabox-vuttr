import React from "react";
import AppRoutes from "./app_routes";
import AuthRoutes from "./auth_routes";

import { useAuth } from "../contexts/auth";

export default function Routes() {
  const { signed, loading } = useAuth();
  if (loading) {
    return <h1>Carregando...</h1>;
  }
  return signed ? <AuthRoutes /> : <AppRoutes />;
}
