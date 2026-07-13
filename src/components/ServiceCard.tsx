import React from 'react';
import { Shield, Scale, FileText, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { motion } from 'motion/react';

interface ServiceCardProps {
  key?: string;
  service: ServiceItem;
  onSelect: () => void;
}

export default function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const renderIcon = () => {
    switch (service.iconName) {
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#a36c3b]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#a36c3b]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#a36c3b]" />;
      default:
        return <Scale className="w-6 h-6 text-[#a36c3b]" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-[#fdfbf7] p-8 rounded-sm border border-[#4c2f1a]/10 flex flex-col justify-between h-full editorial-shadow group cursor-pointer"
      onClick={onSelect}
    >
      <div>
        <div className="bg-[#fefbec] w-12 h-12 flex items-center justify-center rounded-sm border border-[#d4af37]/20 mb-6 group-hover:bg-[#d4af37]/10 transition-colors duration-300">
          {renderIcon()}
        </div>
        <h3 className="font-serif text-xl font-semibold text-[#2c1b10] mb-3 leading-snug group-hover:text-[#a36c3b] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="font-sans text-sm text-[#2c1b10]/75 leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-[#4c2f1a]/5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4c2f1a] group-hover:text-[#a36c3b] transition-colors duration-300">
        <span>Solicitar esta Solução</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}
