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

export type CurrencyCode = 'AOA' | 'USD' | 'EUR' | 'BRL';

export interface RevenueRecord {
  id: string;
  cliente: string;
  clienteEmail?: string;
  clienteTelefone?: string;
  projeto: string;
  aplicativo?: 'amora_ai' | 'graviflow' | 'nexora_core';
  planoOuItem?: string;
  servico: 'Amora AI' | 'GraviFlow' | 'Websites Inteligentes' | 'Aplicações com IA' | 'Design & Criação de Logo' | 'Consultoria & Suporte IA';
  valorOriginal: number;
  moedaOriginal: CurrencyCode;
  custoOperacionalOriginal: number;
  data: string;
  status: 'aprovado' | 'concluido' | 'pendente' | 'reembolsado' | 'em_andamento';
  metodoPagamento: 'Utumify Gateway' | 'Multicaixa Express' | 'Transferência Multicaixa' | 'Stripe / Cartão' | 'Pix' | 'Transferência Bancária Internacional';
  origem?: 'api_webhook' | 'manual' | 'checkout_utumify';
  notas?: string;
}

export interface FinancialSummary {
  faturamentoBruto: Record<CurrencyCode, number>;
  faturamentoLiquido: Record<CurrencyCode, number>;
  custoOperacionalTotal: Record<CurrencyCode, number>;
  margemLucroPercent: number;
  totalTransacoes: number;
  transacoesConcluidas: number;
  vendasHoje: Record<CurrencyCode, number>;
  ticketMedio: Record<CurrencyCode, number>;
  taxaAprovacao: number;
}


