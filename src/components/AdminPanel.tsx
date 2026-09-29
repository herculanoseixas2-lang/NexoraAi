import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  X,
  Mail,
  MessageCircle,
  Clock,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  ExternalLink,
  Send,
  Building,
  User,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { ClientMessage } from '../types';
import { messageStore } from '../utils/messageStore';
import { soundEffects } from '../utils/audioEffects';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => messageStore.isDevAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [messages, setMessages] = useState<ClientMessage[]>(() => messageStore.getMessages());
  const [selectedMessage, setSelectedMessage] = useState<ClientMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<'todos' | 'novo' | 'respondido'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [sentFeedback, setSentFeedback] = useState<string | null>(null);

  // Sync messages
  const selectedIdRef = useRef<string | undefined>(selectedMessage?.id);
  selectedIdRef.current = selectedMessage?.id;

  useEffect(() => {
    const handleUpdate = () => {
      const msgs = messageStore.getMessages();
      setMessages(msgs);
      if (selectedIdRef.current) {
        const updatedSelected = msgs.find((m) => m.id === selectedIdRef.current);
        setSelectedMessage(updatedSelected || null);
      }
    };

    window.addEventListener('nexora_messages_updated', handleUpdate);
    return () => window.removeEventListener('nexora_messages_updated', handleUpdate);
  }, []);

  // When selected message changes by ID, prepare default response template
  useEffect(() => {
    if (selectedMessage) {
      setReplyText(
        `Olá ${selectedMessage.nome}! Aqui é o desenvolvedor da Nexora AI. Recebemos a sua mensagem referente a "${selectedMessage.servicoInteresse}". Analisámos a viabilidade da sua solicitação e gostaríamos de detalhar a melhor arquitetura e proposta.`
      );
      setSentFeedback(null);
    }
  }, [selectedMessage?.id]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    // Developer master key requested: kenyseixas20
    if (pinInput.trim() === 'kenyseixas20') {
      messageStore.setDevAuthenticated(true);
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    soundEffects.playClick();
    messageStore.setDevAuthenticated(false);
    setIsAuthenticated(false);
    setPinInput('');
  };

  const formatWhatsAppNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    // If local Angola 9-digit number starting with 9 (e.g. 928230620)
    if (cleaned.length === 9) {
      cleaned = '244' + cleaned;
    }
    return cleaned;
  };

  const handleSendWhatsAppReply = () => {
    if (!selectedMessage) return;
    soundEffects.playClick();

    const formattedPhone = formatWhatsAppNumber(selectedMessage.telefone);
    const encodedText = encodeURIComponent(replyText);
    const waUrl = `https://wa.me/${formattedPhone}?text=${encodedText}`;

    // Mark as answered
    messageStore.updateStatus(selectedMessage.id, 'respondido', {
      texto: replyText,
      canal: 'whatsapp',
      data: new Date().toISOString(),
    });

    setSentFeedback('Resposta gerada e registada com sucesso! A abrir WhatsApp...');
    window.open(waUrl, '_blank');
  };

  const handleSendEmailReply = () => {
    if (!selectedMessage) return;
    soundEffects.playClick();

    const subject = encodeURIComponent(`Resposta Nexora AI // ${selectedMessage.servicoInteresse}`);
    const body = encodeURIComponent(replyText);
    const mailtoUrl = `mailto:${selectedMessage.email}?subject=${subject}&body=${body}`;

    // Mark as answered
    messageStore.updateStatus(selectedMessage.id, 'respondido', {
      texto: replyText,
      canal: 'email',
      data: new Date().toISOString(),
    });

    setSentFeedback('Resposta registada e cliente de e-mail acionado!');
    window.open(mailtoUrl, '_blank');
  };

  const handleDelete = (id: string) => {
    soundEffects.playClick();
    if (window.confirm('Tem certeza de que deseja eliminar esta mensagem?')) {
      messageStore.deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  // Filtered messages
  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      filterStatus === 'todos' ? true : m.status === filterStatus;
    const matchesSearch =
      m.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.telefone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.empresa && m.empresa.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.mensagem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCount = messages.length;
  const newCount = messages.filter((m) => m.status === 'novo').length;
  const answeredCount = messages.filter((m) => m.status === 'respondido').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090715] border border-purple-500/40 shadow-2xl shadow-purple-950/90 overflow-hidden text-left">
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-purple-500/20 bg-[#0E0C22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wider text-white">
                  PAINEL DE DESENVOLVEDOR // NEXORA INBOX
                </span>
                {newCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-600/80 text-[10px] font-mono text-purple-200 animate-pulse">
                    {newCount} novas
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                Acesso restrito ao desenvolvedor para leitura e envio de respostas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Sair
              </button>
            )}
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-5 shadow-xl shadow-purple-950/60">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Autenticação de Desenvolvedor
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6">
              Introduza a Chave de Engenharia para aceder às mensagens recebidas através do website Nexora.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Chave de Engenharia"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/40 text-white font-mono text-center text-sm focus:outline-none focus:border-purple-400 placeholder:text-zinc-600"
                  autoFocus
                />
                {pinError && (
                  <p className="text-[11px] text-rose-400 mt-1.5 flex items-center justify-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Chave de segurança incorreta.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white font-semibold text-xs tracking-wider uppercase transition-all hover:brightness-110 active:scale-98 cursor-pointer shadow-lg shadow-purple-900/50"
              >
                Aceder ao Painel
              </button>
            </form>
          </div>
        ) : (
          /* Main Inbox Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* KPI Summary Bar */}
            <div className="grid grid-cols-3 gap-2 px-5 py-3 bg-[#0B091B] border-b border-purple-500/15 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">Total Recebidas</div>
                  <div className="font-display font-bold text-base text-white">{totalCount}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">Pendentes / Novas</div>
                  <div className="font-display font-bold text-base text-purple-300">{newCount}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">Respondidas</div>
                  <div className="font-display font-bold text-base text-emerald-400">{answeredCount}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Split View: Left List / Right Message Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
              {/* Message List */}
              <div className="md:col-span-5 border-r border-purple-500/15 flex flex-col h-full overflow-hidden bg-[#070512]">
                {/* Search & Filter Bar */}
                <div className="p-3 border-b border-white/5 space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquisar por nome, email ou mensagem..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>

                  <div className="flex gap-1">
                    {(['todos', 'novo', 'respondido'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`flex-1 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                          filterStatus === st
                            ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 font-bold'
                            : 'bg-white/[0.02] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {st === 'todos' ? 'Todas' : st === 'novo' ? 'Pendentes' : 'Respondidas'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center text-xs font-mono text-zinc-500">
                      Nenhuma mensagem encontrada.
                    </div>
                  ) : (
                    filteredMessages.map((msg) => {
                      const isSelected = selectedMessage?.id === msg.id;
                      return (
                        <div
                          key={msg.id}
                          onClick={() => {
                            soundEffects.playClick();
                            setSelectedMessage(msg);
                          }}
                          className={`p-3.5 transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'bg-purple-900/30 border-l-2 border-purple-400'
                              : 'hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  msg.status === 'novo' ? 'bg-purple-400 animate-ping' : 'bg-emerald-400'
                                }`}
                              />
                              <span className="font-medium text-xs text-white truncate max-w-[130px]">
                                {msg.nome}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono text-[#38BDF8] truncate mb-1">
                            {msg.servicoInteresse}
                          </div>

                          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                            {msg.mensagem}
                          </p>

                          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                            <span>WhatsApp: {msg.telefone}</span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] ${
                                msg.status === 'novo'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              {msg.status === 'novo' ? 'Pendente' : 'Respondida'}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Message Details & Reply Panel */}
              <div className="md:col-span-7 flex flex-col h-full overflow-y-auto bg-[#090715] p-5">
                {selectedMessage ? (
                  <div className="space-y-5">
                    {/* Header of selected message */}
                    <div className="flex items-start justify-between pb-4 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-lg text-white">
                            {selectedMessage.nome}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                              selectedMessage.status === 'novo'
                                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                                : 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {selectedMessage.status === 'novo' ? 'Pendente de Resposta' : 'Respondida'}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">
                          Enviado em {new Date(selectedMessage.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors cursor-pointer"
                        title="Eliminar Mensagem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sender Metadata Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-zinc-500 text-[10px] uppercase block">WhatsApp / Telefone</span>
                        <a
                          href={`https://wa.me/${formatWhatsAppNumber(selectedMessage.telefone)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{selectedMessage.telefone}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-zinc-500 text-[10px] uppercase block">E-mail</span>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-[#38BDF8] font-semibold hover:underline flex items-center gap-1 mt-0.5 truncate"
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{selectedMessage.email}</span>
                        </a>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-zinc-500 text-[10px] uppercase block">Serviço de Interesse</span>
                        <span className="text-purple-300 font-medium">{selectedMessage.servicoInteresse}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-zinc-500 text-[10px] uppercase block">Empresa</span>
                        <span className="text-white">{selectedMessage.empresa || 'Não especificada'}</span>
                      </div>
                    </div>

                    {/* Full Message Box */}
                    <div className="p-4 rounded-xl bg-black/60 border border-purple-500/25">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">
                        Mensagem do Cliente
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.mensagem}
                      </p>
                    </div>

                    {/* Previous Reply Log (if already answered) */}
                    {selectedMessage.respostaEnviada && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                        <div className="flex items-center justify-between text-emerald-400 font-mono text-[11px] mb-1">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Respondido via {selectedMessage.respostaEnviada.canal.toUpperCase()}</span>
                          </span>
                          <span className="text-zinc-500">
                            {new Date(selectedMessage.respostaEnviada.data).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-zinc-300 text-xs mt-1">
                          "{selectedMessage.respostaEnviada.texto}"
                        </p>
                      </div>
                    )}

                    {/* Response Composer */}
                    <div className="pt-2 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-medium text-white flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-purple-400" />
                          <span>Compor Resposta ao Cliente</span>
                        </label>
                        <span className="text-[10px] font-mono text-zinc-500">
                          O usuário receberá no WhatsApp ou E-mail
                        </span>
                      </div>

                      <textarea
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escreva a resposta personalizada para o cliente..."
                        className="w-full p-3 rounded-xl bg-black/60 border border-purple-500/30 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-400 leading-relaxed font-sans"
                      />

                      {sentFeedback && (
                        <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>{sentFeedback}</span>
                        </div>
                      )}

                      {/* Reply Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleSendWhatsAppReply}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:brightness-110 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Responder via WhatsApp Oficial</span>
                        </button>

                        <button
                          onClick={handleSendEmailReply}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-110 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Responder via E-mail</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-zinc-500 font-mono text-xs">
                    <Mail className="w-12 h-12 text-zinc-700 mb-3" />
                    <p className="text-zinc-400 font-medium mb-1">Nenhuma mensagem selecionada</p>
                    <p className="text-zinc-600 max-w-xs">
                      Selecione uma mensagem na lista à esquerda para ler os detalhes e responder diretamente por WhatsApp ou E-mail.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
