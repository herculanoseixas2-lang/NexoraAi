import React, { useState, useEffect } from 'react';
import {
  X,
  TrendingUp,
  DollarSign,
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  RefreshCw,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Globe,
  Sparkles,
  Percent,
  Lock,
  Unlock,
  Zap,
  Hexagon,
  Code2,
  Copy,
  Check,
  Radio,
  SlidersHorizontal,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  BellRing,
} from 'lucide-react';
import { CurrencyCode, RevenueRecord } from '../types';
import {
  financeStore,
  EXCHANGE_RATES,
  CURRENCY_SYMBOLS,
} from '../utils/financeStore';
import { messageStore } from '../utils/messageStore';
import { soundEffects } from '../utils/audioEffects';

interface RevenueDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminPanel?: () => void;
}

export const RevenueDashboard: React.FC<RevenueDashboardProps> = ({
  isOpen,
  onClose,
  onOpenAdminPanel,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => messageStore.isDevAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('AOA');
  const [records, setRecords] = useState<RevenueRecord[]>(() => financeStore.getRecords());
  const [periodFilter, setPeriodFilter] = useState<'todos' | 'hoje' | 'mes' | 'ano'>('todos');
  const [appFilter, setAppFilter] = useState<'todos' | 'amora_ai' | 'graviflow' | 'outros'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'visao_geral' | 'transacoes' | 'api_webhooks'>('visao_geral');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RevenueRecord | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live Toast for new sales
  const [liveToast, setLiveToast] = useState<{
    show: boolean;
    title: string;
    amount: string;
    customer: string;
    app: string;
  } | null>(null);

  // New Record Form State
  const [formClient, setFormClient] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formApp, setFormApp] = useState<'amora_ai' | 'graviflow' | 'nexora_core'>('amora_ai');
  const [formPlan, setFormPlan] = useState('Amora AI — Assinatura VIP');
  const [formAmount, setFormAmount] = useState('');
  const [formCurrency, setFormCurrency] = useState<CurrencyCode>('AOA');
  const [formCost, setFormCost] = useState('');
  const [formGateway, setFormGateway] = useState<RevenueRecord['metodoPagamento']>('Utumify Gateway');
  const [formStatus, setFormStatus] = useState<RevenueRecord['status']>('aprovado');
  const [formNotes, setFormNotes] = useState('');

  // Webhook Tester State
  const [testApp, setTestApp] = useState<'amora_ai' | 'graviflow'>('amora_ai');
  const [testAmount, setTestAmount] = useState('4500');
  const [testCurrency, setTestCurrency] = useState<CurrencyCode>('AOA');
  const [testCustomer, setTestCustomer] = useState('Luísa Fernandes');
  const [testEmail, setTestEmail] = useState('luisa.f@exemplo.com');
  const [testPlan, setTestPlan] = useState('Plano VIP Mensal');
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  // Sync with store & auth
  useEffect(() => {
    const handleUpdate = () => {
      setRecords(financeStore.getRecords());
    };
    const handleAuth = () => {
      setIsAuthenticated(messageStore.isDevAuthenticated());
    };
    const handleNewSale = (e: Event) => {
      const customEvent = e as CustomEvent<{ record: RevenueRecord }>;
      if (customEvent.detail && customEvent.detail.record) {
        const rec = customEvent.detail.record;
        soundEffects.playChime();
        setLiveToast({
          show: true,
          title: 'Venda Aprovada via ' + rec.metodoPagamento,
          amount: financeStore.format(rec.valorOriginal, rec.moedaOriginal),
          customer: rec.cliente,
          app: rec.servico,
        });
        setTimeout(() => {
          setLiveToast((prev) => (prev ? { ...prev, show: false } : null));
        }, 5000);
      }
    };

    window.addEventListener('nexora_finance_updated', handleUpdate);
    window.addEventListener('nexora_auth_changed', handleAuth);
    window.addEventListener('nexora_new_sale', handleNewSale);
    return () => {
      window.removeEventListener('nexora_finance_updated', handleUpdate);
      window.removeEventListener('nexora_auth_changed', handleAuth);
      window.removeEventListener('nexora_new_sale', handleNewSale);
    };
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    if (pinInput.trim() === 'kenyseixas20') {
      messageStore.setDevAuthenticated(true);
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogoutDev = () => {
    soundEffects.playClick();
    if (window.confirm('Deseja sair do Modo Desenvolvedor? Os botões Dashboard e Admin ficarão ocultos.')) {
      messageStore.setDevAuthenticated(false);
      setIsAuthenticated(false);
      onClose();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md rounded-3xl bg-[#0B0820] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/60 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Lock className="w-7 h-7 text-emerald-400" />
          </div>

          <h3 className="font-display font-bold text-lg text-white mb-1">
            Dashboard Financeiro // Utumify Edition
          </h3>
          <p className="text-xs text-zinc-400 mb-6 font-mono">
            Acesso exclusivo para o desenvolvedor da Nexora AI. Digite a sua chave de acesso.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Chave do desenvolvedor..."
                className={`w-full px-4 py-3 rounded-xl bg-black/60 border ${
                  pinError ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-emerald-500'
                } text-white font-mono text-center text-sm placeholder:text-zinc-600 focus:outline-none transition-all`}
                autoFocus
              />
              {pinError && (
                <p className="mt-2 text-xs text-red-400 font-mono">
                  Chave incorreta. Acesso restrito ao desenvolvedor.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              DESBLOQUEAR DASHBOARD
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
            Chave do desenvolvedor: <span className="text-emerald-400 font-semibold">kenyseixas20</span>
          </div>
        </div>
      </div>
    );
  }

  // Filter records
  const filteredRecords = records.filter((rec) => {
    // App filter
    if (appFilter === 'amora_ai' && rec.aplicativo !== 'amora_ai' && rec.servico !== 'Amora AI') return false;
    if (appFilter === 'graviflow' && rec.aplicativo !== 'graviflow' && rec.servico !== 'GraviFlow') return false;
    if (appFilter === 'outros' && (rec.aplicativo === 'amora_ai' || rec.aplicativo === 'graviflow' || rec.servico === 'Amora AI' || rec.servico === 'GraviFlow')) return false;

    // Search query
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      rec.cliente.toLowerCase().includes(query) ||
      rec.projeto.toLowerCase().includes(query) ||
      rec.servico.toLowerCase().includes(query) ||
      (rec.clienteEmail && rec.clienteEmail.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (periodFilter === 'todos') return true;

    const recordDate = new Date(rec.data);
    const now = new Date();

    if (periodFilter === 'hoje') {
      return (
        recordDate.getDate() === now.getDate() &&
        recordDate.getMonth() === now.getMonth() &&
        recordDate.getFullYear() === now.getFullYear()
      );
    }

    if (periodFilter === 'mes') {
      return (
        recordDate.getMonth() === now.getMonth() &&
        recordDate.getFullYear() === now.getFullYear()
      );
    }

    if (periodFilter === 'ano') {
      return recordDate.getFullYear() === now.getFullYear();
    }

    return true;
  });

  const summary = financeStore.getSummary(filteredRecords);

  // App breakdown stats
  const amoraRecords = records.filter((r) => r.aplicativo === 'amora_ai' || r.servico === 'Amora AI');
  const graviRecords = records.filter((r) => r.aplicativo === 'graviflow' || r.servico === 'GraviFlow');
  const coreRecords = records.filter((r) => r.aplicativo !== 'amora_ai' && r.aplicativo !== 'graviflow' && r.servico !== 'Amora AI' && r.servico !== 'GraviFlow');

  const getAppGrossAOA = (appRecs: RevenueRecord[]) =>
    appRecs.reduce((acc, r) => acc + (r.status !== 'reembolsado' ? financeStore.convert(r.valorOriginal, r.moedaOriginal, 'AOA') : 0), 0);

  const amoraGross = financeStore.convert(getAppGrossAOA(amoraRecords), 'AOA', selectedCurrency);
  const graviGross = financeStore.convert(getAppGrossAOA(graviRecords), 'AOA', selectedCurrency);
  const coreGross = financeStore.convert(getAppGrossAOA(coreRecords), 'AOA', selectedCurrency);
  const totalGrossCurrent = summary.faturamentoBruto[selectedCurrency];

  const amoraPercent = totalGrossCurrent > 0 ? Math.round((amoraGross / totalGrossCurrent) * 100) : 0;
  const graviPercent = totalGrossCurrent > 0 ? Math.round((graviGross / totalGrossCurrent) * 100) : 0;
  const corePercent = totalGrossCurrent > 0 ? Math.round((coreGross / totalGrossCurrent) * 100) : 0;

  // Actions
  const handleOpenAddModal = (appPreset?: 'amora_ai' | 'graviflow' | 'nexora_core') => {
    soundEffects.playClick();
    setEditingRecord(null);
    if (appPreset === 'amora_ai') {
      setFormApp('amora_ai');
      setFormPlan('Amora AI — Assinatura VIP');
      setFormAmount('4500');
    } else if (appPreset === 'graviflow') {
      setFormApp('graviflow');
      setFormPlan('GraviFlow — Plano Gestação Completo');
      setFormAmount('5900');
    } else {
      setFormApp('nexora_core');
      setFormPlan('Desenvolvimento de Website Inteligente');
      setFormAmount('3500000');
    }
    setFormClient('');
    setFormEmail('');
    setFormCurrency(selectedCurrency);
    setFormCost('');
    setFormGateway('Utumify Gateway');
    setFormStatus('aprovado');
    setFormNotes('');
    setShowAddModal(true);
  };

  const handleOpenEditModal = (rec: RevenueRecord) => {
    soundEffects.playClick();
    setEditingRecord(rec);
    setFormClient(rec.cliente);
    setFormEmail(rec.clienteEmail || '');
    setFormApp(rec.aplicativo || (rec.servico === 'Amora AI' ? 'amora_ai' : rec.servico === 'GraviFlow' ? 'graviflow' : 'nexora_core'));
    setFormPlan(rec.projeto);
    setFormAmount(rec.valorOriginal.toString());
    setFormCurrency(rec.moedaOriginal);
    setFormCost(rec.custoOperacionalOriginal.toString());
    setFormGateway(rec.metodoPagamento);
    setFormStatus(rec.status);
    setFormNotes(rec.notas || '');
    setShowAddModal(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();

    const val = parseFloat(formAmount.replace(/\./g, '').replace(',', '.')) || 0;
    const cost = parseFloat(formCost.replace(/\./g, '').replace(',', '.')) || 0;

    if (!formClient.trim() || val <= 0) return;

    const servicoMapping: Record<string, RevenueRecord['servico']> = {
      amora_ai: 'Amora AI',
      graviflow: 'GraviFlow',
      nexora_core: 'Websites Inteligentes',
    };

    if (editingRecord) {
      financeStore.updateRecord(editingRecord.id, {
        cliente: formClient.trim(),
        clienteEmail: formEmail.trim() || undefined,
        projeto: formPlan.trim() || `Plano ${servicoMapping[formApp]}`,
        aplicativo: formApp,
        servico: servicoMapping[formApp],
        valorOriginal: val,
        moedaOriginal: formCurrency,
        custoOperacionalOriginal: cost,
        status: formStatus,
        metodoPagamento: formGateway,
        notas: formNotes.trim() || undefined,
      });
    } else {
      financeStore.addRecord({
        cliente: formClient.trim(),
        clienteEmail: formEmail.trim() || undefined,
        projeto: formPlan.trim() || `Plano ${servicoMapping[formApp]}`,
        aplicativo: formApp,
        servico: servicoMapping[formApp],
        valorOriginal: val,
        moedaOriginal: formCurrency,
        custoOperacionalOriginal: cost,
        status: formStatus,
        metodoPagamento: formGateway,
        origem: 'manual',
        notas: formNotes.trim() || undefined,
      });
    }

    setShowAddModal(false);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    soundEffects.playClick();
    if (window.confirm('Tem certeza de que deseja eliminar esta transação?')) {
      financeStore.deleteRecord(id);
    }
  };

  const handleClearDashboard = () => {
    soundEffects.playClick();
    if (window.confirm('Atenção: Deseja ZERAR completamente o dashboard e deixar todas as métricas em 0? Esta ação apagará as transações atuais.')) {
      financeStore.clearAll();
    }
  };

  const handleLoadDemo = () => {
    soundEffects.playClick();
    financeStore.loadDemoSeed();
  };

  const handleQuickSimulate = (app: 'amora_ai' | 'graviflow') => {
    soundEffects.playClick();
    if (app === 'amora_ai') {
      financeStore.processWebhookPayload({
        app: 'amora_ai',
        amount: 18500,
        currency: 'AOA',
        customerName: 'Cliente Amora VIP',
        customerEmail: 'amora.vip@exemplo.com',
        plan: 'Amora AI — Assinatura VIP Semestral',
        gateway: 'Utumify Gateway',
      });
    } else {
      financeStore.processWebhookPayload({
        app: 'graviflow',
        amount: 24900,
        currency: 'AOA',
        customerName: 'Mamã GraviFlow',
        customerEmail: 'mama.gravi@exemplo.com',
        plan: 'GraviFlow — Plano Gestação Acompanhada',
        gateway: 'Multicaixa Express',
      });
    }
  };

  const handleExecuteWebhookTest = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    const val = parseFloat(testAmount.replace(/\./g, '').replace(',', '.')) || 0;
    if (val <= 0) return;

    financeStore.processWebhookPayload({
      app: testApp,
      amount: val,
      currency: testCurrency,
      customerName: testCustomer,
      customerEmail: testEmail,
      plan: testPlan,
      gateway: 'Utumify Gateway',
    });

    setTestFeedback(`Webhook processado com sucesso! +${financeStore.format(val, testCurrency)} adicionado.`);
    setTimeout(() => setTestFeedback(null), 4000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const currencies: CurrencyCode[] = ['AOA', 'USD', 'EUR', 'BRL'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      {/* Real-time Sales Toast */}
      {liveToast && liveToast.show && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0F0C29] border border-emerald-500/50 shadow-2xl shadow-emerald-950/80 text-white animate-bounce">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <BellRing className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {liveToast.title}
            </div>
            <div className="text-sm font-display font-extrabold text-white">
              {liveToast.amount} <span className="text-zinc-400 font-normal text-xs">({liveToast.app})</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono truncate max-w-[200px]">
              Comprador: {liveToast.customer}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative w-full max-w-7xl max-h-[96vh] flex flex-col rounded-3xl bg-[#070512] border border-purple-500/30 shadow-2xl shadow-purple-950/90 overflow-hidden text-left">
        {/* Top Geometric Utumify Header Bar */}
        <div className="px-5 py-3.5 border-b border-purple-500/20 bg-gradient-to-r from-[#0C0922] via-[#09071A] to-[#04030A] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#06B6D4] to-[#8B5CF6] p-[1px] shadow-lg shadow-emerald-950/60">
              <div className="w-full h-full bg-[#080614] rounded-[15px] flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-white">
                  UTUMIFY ANALYTICS // NEXORA FINTECH
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  API CONECTADA
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Faturamento em Tempo Real • Amora AI • GraviFlow • Gateway Utumify & Multicaixa
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleQuickSimulate('amora_ai')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/70 border border-rose-500/30 text-rose-300 text-xs font-mono transition-colors cursor-pointer"
              title="Simula venda recebida via webhook do Amora AI"
            >
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">+ Venda Amora</span>
            </button>

            <button
              onClick={() => handleQuickSimulate('graviflow')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-pink-950/50 hover:bg-pink-900/70 border border-pink-500/30 text-pink-300 text-xs font-mono transition-colors cursor-pointer"
              title="Simula venda recebida via webhook do GraviFlow"
            >
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">+ Venda GraviFlow</span>
            </button>

            <button
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-emerald-950/60 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Venda</span>
            </button>

            {records.length > 0 ? (
              <button
                onClick={handleClearDashboard}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-900/30 border border-white/10 hover:border-rose-500/30 text-zinc-400 hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                title="Zerar completamente o dashboard e deixar tudo a zero"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden md:inline">Zerar</span>
              </button>
            ) : (
              <button
                onClick={handleLoadDemo}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-purple-900/30 border border-white/10 hover:border-purple-500/30 text-zinc-400 hover:text-purple-300 text-xs font-mono transition-colors cursor-pointer"
                title="Carregar dados de demonstração para testar"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="hidden md:inline">Carregar Demo</span>
              </button>
            )}

            {onOpenAdminPanel && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                  onOpenAdminPanel();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-800/50 border border-purple-500/30 text-xs font-mono text-purple-200 hover:text-white transition-colors cursor-pointer"
                title="Abrir Painel Admin de Mensagens"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            <button
              onClick={handleLogoutDev}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-xs font-mono text-zinc-400 transition-colors cursor-pointer"
              title="Sair do modo desenvolvedor"
            >
              Sair
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Currency Switcher & Main Tabs Subheader */}
        <div className="px-5 py-2.5 bg-[#09071A] border-b border-purple-500/15 flex flex-wrap items-center justify-between gap-3">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('visao_geral');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'visao_geral'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/60'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('transacoes');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'transacoes'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/60'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Transações ({filteredRecords.length})</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('api_webhooks');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'api_webhooks'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md shadow-purple-950/60'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Conectar APIs</span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-zinc-400 mr-1.5 hidden sm:inline">
              Moeda:
            </span>
            {currencies.map((curr) => {
              const info = CURRENCY_SYMBOLS[curr];
              const isSelected = selectedCurrency === curr;
              return (
                <button
                  key={curr}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedCurrency(curr);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-900/50 font-bold'
                      : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{info.flag}</span>
                  <span>{curr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: VISÃO GERAL (UTUMIFY STYLE METRICS) */}
          {activeTab === 'visao_geral' && (
            <>
              {/* TOP 5 GEOMETRIC KPI METRIC CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {/* 1. Vendas Hoje */}
                <div className="relative p-4 rounded-2xl bg-[#0B091E]/90 border border-emerald-500/30 overflow-hidden group hover:border-emerald-500/60 transition-all shadow-lg">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>VENDAS HOJE</span>
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    {financeStore.format(summary.vendasHoje[selectedCurrency], selectedCurrency)}
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Tempo Real</span>
                  </div>
                </div>

                {/* 2. Faturamento Bruto */}
                <div className="relative p-4 rounded-2xl bg-[#0B091E]/90 border border-cyan-500/30 overflow-hidden group hover:border-cyan-500/60 transition-all shadow-lg">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>FAT. BRUTO</span>
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    {financeStore.format(summary.faturamentoBruto[selectedCurrency], selectedCurrency)}
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-zinc-400">
                    {summary.totalTransacoes} transações registradas
                  </div>
                </div>

                {/* 3. Faturamento Líquido */}
                <div className="relative p-4 rounded-2xl bg-[#0B091E]/90 border border-purple-500/30 overflow-hidden group hover:border-purple-500/60 transition-all shadow-lg">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>FAT. LÍQUIDO</span>
                    <Wallet className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-emerald-400 tracking-tight">
                    {financeStore.format(summary.faturamentoLiquido[selectedCurrency], selectedCurrency)}
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-purple-300">
                    Margem: <span className="font-bold text-emerald-300">{summary.margemLucroPercent}%</span>
                  </div>
                </div>

                {/* 4. Ticket Médio */}
                <div className="relative p-4 rounded-2xl bg-[#0B091E]/90 border border-amber-500/30 overflow-hidden group hover:border-amber-500/60 transition-all shadow-lg">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>TICKET MÉDIO</span>
                    <Percent className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    {financeStore.format(summary.ticketMedio[selectedCurrency], selectedCurrency)}
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-amber-300">
                    Por venda aprovada
                  </div>
                </div>

                {/* 5. Taxa de Aprovação */}
                <div className="relative p-4 rounded-2xl bg-[#0B091E]/90 border border-rose-500/30 overflow-hidden group hover:border-rose-500/60 transition-all shadow-lg col-span-2 md:col-span-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>CONVERSÃO</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    {summary.taxaAprovacao}%
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-emerald-400">
                    Gateway Ativo
                  </div>
                </div>
              </div>

              {/* ZERO STATE CALLOUT IF 0 RECORDS */}
              {records.length === 0 && (
                <div className="p-8 sm:p-12 rounded-3xl bg-[#0B0820]/90 border border-purple-500/30 text-center flex flex-col items-center justify-center my-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-purple-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 shadow-xl">
                    <Hexagon className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white mb-2">
                    Dashboard Zerado & Conectado às Aplicações!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mb-6 leading-relaxed font-light font-mono">
                    O faturamento está limpo e zerado como você pediu. Assim que o Amora AI ou o GraviFlow registrarem vendas ou webhooks, os valores aparecerão aqui automaticamente em tempo real!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => handleQuickSimulate('amora_ai')}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs font-mono flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      Simular Venda Amora AI (+18.500 Kz)
                    </button>
                    <button
                      onClick={() => handleQuickSimulate('graviflow')}
                      className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs font-mono flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      Simular Venda GraviFlow (+24.900 Kz)
                    </button>
                    <button
                      onClick={() => handleOpenAddModal()}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Inserir Faturamento Manual
                    </button>
                  </div>
                </div>
              )}

              {/* GEOMETRIC APP COMPARISON & MULTI-CURRENCY MATRIX */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Apps Distribution Card (Amora AI vs GraviFlow vs Core) */}
                <div className="lg:col-span-5 p-5 rounded-3xl bg-[#0B091E]/90 border border-purple-500/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-cyan-400" />
                        Faturamento por Aplicação
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        Total: {financeStore.format(totalGrossCurrent, selectedCurrency)}
                      </span>
                    </div>

                    {/* App Progress Bars */}
                    <div className="space-y-4">
                      {/* Amora AI */}
                      <div className="p-3 rounded-2xl bg-black/40 border border-rose-500/20">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            Amora AI (Relacionamentos)
                          </span>
                          <span className="font-mono font-bold text-white">
                            {financeStore.format(amoraGross, selectedCurrency)} ({amoraPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(amoraPercent, 0)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400 font-mono">
                          <span>{amoraRecords.length} transações</span>
                          <button
                            onClick={() => handleOpenAddModal('amora_ai')}
                            className="text-rose-400 hover:underline cursor-pointer"
                          >
                            + Lançar Venda
                          </button>
                        </div>
                      </div>

                      {/* GraviFlow */}
                      <div className="p-3 rounded-2xl bg-black/40 border border-pink-500/20">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-pink-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-pink-500" />
                            GraviFlow (Maternidade)
                          </span>
                          <span className="font-mono font-bold text-white">
                            {financeStore.format(graviGross, selectedCurrency)} ({graviPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(graviPercent, 0)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400 font-mono">
                          <span>{graviRecords.length} transações</span>
                          <button
                            onClick={() => handleOpenAddModal('graviflow')}
                            className="text-pink-400 hover:underline cursor-pointer"
                          >
                            + Lançar Venda
                          </button>
                        </div>
                      </div>

                      {/* Nexora Core / Outros */}
                      <div className="p-3 rounded-2xl bg-black/40 border border-cyan-500/20">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                            Nexora Core (Websites & IA)
                          </span>
                          <span className="font-mono font-bold text-white">
                            {financeStore.format(coreGross, selectedCurrency)} ({corePercent}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(corePercent, 0)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400 font-mono">
                          <span>{coreRecords.length} transações</span>
                          <button
                            onClick={() => handleOpenAddModal('nexora_core')}
                            className="text-cyan-400 hover:underline cursor-pointer"
                          >
                            + Lançar Venda
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span>Taxa Média Gateway: ~5%</span>
                    <span className="text-emerald-400 font-semibold">Utumify Online</span>
                  </div>
                </div>

                {/* Multi-Currency Comparative Table across AOA, USD, EUR, BRL */}
                <div className="lg:col-span-7 p-5 rounded-3xl bg-[#0B091E]/90 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      Matriz Multi-Moeda Simultânea
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Cotação em tempo real
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                          <th className="py-2.5 px-3">Moeda</th>
                          <th className="py-2.5 px-3">Faturamento Bruto</th>
                          <th className="py-2.5 px-3">Custos Operacionais</th>
                          <th className="py-2.5 px-3">Faturamento Líquido</th>
                          <th className="py-2.5 px-3 text-right">Margem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {currencies.map((curr) => {
                          const info = CURRENCY_SYMBOLS[curr];
                          const bruto = summary.faturamentoBruto[curr];
                          const custo = summary.custoOperacionalTotal[curr];
                          const liquido = summary.faturamentoLiquido[curr];
                          const isCurrent = selectedCurrency === curr;

                          return (
                            <tr
                              key={curr}
                              className={`transition-colors hover:bg-white/[0.02] ${
                                isCurrent ? 'bg-emerald-500/[0.07] font-semibold' : ''
                              }`}
                            >
                              <td className="py-3 px-3 flex items-center gap-2">
                                <span className="text-base">{info.flag}</span>
                                <div>
                                  <div className="text-white font-bold">{curr}</div>
                                  <div className="text-[10px] text-zinc-500">{info.label}</div>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-white font-bold">
                                {financeStore.format(bruto, curr)}
                              </td>
                              <td className="py-3 px-3 text-rose-400">
                                - {financeStore.format(custo, curr)}
                              </td>
                              <td className="py-3 px-3 text-emerald-400 font-bold">
                                {financeStore.format(liquido, curr)}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                  {summary.margemLucroPercent}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
                    <div>Taxa de Conversão: 1 USD = 935 Kz | 1 EUR = 1.015 Kz | 1 BRL = 165 Kz</div>
                    <div className="text-purple-300">Base Kwanza (AOA)</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: TRANSAÇÕES & EDITABILIDADE (CRUD) */}
          {activeTab === 'transacoes' && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="p-4 rounded-2xl bg-[#0B091E]/90 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar por cliente, email, plano..."
                    className="w-full bg-transparent border-none text-xs text-white placeholder:text-zinc-600 focus:outline-none font-mono"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-zinc-500 hover:text-white"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                  {/* App Filter */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                    <button
                      onClick={() => setAppFilter('todos')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        appFilter === 'todos' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Todos Apps
                    </button>
                    <button
                      onClick={() => setAppFilter('amora_ai')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        appFilter === 'amora_ai' ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-rose-300'
                      }`}
                    >
                      Amora AI
                    </button>
                    <button
                      onClick={() => setAppFilter('graviflow')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        appFilter === 'graviflow' ? 'bg-pink-600 text-white font-bold' : 'text-zinc-400 hover:text-pink-300'
                      }`}
                    >
                      GraviFlow
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenAddModal()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Lançar Venda</span>
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="rounded-3xl bg-[#0B091E]/90 border border-purple-500/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400 text-[11px] bg-black/30">
                        <th className="py-3 px-4">Data / Hora</th>
                        <th className="py-3 px-4">Cliente / E-mail</th>
                        <th className="py-3 px-4">Aplicação / Item</th>
                        <th className="py-3 px-4">Gateway</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Valor Original</th>
                        <th className="py-3 px-4 text-right">Em {selectedCurrency}</th>
                        <th className="py-3 px-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-zinc-500">
                            Nenhuma transação encontrada com os filtros selecionados.
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((rec) => {
                          const dateObj = new Date(rec.data);
                          const dateStr = dateObj.toLocaleDateString('pt-AO');
                          const timeStr = dateObj.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' });
                          const inSelected = financeStore.convert(rec.valorOriginal, rec.moedaOriginal, selectedCurrency);

                          return (
                            <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 px-4 text-zinc-400 whitespace-nowrap">
                                <div>{dateStr}</div>
                                <div className="text-[10px] text-zinc-500">{timeStr}</div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="text-white font-bold">{rec.cliente}</div>
                                {rec.clienteEmail && (
                                  <div className="text-[10px] text-zinc-400">{rec.clienteEmail}</div>
                                )}
                              </td>

                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1.5">
                                  {rec.aplicativo === 'amora_ai' || rec.servico === 'Amora AI' ? (
                                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                                  ) : rec.aplicativo === 'graviflow' || rec.servico === 'GraviFlow' ? (
                                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                                  ) : (
                                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                  )}
                                  <span className="font-semibold text-zinc-200">{rec.projeto}</span>
                                </div>
                                <div className="text-[10px] text-zinc-400">{rec.servico}</div>
                              </td>

                              <td className="py-3 px-4 text-zinc-300">
                                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px]">
                                  {rec.metodoPagamento}
                                </span>
                              </td>

                              <td className="py-3 px-4">
                                {rec.status === 'aprovado' || rec.status === 'concluido' ? (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                    Aprovado
                                  </span>
                                ) : rec.status === 'pendente' || rec.status === 'em_andamento' ? (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                                    Pendente
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                                    Reembolsado
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-4 text-right text-zinc-300 font-bold whitespace-nowrap">
                                {financeStore.format(rec.valorOriginal, rec.moedaOriginal)}
                              </td>

                              <td className="py-3 px-4 text-right text-emerald-400 font-extrabold whitespace-nowrap">
                                {financeStore.format(inSelected, selectedCurrency)}
                              </td>

                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => handleOpenEditModal(rec)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/30 text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                                    title="Editar esta venda"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRecord(rec.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/30 text-zinc-400 hover:text-rose-300 transition-colors cursor-pointer"
                                    title="Excluir transação"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONEXÃO API & WEBHOOKS (AMORA AI & GRAVIFLOW) */}
          {activeTab === 'api_webhooks' && (
            <div className="space-y-6">
              {/* Header explanation */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-black/60 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-display font-bold text-base text-white">
                    Conectar o Dashboard com as APIs do Amora AI e GraviFlow
                  </h4>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Sempre que um utilizador comprar um plano ou fizer um pagamento no <strong>Amora AI</strong> (https://amor-ai.vercel.app) ou no <strong>GraviFlow</strong> (https://graviflow.vercel.app/), o teu sistema envia um webhook JSON e este dashboard atualiza imediatamente o faturamento bruto, faturamento líquido e estatísticas!
                </p>
              </div>

              {/* API Credentials & Webhook Endpoints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Amora AI Webhook Card */}
                <div className="p-5 rounded-3xl bg-[#0B091E]/90 border border-rose-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-rose-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-rose-400" />
                      API Webhook // Amora AI
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      POST
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Webhook URL</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
                      <span className="truncate flex-1">https://nexora.ai/api/webhooks/amora</span>
                      <button
                        onClick={() => copyToClipboard('https://nexora.ai/api/webhooks/amora', 'amora_url')}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'amora_url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Secret Key do Amora AI</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
                      <span className="truncate flex-1">nex_live_amora_91a5b095e707</span>
                      <button
                        onClick={() => copyToClipboard('nex_live_amora_91a5b095e707', 'amora_key')}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'amora_key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* GraviFlow Webhook Card */}
                <div className="p-5 rounded-3xl bg-[#0B091E]/90 border border-pink-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-pink-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-pink-400" />
                      API Webhook // GraviFlow
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                      POST
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Webhook URL</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
                      <span className="truncate flex-1">https://nexora.ai/api/webhooks/graviflow</span>
                      <button
                        onClick={() => copyToClipboard('https://nexora.ai/api/webhooks/graviflow', 'gravi_url')}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'gravi_url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Secret Key do GraviFlow</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
                      <span className="truncate flex-1">nex_live_gravi_91a5b095e707</span>
                      <button
                        onClick={() => copyToClipboard('nex_live_gravi_91a5b095e707', 'gravi_key')}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'gravi_key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Webhook Simulator */}
              <div className="p-5 rounded-3xl bg-[#0B091E]/90 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Simulador de Venda em Tempo Real (Testar Webhook)
                  </span>
                  {testFeedback && (
                    <span className="text-xs font-mono text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-lg">
                      {testFeedback}
                    </span>
                  )}
                </div>

                <form onSubmit={handleExecuteWebhookTest} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">App de Origem</label>
                    <select
                      value={testApp}
                      onChange={(e) => {
                        const app = e.target.value as any;
                        setTestApp(app);
                        setTestPlan(app === 'amora_ai' ? 'Plano VIP Semestral' : 'Plano Maternidade Completo');
                        setTestAmount(app === 'amora_ai' ? '18500' : '24900');
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                    >
                      <option value="amora_ai">Amora AI</option>
                      <option value="graviflow">GraviFlow</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Valor</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={testAmount}
                        onChange={(e) => setTestAmount(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                      />
                      <select
                        value={testCurrency}
                        onChange={(e) => setTestCurrency(e.target.value as any)}
                        className="px-2 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                      >
                        <option value="AOA">AOA</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="BRL">BRL</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Comprador</label>
                    <input
                      type="text"
                      value={testCustomer}
                      onChange={(e) => setTestCustomer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Plano / Produto</label>
                    <input
                      type="text"
                      value={testPlan}
                      onChange={(e) => setTestPlan(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/60 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Disparar Webhook
                    </button>
                  </div>
                </form>
              </div>

              {/* Code Integration Snippet */}
              <div className="p-5 rounded-3xl bg-black/60 border border-white/10 space-y-2">
                <span className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Exemplo de Envio em JavaScript / TypeScript (Amora AI ou GraviFlow)
                </span>
                <pre className="p-4 rounded-2xl bg-[#05030C] border border-white/5 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`// Quando o cliente conclui o pagamento no Amora AI ou GraviFlow:
await fetch('https://nexora.ai/api/webhooks/revenue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'nex_live_amora_91a5b095e707'
  },
  body: JSON.stringify({
    app: 'amora_ai', // ou 'graviflow'
    amount: 18500,
    currency: 'AOA', // 'AOA', 'USD', 'EUR' ou 'BRL'
    customerName: 'Manuel Seixas',
    customerEmail: 'cliente@exemplo.com',
    plan: 'Amora AI — Assinatura VIP Semestral',
    gateway: 'Utumify Gateway'
  })
});`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* MODAL: ADD OR EDIT TRANSACTION */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#0C0A22] border border-purple-500/40 p-6 shadow-2xl text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h4 className="font-display font-extrabold text-base text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                  {editingRecord ? 'Editar Faturamento / Transação' : 'Registar Nova Venda'}
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveRecord} className="space-y-3.5 text-xs font-mono">
                {/* App Selector */}
                <div>
                  <label className="block text-zinc-400 mb-1">Aplicação Responsável</label>
                  <select
                    value={formApp}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setFormApp(val);
                      if (val === 'amora_ai') setFormPlan('Amora AI — Assinatura VIP');
                      else if (val === 'graviflow') setFormPlan('GraviFlow — Plano Gestação Completo');
                      else setFormPlan('Website Inteligente & Solução IA');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="amora_ai">Amora AI (Relacionamentos)</option>
                    <option value="graviflow">GraviFlow (Maternidade)</option>
                    <option value="nexora_core">Nexora Core (Websites & Consultoria)</option>
                  </select>
                </div>

                {/* Plan / Item */}
                <div>
                  <label className="block text-zinc-400 mb-1">Nome do Plano / Produto</label>
                  <input
                    type="text"
                    value={formPlan}
                    onChange={(e) => setFormPlan(e.target.value)}
                    placeholder="Ex: Assinatura VIP Semestral..."
                    required
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Customer and Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Cliente / Comprador</label>
                    <input
                      type="text"
                      value={formClient}
                      onChange={(e) => setFormClient(e.target.value)}
                      placeholder="Nome do cliente"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">E-mail (opcional)</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="cliente@email.com"
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Amount and Currency */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Valor da Venda</label>
                    <input
                      type="number"
                      step="any"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      placeholder="Ex: 18500"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400 font-bold text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Moeda</label>
                    <select
                      value={formCurrency}
                      onChange={(e) => setFormCurrency(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400 font-bold"
                    >
                      <option value="AOA">AOA (Kwanza 🇦🇴)</option>
                      <option value="USD">USD (Dólar 🇺🇸)</option>
                      <option value="EUR">EUR (Euro 🇪🇺)</option>
                      <option value="BRL">BRL (Real 🇧🇷)</option>
                    </select>
                  </div>
                </div>

                {/* Cost and Gateway */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Custo / Taxas Gateway</label>
                    <input
                      type="number"
                      step="any"
                      value={formCost}
                      onChange={(e) => setFormCost(e.target.value)}
                      placeholder="Ex: 950"
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Gateway / Pagamento</label>
                    <select
                      value={formGateway}
                      onChange={(e) => setFormGateway(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Utumify Gateway">Utumify Gateway</option>
                      <option value="Multicaixa Express">Multicaixa Express</option>
                      <option value="Transferência Multicaixa">Transferência Multicaixa</option>
                      <option value="Stripe / Cartão">Stripe / Cartão</option>
                      <option value="Pix">Pix</option>
                      <option value="Transferência Bancária Internacional">Transferência Internacional</option>
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-zinc-400 mb-1">Status da Venda</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="aprovado">Aprovado (Calcula no Faturamento)</option>
                    <option value="pendente">Pendente</option>
                    <option value="reembolsado">Reembolsado / Estornado</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-zinc-400 mb-1">Notas / Observações</label>
                  <input
                    type="text"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Observação da transação..."
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold shadow-lg shadow-emerald-950/60 cursor-pointer"
                  >
                    {editingRecord ? 'Atualizar Venda' : 'Salvar Venda'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
