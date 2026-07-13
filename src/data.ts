import { ServiceItem, Testimonial, FAQItem } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'civil-familia',
    title: 'Defesa e Proteção Patrimonial (Civil e Sucessões)',
    description: 'Garanta a segurança jurídica dos bens da sua família. Planejamento sucessório inteligente, inventários ágeis e assessoria familiar acolhedora para evitar conflitos desgastantes.',
    iconName: 'Shield'
  },
  {
    id: 'trabalhista-previdenciario',
    title: 'Direitos do Trabalhador & Previdência',
    description: 'Suporte completo para garantir a sua aposentadoria ou recuperar verbas trabalhistas de direito. Uma análise humanizada, minuciosa e sem complicação burocrática.',
    iconName: 'Scale'
  },
  {
    id: 'contratos-conflitos',
    title: 'Resolução de Conflitos e Contratos Seguros',
    description: 'Elaboração e revisão de contratos imobiliários e comerciais blindados, além de divórcios e mediações rápidas, priorizando soluções amigáveis para evitar litígios lentos.',
    iconName: 'FileText'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'dep-1',
    author: 'David Rodrigues',
    role: 'Cliente de Hidrolândia - CE',
    text: 'Melhor escritório e advogado da região. O Dr. João Gonçalves foi extremamente solícito, explicou tudo de forma humana e descomplicada. Resolveu meu caso com muita agilidade e competência.',
    rating: 5,
    location: 'Hidrolândia - CE'
  },
  {
    id: 'dep-2',
    author: 'Tatyane Nascimento',
    role: 'Profissional Autônoma',
    text: 'Estava muito preocupada com uma pendência burocrática, mas o Dr. João me acolheu com enorme empatia e cuidado. Atendimento rápido pelo WhatsApp e solução rápida. Recomendo de olhos fechados!',
    rating: 5,
    location: 'Hidrolândia - CE'
  }
];

export const faqData: FAQItem[] = [
  {
    question: 'Quanto custa para realizar uma consulta de avaliação?',
    answer: 'A nossa primeira consulta para diagnóstico do seu caso é uma Consulta Cortesia de Avaliação, oferecida sem custos e sem compromisso. Nosso objetivo é entender sua dor primeiro e apresentar a melhor solução jurídica.'
  },
  {
    question: 'Como funciona o processo de agendamento e atendimento?',
    answer: 'É extremamente simples. Você clica em qualquer botão de CTA na página para falar diretamente no nosso WhatsApp. Respondemos em até 15 minutos, agendamos um horário presencial ou online e tiramos suas dúvidas iniciais de imediato.'
  },
  {
    question: 'O Dr. João Gonçalves atende presencialmente em Hidrolândia - CE?',
    answer: 'Sim! Prestamos atendimento presencial e consultoria com foco em Hidrolândia - CE, além de todo o suporte digital ágil para clientes de outras localidades próximas com o máximo de segurança jurídica e sem burocracia.'
  },
  {
    question: 'Quais documentos preciso preparar para a avaliação do meu caso?',
    answer: 'Para o primeiro contato, você não precisa se preocupar com pilhas de papéis. Basta nos relatar brevemente a sua situação no WhatsApp. Se for necessário analisar contratos, termos ou certidões, orientaremos você de forma clara de como nos enviar digitalmente.'
  }
];
