export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: 'Pendente' | 'Contatado' | 'Concluído';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  location: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
