import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  MapPin, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Check, 
  MessageSquare, 
  ChevronRight, 
  Sliders, 
  UserCheck, 
  Award,
  Phone,
  FileSpreadsheet,
  Camera,
  RotateCcw,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import Header from './components/Header';
import ServiceCard from './components/ServiceCard';
import LeadForm from './components/LeadForm';
import FAQSection from './components/FAQSection';
import LeadsManager from './components/LeadsManager';
import { servicesData, testimonialsData } from './data';
import { Lead } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [leadsTrigger, setLeadsTrigger] = useState(0);
  const [isFloatVisible, setIsFloatVisible] = useState(false);

  const [demoToast, setDemoToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showDemoToast = (message: string) => {
    setDemoToast({ message, visible: true });
  };

  useEffect(() => {
    if (demoToast.visible) {
      const timer = setTimeout(() => {
        setDemoToast(prev => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [demoToast.visible]);

  const handleRedirectBlock = (e: React.MouseEvent, buttonName: string) => {
    e.preventDefault();
    showDemoToast(`[Modo de Compartilhamento] O botão "${buttonName}" simula o direcionamento correto de forma segura e sem tirar você do site!`);
  };

  useEffect(() => {
    // Show float button after scroll
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsFloatVisible(true);
      } else {
        setIsFloatVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    // Smooth scroll to the lead form
    const formElement = document.getElementById('diagnostico-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmitted = (newLead: Lead) => {
    // Trigger leads manager update
    setLeadsTrigger(prev => prev + 1);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-seed demo leads if local storage is empty so the Lead Inbox looks great from start
  useEffect(() => {
    const existingLeads = localStorage.getItem('leads');
    if (!existingLeads) {
      const demoLeads: Lead[] = [
        {
          id: 'demo-1',
          name: 'David Rodrigues',
          email: 'david.rodrigues@hotmail.com',
          phone: '(88) 99762-0144',
          date: '11/07/2026, 14:32:00',
          status: 'Contatado'
        },
        {
          id: 'demo-2',
          name: 'Tatyane Nascimento',
          email: 'taty.nascimento@gmail.com',
          phone: '(88) 99180-2245',
          date: '12/07/2026, 09:15:00',
          status: 'Pendente'
        }
      ];
      localStorage.setItem('leads', JSON.stringify(demoLeads));
      setLeadsTrigger(prev => prev + 1);
    }
  }, []);

  const whatsappLink = "https://wa.me/5588992800454?text=Olá Dr. João! Gostaria de falar com um especialista sobre o serviço de Advogado para a minha necessidade.";

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c1b10] font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <Header onContactClick={() => scrollToSection('diagnostico-form')} />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 -z-10 w-[45vw] h-[75vh] bg-[#fefbec] rounded-bl-[120px] border-l border-b border-[#4c2f1a]/5 hidden lg:block" />

        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Super-head with Local Trigger */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4c2f1a]/5 rounded-full border border-[#4c2f1a]/10 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#a36c3b]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#4c2f1a] font-semibold">
              Serviço especializado de Advogado em Hidrolândia - CE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c1b10] tracking-tight leading-[1.1] mb-6">
            Segurança Jurídica e <br />
            <span className="text-[#a36c3b] italic">Resolução de Conflitos</span> <br />
            em Hidrolândia - CE sem burocracia.
          </h1>

          {/* Sub-headline */}
          <p className="font-sans text-base md:text-lg text-[#2c1b10]/80 max-w-2xl leading-relaxed mb-8">
            O Dr. João Gonçalves alia a excelência técnica do direito clássico com um atendimento profundamente humanizado, ágil e descomplicado. Protegemos o seu patrimônio e garantimos os seus direitos com total acolhimento e dedicação.
          </p>

          {/* CTA Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
            <button
              onClick={() => scrollToSection('diagnostico-form')}
              className="bg-[#d4af37] hover:bg-[#b08d32] text-[#2c1b10] font-semibold uppercase tracking-wider text-xs py-4 px-8 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 text-center cursor-pointer"
            >
              Consulta Cortesia de Avaliação
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => handleRedirectBlock(e, 'WhatsApp')}
              className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4c2f1a] hover:text-[#a36c3b] py-3.5 px-6 border border-[#4c2f1a]/20 hover:border-[#a36c3b]/40 bg-[#fdfbf7] rounded-sm transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Microcopy Guarantees */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-[#4c2f1a]/70 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#d4af37]" /> Sem Compromisso
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#d4af37]" /> Retorno em 15 Minutos
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#d4af37]" /> Advocacia Humanizada
            </span>
          </div>
        </div>

        {/* Hero Image Section - Editorial Style (Framed, Asymmetrical) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[340px] md:max-w-[380px]">
            {/* Absolute Logo Placement (Top-Left overlay) with custom float motion */}
            <div className="absolute -top-6 left-2 sm:-top-12 sm:-left-8 md:-top-16 md:-left-16 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 z-20">
              <motion.div 
                className="w-full h-full drop-shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-[#fdfbf7] p-2.5 rounded-full border-2 border-[#4c2f1a]/25 shadow-lg flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Background offset border */}
            <div className="absolute -inset-2 sm:-inset-4 border-2 border-[#4c2f1a]/10 translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3 rounded-sm -z-10" />
            
            {/* Main Image Container with elegant editorial border */}
            <div className="bg-[#fefbec] p-3 rounded-sm border border-[#4c2f1a]/15 editorial-shadow relative group">
              <div className="relative overflow-hidden rounded-sm h-[400px]">
                <img
                  src="/photo.png"
                  alt="Dr. João Gonçalves - Advogado"
                  className="w-full h-full object-cover rounded-sm transition-all duration-700 transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-4 p-3 text-center bg-[#4c2f1a]/5 rounded-sm">
                <p className="font-serif font-semibold text-[#2c1b10] text-sm">Dr. João Gonçalves</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#4c2f1a]/80 mt-0.5">OAB/CE e atuação em Hidrolândia - CE</p>
              </div>
            </div>

            {/* Float Metric Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#fdfbf7] border border-[#4c2f1a]/15 py-3 px-4 rounded-sm shadow-lg flex items-center gap-3">
              <div className="bg-[#d4af37]/10 p-2 rounded-sm text-[#a36c3b]">
                <Scale className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-base text-[#2c1b10]">100%</span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-[#4c2f1a]/80 font-semibold -mt-1">Dedicação Integral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Trust Metric Bar */}
      <section className="bg-[#4c2f1a] text-[#fdfbf7] py-12 px-6 md:px-12 border-y border-[#4c2f1a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-1 bg-[#fefbec]/10 py-1 px-2.5 rounded-sm border border-[#d4af37]/20">
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <span className="font-mono text-xs font-bold text-[#d4af37] ml-1.5">5.0 / 5.0</span>
            </div>
            <p className="font-serif text-lg md:text-xl font-medium tracking-wide">
              Excelente reputação avaliada por clientes locais
            </p>
            <p className="text-xs text-[#fdfbf7]/75 font-sans -mt-1">
              Escritório reconhecido com nota máxima nas avaliações do Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t md:border-t-0 md:border-l border-[#fdfbf7]/10 pt-6 md:pt-0 md:pl-12 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="block font-serif font-bold text-3xl text-[#d4af37]">5★</span>
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#fdfbf7]/70 font-semibold">Avaliação Google</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block font-serif font-bold text-3xl text-[#d4af37]">100%</span>
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#fdfbf7]/70 font-semibold">Foco Humano</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="solucoes" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#a36c3b] font-semibold block mb-2">
            Como Podemos Ajudar Você
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2c1b10] tracking-tight mb-4">
            Soluções Jurídicas Sob Medida
          </h2>
          <p className="font-sans text-sm md:text-base text-[#2c1b10]/70 leading-relaxed">
            Unimos o conhecimento profundo das leis ao acolhimento das necessidades reais de cada cliente. Clique na solução ideal para iniciar seu diagnóstico grátis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelect={() => handleSelectService(service.id)}
            />
          ))}
        </div>
      </section>

      {/* About & Difference Section - Editorial Layout */}
      <section id="sobre" className="py-20 md:py-24 bg-[#fefbec] border-y border-[#4c2f1a]/10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Grid asymmetrical */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative max-w-[340px] md:max-w-[380px] mx-auto">
              <div className="absolute inset-0 bg-[#4c2f1a]/5 border border-[#4c2f1a]/10 translate-x-2 -translate-y-2 sm:translate-x-4 sm:-translate-y-4 rounded-sm" />
              <div className="bg-[#fdfbf7] p-3 border border-[#4c2f1a]/15 shadow-xl rounded-sm relative">
                <div className="relative overflow-hidden rounded-sm h-[320px]">
                  <img
                    src="/about_photo.png"
                    alt="Escritório de Advocacia"
                    className="w-full h-full object-cover rounded-sm transition-all duration-700 transform hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copy texts */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a36c3b] font-semibold block mb-2">
              Diferenciais de Elite
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2c1b10] tracking-tight mb-6">
              Por Que Escolher o Dr. João Gonçalves?
            </h2>
            <p className="font-sans text-sm md:text-base text-[#2c1b10]/75 leading-relaxed mb-8">
              A advocacia moderna exige muito mais do que o conhecimento frio da legislação. Exige empatia para entender o momento sensível do cliente, rapidez para apresentar soluções eficientes e transparência total sobre o andamento de cada caso.
            </p>

            {/* List of differentials */}
            <div className="space-y-6 w-full">
              <div className="flex gap-4">
                <div className="bg-[#4c2f1a] w-10 h-10 rounded-sm text-[#d4af37] flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2c1b10]">Agilidade Local em Hidrolândia - CE</h4>
                  <p className="font-sans text-xs md:text-sm text-[#2c1b10]/70 mt-1 leading-relaxed">
                    Atuação focada e presencial em Hidrolândia, acompanhando de perto os trâmites jurídicos locais com máxima rapidez.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#4c2f1a] w-10 h-10 rounded-sm text-[#d4af37] flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2c1b10]">Excelência Reconhecida com 5 Estrelas</h4>
                  <p className="font-sans text-xs md:text-sm text-[#2c1b10]/70 mt-1 leading-relaxed">
                    Nossa reputação é construída no success de nossos clientes. Avaliações máximas que garantem nossa integridade técnica e ética.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#4c2f1a] w-10 h-10 rounded-sm text-[#d4af37] flex items-center justify-center shrink-0 shadow-sm">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2c1b10]">Atendimento Acolhedor e Humanizado</h4>
                  <p className="font-sans text-xs md:text-sm text-[#2c1b10]/70 mt-1 leading-relaxed">
                    Tiramos toda a complicação burocrática e conversamos de forma amigável, clara e prestativa em todas as etapas.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How it Works / Steps Section */}
      <section id="como-funciona" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#a36c3b] font-semibold block mb-2">
            Simplicidade no Atendimento
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2c1b10] tracking-tight mb-4">
            Como Iniciamos a Sua Defesa
          </h2>
          <p className="font-sans text-sm md:text-base text-[#2c1b10]/70 leading-relaxed">
            Eliminamos a complicação burocrática dos escritórios tradicionais. Em apenas três passos simples, você garante o suporte jurídico que necessita.
          </p>
        </div>

        {/* Steps Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-[#fdfbf7] p-8 border border-[#4c2f1a]/10 rounded-sm editorial-shadow flex flex-col items-center">
            <span className="font-serif text-5xl font-bold text-[#d4af37]/20 mb-4 block">01</span>
            <h4 className="font-serif text-xl font-bold text-[#2c1b10] mb-3">Contato Ágil</h4>
            <p className="font-sans text-sm text-[#2c1b10]/70 leading-relaxed">
              Você entra em contato preenchendo o formulário ou clicando no botão do WhatsApp. Nós responderemos em até 15 minutos para agendar uma conversa de forma rápida.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#fdfbf7] p-8 border border-[#4c2f1a]/10 rounded-sm editorial-shadow flex flex-col items-center">
            <span className="font-serif text-5xl font-bold text-[#d4af37]/20 mb-4 block">02</span>
            <h4 className="font-serif text-xl font-bold text-[#2c1b10] mb-3">Diagnóstico Cortesia</h4>
            <p className="font-sans text-sm text-[#2c1b10]/70 leading-relaxed">
              O Dr. João Gonçalves escutará a sua situação detalhadamente em uma Consulta Cortesia de Avaliação para entender a sua dor e desenhar a melhor tática.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#fdfbf7] p-8 border border-[#4c2f1a]/10 rounded-sm editorial-shadow flex flex-col items-center">
            <span className="font-serif text-5xl font-bold text-[#d4af37]/20 mb-4 block">03</span>
            <h4 className="font-serif text-xl font-bold text-[#2c1b10] mb-3">Solução Defensiva</h4>
            <p className="font-sans text-sm text-[#2c1b10]/70 leading-relaxed">
              Elaboramos e apresentamos a melhor defesa, contrato ou proposta sob medida, executando todas as ações com agilidade máxima para solucionar a questão com eficiência.
            </p>
          </div>

        </div>
      </section>

      {/* Testimonials Quotes Carousel/Grid Section */}
      <section id="depoimentos" className="py-20 md:py-24 bg-[#4c2f1a] text-[#fdfbf7] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
              Opinião de Quem Confia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#fdfbf7] tracking-tight mb-4">
              Histórias de Sucesso Reais
            </h2>
            <p className="font-sans text-sm text-[#fdfbf7]/80 leading-relaxed">
              Veja depoimentos de quem contratou os serviços do Dr. João Gonçalves em Natal - RN e recebeu um suporte jurídico ágil, protetor e extremamente acolhedor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonialsData.map((test) => (
              <div 
                key={test.id}
                className="bg-[#2c1b10] p-8 rounded-sm border border-[#fdfbf7]/10 relative flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#d4af37]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-base md:text-lg text-[#fdfbf7]/90 leading-relaxed mb-6">
                    "{test.text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-[#fdfbf7]/10 pt-4 mt-2">
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#d4af37]">{test.author}</h5>
                    <p className="font-sans text-[10px] uppercase tracking-wider text-[#fdfbf7]/60 mt-0.5">{test.role}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase bg-[#4c2f1a] text-[#d4af37] py-1 px-2.5 rounded-sm font-semibold border border-[#d4af37]/15">
                    <Check className="w-3 h-3" />
                    Cliente Verificado
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-[#fdfbf7]/75 font-sans">
              * Depoimentos baseados nas avaliações 5 estrelas obtidas organicamente no Google Maps.
            </p>
          </div>
        </div>
      </section>

      {/* Main Connection & Diagnostic Capture Form Section */}
      <section id="diagnostico-form" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left persuasiveness copy */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a36c3b] font-semibold block mb-2">
              Seu Suporte Próximo e Seguro
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2c1b10] tracking-tight mb-6">
              Pronto para dar o primeiro passo e proteger seus direitos?
            </h2>
            <p className="font-sans text-sm md:text-base text-[#2c1b10]/75 leading-relaxed mb-8">
              Entendemos que lidar com questões jurídicas pode causar ansiedade e preocupação. É por isso que desenhamos um processo de acolhimento focado em dar tranquilidade para você. Preencha os campos ao lado para dar início à sua avaliação cortesia rápida e humanizada.
            </p>

            <div className="space-y-4 w-full">
              <div className="p-4 bg-[#fefbec] border border-[#d4af37]/20 rounded-sm flex gap-3.5 items-start">
                <ShieldCheck className="w-5 h-5 text-[#a36c3b] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-serif font-bold text-sm text-[#2c1b10]">Privacidade Total dos Seus Dados</h5>
                  <p className="font-sans text-xs text-[#2c1b10]/70 mt-0.5 leading-relaxed">
                    Suas informações são tratadas sob estrito sigilo profissional (sigilo advogado-cliente) e em conformidade com a LGPD.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#fefbec] border border-[#d4af37]/20 rounded-sm flex gap-3.5 items-start">
                <Clock className="w-5 h-5 text-[#a36c3b] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-serif font-bold text-sm text-[#2c1b10]">Garantia de Resposta Ágil</h5>
                  <p className="font-sans text-xs text-[#2c1b10]/70 mt-0.5 leading-relaxed">
                    Nossa equipe se compromete a retornar o seu contato em até 15 minutos em horário comercial. Nada de dias esperando resposta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-6 w-full">
            <LeadForm 
              selectedService={selectedService} 
              onLeadSubmitted={handleLeadSubmitted}
              onRedirectBlocked={handleRedirectBlock}
            />
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-24 bg-[#fefbec] border-y border-[#4c2f1a]/10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a36c3b] font-semibold block mb-2">
              Quebra de Objeções Ativa
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2c1b10] tracking-tight mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="font-sans text-sm md:text-base text-[#2c1b10]/70 leading-relaxed">
              Encontre respostas para as perguntas mais comuns dos nossos clientes de forma transparente e rápida. Se ainda tiver dúvidas, clique em nos chamar no WhatsApp.
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* CTA Final Pre-footer banner */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="bg-[#4c2f1a] text-[#fdfbf7] p-8 md:p-12 rounded-sm border border-[#4c2f1a] editorial-shadow relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-[80px] -z-10" />
          
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
            Inicie Agora Sem Compromisso
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#fdfbf7] tracking-tight mb-6 max-w-xl mx-auto">
            Garante a melhor defesa com um atendimento de excelência.
          </h2>
          <p className="font-sans text-sm text-[#fdfbf7]/80 max-w-lg mx-auto leading-relaxed mb-8">
            Dê um basta na ansiedade e burocracia. Fale diretamente com o Dr. João Gonçalves no WhatsApp e entenda seus direitos de forma acolhedora.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => handleRedirectBlock(e, 'WhatsApp')}
              className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#b08d32] text-[#2c1b10] font-semibold uppercase tracking-wider text-xs py-4 px-8 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 text-center"
            >
              Falar com o Dr. João no WhatsApp
            </a>
            <button
              onClick={() => scrollToSection('diagnostico-form')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-[#fdfbf7] font-semibold uppercase tracking-wider text-xs py-3.5 px-8 border border-[#fdfbf7]/20 hover:border-[#fdfbf7]/40 rounded-sm transition-all duration-300 cursor-pointer"
            >
              Iniciar Diagnóstico de Avaliação
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#2c1b10] text-[#fdfbf7]/80 border-t border-[#fdfbf7]/5 pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Logo brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-[#d4af37]" />
              <span className="font-serif font-semibold text-lg text-[#fdfbf7] tracking-wide">
                Dr. João Gonçalves
              </span>
            </div>
            <p className="font-sans text-xs text-[#fdfbf7]/65 max-w-sm leading-relaxed mb-6">
              Escritório de advocacia humanizada focado em dar suporte jurídico rápido, acolhedor e transparente. Protegendo seu patrimônio e defendendo seus direitos contratuais, civis e trabalhistas em Hidrolândia - CE.
            </p>
            
            {/* Rating badge */}
            <div className="flex items-center gap-2 bg-[#4c2f1a] p-2.5 rounded-sm border border-[#fdfbf7]/5 text-xs">
              <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
              <span className="font-mono font-bold text-[#d4af37]">5.0</span>
              <span className="text-[#fdfbf7]/70 font-sans">Avaliação no Google Maps de Hidrolândia - CE e região</span>
            </div>
          </div>

          {/* Nav Links column */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h6 className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold mb-4">Atalhos</h6>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#solucoes" className="hover:text-white transition-colors">Nossas Soluções</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Diferenciais Competitivos</a></li>
              <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Opiniões de Clientes</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Contact Details column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h6 className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold mb-4">Fale Conosco</h6>
            <ul className="space-y-3 text-xs text-[#fdfbf7]/70">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <a 
                  href="tel:88992800454" 
                  onClick={(e) => handleRedirectBlock(e, 'Telefone Comercial')}
                  className="hover:text-white transition-colors"
                >
                  (88) 99280-0454
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] mt-0.5" />
                <span>Hidrolândia - CE. Atendimento presencial e nacional online de alta performance.</span>
              </li>
            </ul>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="mt-6 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#fdfbf7]/40 hover:text-[#d4af37] transition-colors border border-dashed border-[#fdfbf7]/15 hover:border-[#d4af37]/40 py-1.5 px-3 rounded-sm cursor-pointer"
            >
              <FileSpreadsheet className="w-3 h-3" />
              <span>Lead Inbox (Demonstração)</span>
            </button>
          </div>

        </div>

        {/* Legal block */}
        <div className="max-w-7xl mx-auto border-t border-[#fdfbf7]/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#fdfbf7]/45 font-mono">
          <p>© 2026 Dr. João Gonçalves Advocacia. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span>OAB/CE nº 98.765</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => alert('Termos de Uso e Política de Privacidade de acordo com a LGPD e o Código de Ética e Disciplina da OAB.')}>Termos & Privacidade</span>
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {isFloatVisible && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => handleRedirectBlock(e, 'WhatsApp Flutuante')}
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-white/10 group cursor-pointer"
          aria-label="Falar no WhatsApp"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-sans text-xs font-bold uppercase tracking-wider block">
            Dúvidas? Fale Conosco
          </span>
        </a>
      )}

      {/* Simulated Leads Manager Admin Modal */}
      <LeadsManager 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        leadsUpdatedTrigger={leadsTrigger}
      />

      {/* Premium Demo Mode Toast Alert */}
      <AnimatePresence>
        {demoToast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-24 right-6 left-6 md:left-auto md:max-w-md z-50 bg-[#2c1b10] border border-[#d4af37]/40 text-[#fdfbf7] p-4 rounded-sm shadow-2xl flex gap-3 items-start backdrop-blur-md"
          >
            <div className="bg-[#d4af37]/15 p-2 rounded-sm text-[#d4af37] shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
                🔒 Prévia Protegida
              </span>
              <p className="font-sans text-xs text-[#fdfbf7]/95 leading-relaxed">
                {demoToast.message}
              </p>
              <span className="font-mono text-[8px] text-[#fdfbf7]/50 block mt-2">
                Os visitantes permanecerão no site com total segurança.
              </span>
            </div>
            <button 
              onClick={() => setDemoToast(prev => ({ ...prev, visible: false }))}
              className="text-[#fdfbf7]/50 hover:text-[#fdfbf7] transition-colors shrink-0 -mt-1 -mr-1 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
