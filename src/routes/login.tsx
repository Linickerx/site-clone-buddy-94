import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    navigate({ to: "/novo-artigo" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (success) {
      navigate({ to: "/novo-artigo" });
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-primary" size={24} />
            </div>
            <h1 className="text-2xl font-bold">Área Restrita</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Faça login para gerenciar artigos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Usuário</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário"
                autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full rounded-full">
              Entrar
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
