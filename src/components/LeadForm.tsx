import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Send, ShieldCheck, Clock } from 'lucide-react';
import { Lead } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LeadFormProps {
  selectedService?: string;
  onLeadSubmitted: (newLead: Lead) => void;
  onRedirectBlocked?: (e: React.MouseEvent, buttonName: string) => void;
}

export default function LeadForm({ selectedService = '', onLeadSubmitted, onRedirectBlocked }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    situation: selectedService || 'civil-familia',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-fill form if service changes
  React.useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, situation: selectedService }));
    }
  }, [selectedService]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Format: (XX) XXXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors(prev => {
        const { phone, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Nome completo é obrigatório.';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Insira um e-mail válido.';
    }
    
    const rawPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório.';
    } else if (rawPhone.length < 10) {
      newErrors.phone = 'Insira um telefone válido com DDD.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newLead: Lead = {
        id: Math.random().toString(36).substring(2, 11),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: new Date().toLocaleString('pt-BR'),
        status: 'Pendente'
      };

      // Save to localStorage
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('leads', JSON.stringify(existingLeads));

      onLeadSubmitted(newLead);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      situation: 'civil-familia',
      message: ''
    });
    setIsSuccess(false);
  };

  const whatsappLink = `https://wa.me/5588992800454?text=${encodeURIComponent(
    `Olá Dr. João! Acabei de registrar meus dados na Landing Page e gostaria de agendar minha Consulta Cortesia de Avaliação referente à área de: ${
      formData.situation === 'civil-familia' ? 'Proteção Patrimonial e Família' :
      formData.situation === 'trabalhista-previdenciario' ? 'Direito Trabalhador ou Previdência' : 'Resolução de Conflitos e Contratos'
    }.`
  )}`;

  return (
    <div className="bg-[#fdfbf7] p-5 sm:p-8 md:p-10 rounded-sm border border-[#4c2f1a]/15 editorial-shadow relative overflow-hidden">
      {/* Elegante detalhe de topo decorativo */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#d4af37]" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a36c3b] font-semibold block mb-1">
                Consulta de Avaliação Grátis
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#2c1b10]">
                Inicie Seu Diagnóstico
              </h3>
              <p className="font-sans text-xs text-[#2c1b10]/70 mt-1">
                Preencha os dados abaixo. Nós entraremos em contato em até 15 minutos de forma amigável e segura.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2c1b10]/80 uppercase tracking-wider mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: João da Silva"
                  className={`w-full text-sm py-2.5 px-3.5 bg-[#fefbec]/40 border rounded-sm outline-none transition-all ${
                    errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#4c2f1a]/20 focus:border-[#4c2f1a] focus:bg-[#fefbec]/70'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2c1b10]/80 uppercase tracking-wider mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Ex: (88) 99999-9999"
                    className={`w-full text-sm py-2.5 px-3.5 bg-[#fefbec]/40 border rounded-sm outline-none transition-all ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#4c2f1a]/20 focus:border-[#4c2f1a] focus:bg-[#fefbec]/70'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2c1b10]/80 uppercase tracking-wider mb-1">
                    Seu Melhor E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: contato@empresa.com"
                    className={`w-full text-sm py-2.5 px-3.5 bg-[#fefbec]/40 border rounded-sm outline-none transition-all ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#4c2f1a]/20 focus:border-[#4c2f1a] focus:bg-[#fefbec]/70'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2c1b10]/80 uppercase tracking-wider mb-1">
                  Qual área você precisa de suporte?
                </label>
                <select
                  name="situation"
                  value={formData.situation}
                  onChange={handleInputChange}
                  className="w-full text-sm py-2.5 px-3 bg-[#fefbec]/40 border border-[#4c2f1a]/20 rounded-sm outline-none focus:border-[#4c2f1a] focus:bg-[#fefbec]/70 transition-all text-[#2c1b10]"
                >
                  <option value="civil-familia">Defesa e Proteção Patrimonial (Civil e Sucessões)</option>
                  <option value="trabalhista-previdenciario">Direitos do Trabalhador & Previdência</option>
                  <option value="contratos-conflitos">Resolução de Conflitos e Contratos Seguros</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2c1b10]/80 uppercase tracking-wider mb-1">
                  Descreva brevemente sua situação (Opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Sinta-se à vontade para nos relatar brevemente seu caso para podermos agilizar o atendimento..."
                  className="w-full text-sm py-2.5 px-3.5 bg-[#fefbec]/40 border border-[#4c2f1a]/20 rounded-sm outline-none focus:border-[#4c2f1a] focus:bg-[#fefbec]/70 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b08d32] text-[#2c1b10] font-semibold uppercase tracking-wider text-xs py-3.5 px-6 rounded-sm shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#2c1b10] border-t-transparent rounded-full animate-spin" />
                      <span>Analisando Dados...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Solicitar Diagnóstico Grátis</span>
                    </>
                  )}
                </button>
              </div>

              {/* Badges de segurança e agilidade */}
              <div className="pt-4 border-t border-[#4c2f1a]/5 flex flex-wrap gap-4 items-center justify-center text-[11px] text-[#4c2f1a]/70 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4c2f1a]" />
                  Dados Protegidos (LGPD)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#4c2f1a]" />
                  Retorno em até 15 Minutos
                </span>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-[#4c2f1a]/10 text-[#4c2f1a] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#2c1b10] mb-3">
              Obrigado, {formData.name.split(' ')[0]}!
            </h3>
            <p className="font-sans text-sm text-[#2c1b10]/80 leading-relaxed max-w-sm mx-auto mb-8">
              Seu pedido de Consulta Cortesia de Avaliação foi registrado em nosso sistema. Nosso escritório já está analisando o caso e entrará em contato em breve.
            </p>

            <div className="space-y-3 max-w-sm mx-auto">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (onRedirectBlocked) {
                    onRedirectBlocked(e, 'WhatsApp de Agendamento');
                  }
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold uppercase tracking-wider text-xs py-3.5 px-6 rounded-sm shadow-md transition-all duration-300"
              >
                <span>Chamar Dr. João no WhatsApp Agora</span>
              </a>

              <button
                onClick={resetForm}
                className="text-xs font-medium text-[#4c2f1a]/70 hover:text-[#4c2f1a] underline transition-colors"
              >
                Enviar Outro Diagnóstico
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
