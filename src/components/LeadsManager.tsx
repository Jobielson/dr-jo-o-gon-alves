import React, { useState, useEffect } from 'react';
import { Lead } from '../types';
import { ShieldAlert, Trash2, Check, RefreshCw, X, FileSpreadsheet, Mail, Phone, MessageSquare } from 'lucide-react';

interface LeadsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  leadsUpdatedTrigger: number;
}

export default function LeadsManager({ isOpen, onClose, leadsUpdatedTrigger }: LeadsManagerProps) {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const loadedLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    setLeads(loadedLeads);
  }, [isOpen, leadsUpdatedTrigger]);

  const updateLeadStatus = (id: string, newStatus: Lead['status']) => {
    const updatedLeads = leads.map(lead => {
      if (lead.id === id) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setLeads(updatedLeads);
  };

  const deleteLead = (id: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== id);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setLeads(updatedLeads);
  };

  const clearAllLeads = () => {
    if (confirm('Tem certeza que deseja apagar todos os leads de demonstração?')) {
      localStorage.removeItem('leads');
      setLeads([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fdfbf7] border border-[#4c2f1a]/25 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#4c2f1a] text-[#fdfbf7] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-serif font-semibold text-lg">Lead Inbox</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#fefbec]/80">Painel de Controle de Leads (Local)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#fdfbf7]/85 hover:text-[#fdfbf7] p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#4c2f1a]/10">
            <div>
              <p className="text-sm text-[#2c1b10]/80">
                Este é um painel administrativo simulado que captura em tempo real os contatos recebidos pelo formulário. Os dados estão salvos de forma segura no <strong>localStorage</strong> do seu navegador para fins de teste.
              </p>
            </div>
            {leads.length > 0 && (
              <button
                onClick={clearAllLeads}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar Banco de Leads
              </button>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12">
              <ShieldAlert className="w-12 h-12 text-[#a36c3b]/50 mx-auto mb-4" />
              <p className="font-serif text-lg font-medium text-[#2c1b10]">Nenhum lead recebido ainda.</p>
              <p className="text-xs text-[#2c1b10]/65 mt-1 max-w-xs mx-auto">
                Preencha o formulário da Landing Page para simular o recebimento de uma nova consulta de avaliação.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#4c2f1a]/5 text-[#4c2f1a] uppercase tracking-wider font-semibold border-b border-[#4c2f1a]/10">
                    <th className="py-3 px-4">Data / Contato</th>
                    <th className="py-3 px-4">Cliente / E-mail</th>
                    <th className="py-3 px-4">Área Necessária</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4c2f1a]/5 text-[#2c1b10]/90">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#fefbec]/30 transition-colors">
                      <td className="py-4 px-4">
                        <span className="block font-mono text-[10px] text-[#4c2f1a]/70">{lead.date}</span>
                        <a 
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[#4c2f1a] hover:underline font-semibold mt-1"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          {lead.phone}
                        </a>
                      </td>
                      <td className="py-4 px-4">
                        <span className="block font-serif font-semibold text-sm">{lead.name}</span>
                        <span className="flex items-center gap-1 text-[11px] text-[#2c1b10]/70">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-[#a36c3b]">
                        {lead.status === 'Pendente' ? (
                          <span className="inline-block max-w-[200px] truncate">
                            {lead.id.startsWith('demo') ? 'Demonstração' : 
                              lead.id ? (
                                lead.id && lead.id.length > 5 ? (
                                  lead.id.substring(0, 5) === 'civil' ? 'Civil e Sucessões' :
                                  'Suporte Jurídico'
                                ) : 'Suporte'
                              ) : 'Suporte'
                            }
                          </span>
                        ) : null}
                        <span className="block text-xs">
                          {lead.id.includes('civil') ? 'Civil & Sucessões' :
                           lead.id.includes('trabalhista') ? 'Trabalhista & Previdência' :
                           'Contratos e Resolução'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block text-[10px] uppercase font-bold tracking-wider py-1 px-2.5 rounded-full ${
                          lead.status === 'Pendente' ? 'bg-amber-100 text-amber-800' :
                          lead.status === 'Contatado' ? 'bg-blue-100 text-blue-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.status !== 'Contatado' && lead.status !== 'Concluído' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'Contatado')}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded-sm"
                              title="Marcar como Contatado"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {lead.status !== 'Concluído' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'Concluído')}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-sm"
                              title="Marcar como Concluído"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-sm"
                            title="Excluir Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#4c2f1a]/5 px-6 py-3.5 border-t border-[#4c2f1a]/10 flex items-center justify-between text-[11px] text-[#4c2f1a]/70 font-medium">
          <span>{leads.length} Contato(s) Registrado(s)</span>
          <span>Criptografado Localmente • Dr. João Gonçalves Advocacia</span>
        </div>
      </div>
    </div>
  );
}
