import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="bg-muted/50 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="8" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-heading text-lg font-bold">Maia Boaro</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um espaço dedicado ao autoconhecimento, à psicanálise e à compreensão da dependência emocional.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Início</a></li>
              <li><a href="#artigos" className="hover:text-foreground transition-colors">Artigos</a></li>
              <li><a href="#temas" className="hover:text-foreground transition-colors">Sobre</a></li>
              <li><a href="#contato" className="hover:text-foreground transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm mb-4">Temas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Psicanálise</li>
              <li>Dependência Emocional</li>
              <li>Autoconhecimento</li>
              <li>Relacionamentos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-5 text-center text-sm text-muted-foreground">
          Feito com <Heart className="inline w-3.5 h-3.5 text-primary fill-primary mx-0.5" /> Maia Boaro © 2026
        </div>
      </div>
    </footer>
  );
}
