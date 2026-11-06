import { CurrencyCode, RevenueRecord, FinancialSummary } from '../types';

const FINANCE_STORAGE_KEY = 'nexora_finance_records';

// Real-world exchange reference rates
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  // Value of 1 unit of currency in AOA (Kwanza)
  AOA: 1,
  USD: 935.0,    // 1 USD = 935 Kz
  EUR: 1015.0,   // 1 EUR = 1,015 Kz
  BRL: 165.0,    // 1 BRL = 165 Kz (1 USD ~ 5.66 BRL)
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, { symbol: string; label: string; flag: string }> = {
  AOA: { symbol: 'Kz', label: 'Kwanza (Angola)', flag: '🇦🇴' },
  USD: { symbol: '$', label: 'Dólar Americano', flag: '🇺🇸' },
  EUR: { symbol: '€', label: 'Euro (União Europeia)', flag: '🇪🇺' },
  BRL: { symbol: 'R$', label: 'Real Brasileiro', flag: '🇧🇷' },
};

// Seed data is kept strictly optional for demo mode - default is ZERO (zerado) as requested
export const DEMO_SAMPLE_REVENUE: RevenueRecord[] = [
  {
    id: 'rev-amora-01',
    cliente: 'Marcos Silveira',
    clienteEmail: 'marcos.s@gmail.com',
    projeto: 'Amora AI — Assinatura VIP Semestral',
    aplicativo: 'amora_ai',
    planoOuItem: 'Plano VIP Semestral',
    servico: 'Amora AI',
    valorOriginal: 18500,
    moedaOriginal: 'AOA',
    custoOperacionalOriginal: 950,
    data: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'aprovado',
    metodoPagamento: 'Utumify Gateway',
    origem: 'checkout_utumify',
    notas: 'Venda aprovada via checkout Utumify integrado.',
  },
  {
    id: 'rev-gravi-01',
    cliente: 'Ana Beatriz Ramos',
    clienteEmail: 'anabeatriz.ramos@outlook.com',
    projeto: 'GraviFlow — Plano Maternidade Completo',
    aplicativo: 'graviflow',
    planoOuItem: 'Plano Maternidade Completo',
    servico: 'GraviFlow',
    valorOriginal: 24900,
    moedaOriginal: 'AOA',
    custoOperacionalOriginal: 1200,
    data: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'aprovado',
    metodoPagamento: 'Multicaixa Express',
    origem: 'api_webhook',
    notas: 'Webhook recebido via API GraviFlow.',
  },
  {
    id: 'rev-amora-02',
    cliente: 'Cláudio Ferreira',
    clienteEmail: 'claudio.f@yahoo.com',
    projeto: 'Amora AI — Pacote Análise WhatsApp',
    aplicativo: 'amora_ai',
    planoOuItem: 'Análise WhatsApp Pro',
    servico: 'Amora AI',
    valorOriginal: 7500,
    moedaOriginal: 'AOA',
    custoOperacionalOriginal: 450,
    data: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    status: 'aprovado',
    metodoPagamento: 'Utumify Gateway',
    origem: 'checkout_utumify',
  },
];

