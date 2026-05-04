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
import { Send, Bold, Italic, Underline, Type, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useRef, useEffect } from "react";

export const Route = createFileRoute("/novo-artigo")({
  component: NovoArtigoPage,
});

const tags = ["Psicanálise", "Dependência Emocional", "Autoconhecimento", "Relacionamentos", "Livre"];

function NovoArtigoPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [success, setSuccess] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn) {
    navigate({ to: "/login" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTag = tag === "Livre" ? customTag : tag;
    if (!title || !excerpt || !finalTag) return;
    
    saveArticle({ title, excerpt, content, tag: finalTag });
    setSuccess(true);
    setTitle("");
    setExcerpt("");
    setContent("");
    setTag("");
    setCustomTag("");
    if (editorRef.current) editorRef.current.innerHTML = "";
    setTimeout(() => setSuccess(false), 3000);
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
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
            <div className="space-y-3">
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
              
              {tag === "Livre" && (
                <Input 
                  value={customTag} 
                  onChange={(e) => setCustomTag(e.target.value)} 
                  placeholder="Digite o nome do tema personalizado" 
                  required 
                />
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Conteúdo</label>
            <div className="border border-input rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
              <div className="bg-muted/50 border-b border-input p-2 flex flex-wrap items-center gap-1">
                <Toggle size="sm" onPressedChange={() => execCommand("bold")} aria-label="Negrito">
                  <Bold size={16} />
                </Toggle>
                <Toggle size="sm" onPressedChange={() => execCommand("italic")} aria-label="Itálico">
                  <Italic size={16} />
                </Toggle>
                <Toggle size="sm" onPressedChange={() => execCommand("underline")} aria-label="Sublinhado">
                  <Underline size={16} />
                </Toggle>
                <div className="w-px h-6 bg-input mx-1" />
                <Select onValueChange={(val) => execCommand("fontSize", val)}>
                  <SelectTrigger className="h-8 w-[120px] border-none bg-transparent hover:bg-muted focus:ring-0">
                    <Type size={16} className="mr-2" />
                    <SelectValue placeholder="Tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Muito Pequeno</SelectItem>
                    <SelectItem value="2">Pequeno</SelectItem>
                    <SelectItem value="3">Normal</SelectItem>
                    <SelectItem value="4">Médio</SelectItem>
                    <SelectItem value="5">Grande</SelectItem>
                    <SelectItem value="6">Muito Grande</SelectItem>
                    <SelectItem value="7">Extra Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none dark:prose-invert"
                style={{ outline: 'none' }}
              />
            </div>
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
