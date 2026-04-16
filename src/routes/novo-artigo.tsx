import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { saveArticle } from "@/lib/articles";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

export const Route = createFileRoute("/novo-artigo")({
  component: NovoArtigoPage,
});

const tags = ["Psicanálise", "Dependência Emocional", "Autoconhecimento", "Relacionamentos"];

function NovoArtigoPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isLoggedIn) {
    navigate({ to: "/login" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !tag) return;
    saveArticle({ title, excerpt, content, tag });
    setSuccess(true);
    setTitle("");
    setExcerpt("");
    setContent("");
    setTag("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-24">
        <h1 className="text-3xl font-bold mb-2">Novo Artigo</h1>
        <p className="text-muted-foreground mb-8">Escreva e publique um novo artigo no site.</p>

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm">
            ✓ Artigo publicado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Título</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do artigo" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Resumo</label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Um breve resumo do artigo..." rows={2} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Tema</label>
            <Select value={tag} onValueChange={setTag} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tema" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Conteúdo</label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva o conteúdo completo do artigo..." rows={12} />
          </div>
          <Button type="submit" className="rounded-full gap-2">
            <Send size={16} />
            Publicar Artigo
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
