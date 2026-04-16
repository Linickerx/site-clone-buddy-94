import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, LogIn, LogOut, PenLine } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-foreground">Maia Boaro</span>
            <p className="text-xs text-muted-foreground leading-tight">Psicanalista e Psicopedagoga</p>
          </div>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            Início
          </Link>
          <a href="#temas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Temas
          </a>
          <a href="#artigos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Artigos
          </a>
          <a href="#contato" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                to="/novo-artigo"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <PenLine size={15} />
                Novo Artigo
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={15} />
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <LogIn size={15} />
              Login
            </Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-foreground" onClick={() => setMenuOpen(false)}>
            Início
          </Link>
          <a href="#temas" className="block text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>
            Temas
          </a>
          <a href="#artigos" className="block text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>
            Artigos
          </a>
          <a href="#contato" className="block text-sm font-medium text-muted-foreground" onClick={() => setMenuOpen(false)}>
            Contato
          </a>
          {isLoggedIn ? (
            <>
              <Link to="/novo-artigo" className="block text-sm font-medium text-primary" onClick={() => setMenuOpen(false)}>
                ✏️ Novo Artigo
              </Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="block text-sm font-medium text-muted-foreground">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-sm font-medium text-primary" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
