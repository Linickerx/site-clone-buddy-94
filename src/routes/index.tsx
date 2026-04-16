import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Brain, Heart, Compass, Users, ArrowRight, Trash2 } from "lucide-react";
import { getArticles, deleteArticle, type Article } from "@/lib/articles";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary bg-primary/8 px-4 py-2 rounded-full mb-8">
            Psicanálise & Autoconhecimento
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Liberte-se da{" "}
            <span className="text-primary">dependência emocional</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg font-light">
            Um espaço seguro para compreender os padrões inconscientes que regem seus relacionamentos e encontrar o caminho para a autonomia afetiva.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#artigos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Explorar Artigos
              <ArrowRight size={16} />
            </a>
            <a
              href="#temas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const topics = [
  {
    icon: Brain,
    title: "Psicanálise",
    description: "Compreenda os processos inconscientes que moldam seus pensamentos, emoções e comportamentos.",
  },
  {
    icon: Heart,
    title: "Dependência Emocional",
    description: "Identifique padrões de apego excessivo e aprenda a construir relações mais saudáveis.",
  },
  {
    icon: Compass,
    title: "Autoconhecimento",
    description: "Descubra quem você realmente é além das máscaras e expectativas do outro.",
  },
  {
    icon: Users,
    title: "Relacionamentos",
    description: "Entenda as dinâmicas relacionais e como romper ciclos repetitivos de sofrimento.",
  },
];

function TopicsSection() {
  return (
    <section id="temas" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Áreas de Estudo
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Temas que Exploramos
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Cada tema é uma porta para o autoconhecimento profundo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <topic.icon
                size={28}
                className="text-primary mb-5 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold mb-3">{topic.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const handleDelete = (id: string) => {
    deleteArticle(id);
    setArticles(getArticles());
  };

  return (
    <section id="artigos" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Artigos Recentes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 relative"
            >
              {isLoggedIn && (
                <button
                  onClick={() => handleDelete(article.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Excluir artigo"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-primary bg-primary/8 px-3 py-1 rounded-full mb-4">
                {article.tag}
              </span>
              <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <span className="text-xs text-muted-foreground">{article.date}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TopicsSection />
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
}
