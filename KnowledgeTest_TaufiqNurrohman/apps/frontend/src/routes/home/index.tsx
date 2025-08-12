import { useEffect } from "react";
import { useNavigate } from "react-router";

import LoadingPage from "@/components/pages/loading";
import { useAuthStore } from "@/store/useAuthStore";

import LoginForm from "./components/login-form";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading || isAuthenticated) {
    return <LoadingPage />;
  }

  return (
    <section className="grid min-h-svh w-full place-items-center px-6">
      <LoginForm />
    </section>
  );
}
