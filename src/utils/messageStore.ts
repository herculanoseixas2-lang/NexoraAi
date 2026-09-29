import { ClientMessage } from '../types';

const STORAGE_KEY = 'nexora_client_messages';
const AUTH_KEY = 'nexora_dev_authenticated';

// Initial realistic seed messages so the panel is alive from the start
const INITIAL_SEED_MESSAGES: ClientMessage[] = [
  {
    id: 'msg-seed-1',
    nome: 'Eduardo Manuel',
    email: 'eduardo.manuel@grupo-angola.co.ao',
    telefone: '928 230 620',
    empresa: 'Banco de Comércio Angolano',
    servicoInteresse: 'Aplicações de Finanças pessoais',
    mensagem: 'Olá, temos interesse em desenvolver uma aplicação de finanças pessoais e planeamento de orçamento com inteligência artificial para os nossos clientes. Qual o prazo estimado para um protótipo?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: 'novo',
  },
  {
    id: 'msg-seed-2',
    nome: 'Tatiana Silva',
    email: 'tatiana.design@vanguarda.ao',
    telefone: '923 456 789',
    empresa: 'Vanguarda Negócios',
    servicoInteresse: 'Transformação digital',
    mensagem: 'Boa tarde! Gostaria de uma proposta para criação de logo e design completo para a nossa nova marca corporativa.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    status: 'respondido',
    respostaEnviada: {
      texto: 'Olá Tatiana! Recebemos o seu pedido de identidade visual corporativa. Enviamos a proposta inicial para o seu e-mail.',
      canal: 'whatsapp',
      data: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    },
  },
];

export const messageStore = {
  getMessages(): ClientMessage[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_MESSAGES));
        return INITIAL_SEED_MESSAGES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SEED_MESSAGES;
    }
  },

  addMessage(msg: Omit<ClientMessage, 'id' | 'timestamp' | 'status'>): ClientMessage {
    const messages = this.getMessages();
    const newEntry: ClientMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      status: 'novo',
    };
    const updated = [newEntry, ...messages];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('nexora_messages_updated'));
    } catch {
      // Ignore
    }
    return newEntry;
  },

  updateStatus(id: string, status: ClientMessage['status'], reply?: ClientMessage['respostaEnviada']) {
    const messages = this.getMessages();
    const updated = messages.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          status,
          ...(reply ? { respostaEnviada: reply } : {}),
        };
      }
      return m;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('nexora_messages_updated'));
    } catch {
      // Ignore
    }
  },

  deleteMessage(id: string) {
    const messages = this.getMessages();
    const updated = messages.filter((m) => m.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('nexora_messages_updated'));
    } catch {
      // Ignore
    }
  },

  // Developer authentication session
  isDevAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  },

  setDevAuthenticated(val: boolean) {
    if (typeof window === 'undefined') return;
    if (val) {
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
    window.dispatchEvent(new CustomEvent('nexora_auth_changed'));
  },
};