export const financeStore = {
  // Convert any amount from one currency to another
  convert(amount: number, from: CurrencyCode, to: CurrencyCode): number {
    if (from === to) return amount;
    // Convert source to AOA base first
    const inAOA = amount * EXCHANGE_RATES[from];
    // Then convert AOA base to target currency
    return inAOA / EXCHANGE_RATES[to];
  },

  // Format currency with proper locale and symbol
  format(amount: number, currency: CurrencyCode, includeSymbol = true): string {
    const sym = CURRENCY_SYMBOLS[currency].symbol;
    const rounded = Math.round(amount * 100) / 100;

    switch (currency) {
      case 'AOA': {
        const formatted = rounded.toLocaleString('pt-AO', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return includeSymbol ? `${formatted} Kz` : formatted;
      }
      case 'USD': {
        const formatted = rounded.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return includeSymbol ? `$ ${formatted}` : formatted;
      }
      case 'EUR': {
        const formatted = rounded.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return includeSymbol ? `€ ${formatted}` : formatted;
      }
      case 'BRL': {
        const formatted = rounded.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return includeSymbol ? `R$ ${formatted}` : formatted;
      }
    }
  },

  // Always default to EMPTY (tudo zerado) as requested
  getRecords(): RevenueRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(FINANCE_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  },

  // Add new revenue transaction
  addRecord(
    record: Omit<RevenueRecord, 'id' | 'data'> & { data?: string }
  ): RevenueRecord {
    const records = this.getRecords();
    const newEntry: RevenueRecord = {
      ...record,
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      data: record.data || new Date().toISOString(),
    };
    const updated = [newEntry, ...records];
    try {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('nexora_finance_updated'));
      window.dispatchEvent(
        new CustomEvent('nexora_new_sale', { detail: { record: newEntry } })
      );
    } catch {
      // Ignore
    }
    return newEntry;
  },

  // Edit existing revenue transaction
  updateRecord(id: string, updates: Partial<Omit<RevenueRecord, 'id'>>): boolean {
    const records = this.getRecords();
    let found = false;
    const updated = records.map((r) => {
      if (r.id === id) {
        found = true;
        return { ...r, ...updates };
      }
      return r;
    });

    if (found) {
      try {
        localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('nexora_finance_updated'));
      } catch {
        // Ignore
      }
    }
    return found;
  },

  // Delete transaction
  deleteRecord(id: string) {
    const records = this.getRecords();
    const updated = records.filter((r) => r.id !== id);
    try {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('nexora_finance_updated'));
    } catch {
      // Ignore
    }
  },

  // Reset to ZERO (tudo zerado)
  clearAll() {
    try {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('nexora_finance_updated'));
    } catch {
      // Ignore
    }
  },

  // Load demo sample dataset for testing
  loadDemoSeed() {
    try {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(DEMO_SAMPLE_REVENUE));
      window.dispatchEvent(new CustomEvent('nexora_finance_updated'));
    } catch {
      // Ignore
    }
  },

  // Process incoming API / Webhook payload from Amora AI or GraviFlow
  processWebhookPayload(payload: {
    app: 'amora_ai' | 'graviflow' | 'nexora_core';
    amount: number;
    currency?: CurrencyCode;
    customerName?: string;
    customerEmail?: string;
    plan?: string;
    gateway?: RevenueRecord['metodoPagamento'];
  }): RevenueRecord {
    const appNames: Record<string, RevenueRecord['servico']> = {
      amora_ai: 'Amora AI',
      graviflow: 'GraviFlow',
      nexora_core: 'Aplicações com IA',
    };

    const costRate = 0.05; // 5% gateway/infrastructure estimated cost
    const cost = Math.round(payload.amount * costRate * 100) / 100;

    return this.addRecord({
      cliente: payload.customerName || 'Cliente Online',
      clienteEmail: payload.customerEmail,
      projeto: payload.plan || `${appNames[payload.app]} Licença Online`,
      aplicativo: payload.app,
      planoOuItem: payload.plan,
      servico: appNames[payload.app] || 'Aplicações com IA',
      valorOriginal: payload.amount,
      moedaOriginal: payload.currency || 'AOA',
      custoOperacionalOriginal: cost,
      status: 'aprovado',
      metodoPagamento: payload.gateway || 'Utumify Gateway',
      origem: 'api_webhook',
      notas: `Recebido via Webhook / API de ${appNames[payload.app]}.`,
    });
  },

  // Calculate comprehensive Financial Summary across all 4 currencies
  getSummary(filteredRecords?: RevenueRecord[]): FinancialSummary {
    const records = filteredRecords || this.getRecords();

    let totalGrossAOA = 0;
    let totalCostAOA = 0;
    let completedCount = 0;
    let todayGrossAOA = 0;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    for (const rec of records) {
      const isApproved = rec.status === 'aprovado' || rec.status === 'concluido';
      const isRefunded = rec.status === 'reembolsado';

      if (!isRefunded) {
        const grossInAOA = this.convert(rec.valorOriginal, rec.moedaOriginal, 'AOA');
        const costInAOA = this.convert(rec.custoOperacionalOriginal, rec.moedaOriginal, 'AOA');

        if (isApproved) {
          totalGrossAOA += grossInAOA;
          totalCostAOA += costInAOA;
          completedCount++;

          const recDate = new Date(rec.data);
          if (recDate >= startOfToday) {
            todayGrossAOA += grossInAOA;
          }
        }
      }
    }

    const netAOA = Math.max(0, totalGrossAOA - totalCostAOA);
    const profitMargin = totalGrossAOA > 0 ? (netAOA / totalGrossAOA) * 100 : 0;
    const approvalRate = records.length > 0 ? (completedCount / records.length) * 100 : 100;
    const avgTicketAOA = completedCount > 0 ? totalGrossAOA / completedCount : 0;

    const currencies: CurrencyCode[] = ['AOA', 'USD', 'EUR', 'BRL'];

    const faturamentoBruto: Record<CurrencyCode, number> = {} as any;
    const faturamentoLiquido: Record<CurrencyCode, number> = {} as any;
    const custoOperacionalTotal: Record<CurrencyCode, number> = {} as any;
    const vendasHoje: Record<CurrencyCode, number> = {} as any;
    const ticketMedio: Record<CurrencyCode, number> = {} as any;

    for (const c of currencies) {
      faturamentoBruto[c] = this.convert(totalGrossAOA, 'AOA', c);
      faturamentoLiquido[c] = this.convert(netAOA, 'AOA', c);
      custoOperacionalTotal[c] = this.convert(totalCostAOA, 'AOA', c);
      vendasHoje[c] = this.convert(todayGrossAOA, 'AOA', c);
      ticketMedio[c] = this.convert(avgTicketAOA, 'AOA', c);
    }

    return {
      faturamentoBruto,
      faturamentoLiquido,
      custoOperacionalTotal,
      margemLucroPercent: Math.round(profitMargin * 10) / 10,
      totalTransacoes: records.length,
      transacoesConcluidas: completedCount,
      vendasHoje,
      ticketMedio,
      taxaAprovacao: Math.round(approvalRate * 10) / 10,
    };
  },
};
