export interface SolutionItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  category: string;
  impactMetric: string;
  image?: string;
  accent: string;
}

export interface ServiceCard {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  capabilities: string[];
  deliverables: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  technology: string;
  description: string;
  results: string;
  tag: string;
}

export interface ContactFormData {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  mensagem: string;
  servicoInteresse: string;
}

export interface ClientMessage {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  servicoInteresse: string;
  mensagem: string;
  timestamp: string;
  status: 'novo' | 'em_analise' | 'respondido';
  respostaEnviada?: {
    texto: string;
    canal: 'whatsapp' | 'email';
    data: string;
  };
}

