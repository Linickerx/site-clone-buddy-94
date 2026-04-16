export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
}

const STORAGE_KEY = "maia_articles";

const defaultArticles: Article[] = [
  {
    id: "1",
    title: "O que é dependência emocional e como identificar",
    excerpt: "Entenda os sinais de que você pode estar em uma relação de dependência emocional e os primeiros passos para a mudança.",
    content: "",
    tag: "Dependência Emocional",
    date: "10 Abr 2026",
  },
  {
    id: "2",
    title: "Psicanálise e o inconsciente: uma introdução",
    excerpt: "Descubra como a teoria psicanalítica pode ajudar a compreender comportamentos que parecem inexplicáveis.",
    content: "",
    tag: "Psicanálise",
    date: "3 Abr 2026",
  },
  {
    id: "3",
    title: "Relacionamentos tóxicos: rompendo o ciclo",
    excerpt: "Aprenda a identificar padrões destrutivos e a construir relações baseadas em respeito e autonomia.",
    content: "",
    tag: "Relacionamentos",
    date: "28 Mar 2026",
  },
];

export function getArticles(): Article[] {
  if (typeof window === "undefined") return defaultArticles;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
    return defaultArticles;
  }
  return JSON.parse(stored);
}

export function saveArticle(article: Omit<Article, "id" | "date">): Article {
  const articles = getArticles();
  const newArticle: Article = {
    ...article,
    id: crypto.randomUUID(),
    date: new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }),
  };
  articles.unshift(newArticle);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  return newArticle;
}

export function deleteArticle(id: string) {
  const articles = getArticles().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}
