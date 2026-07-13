import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border-b border-[#4c2f1a]/10 bg-[#fdfbf7]/50 rounded-sm overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between text-left py-5 px-6 font-serif text-base md:text-lg font-medium text-[#2c1b10] hover:text-[#a36c3b] transition-colors focus:outline-none select-none cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#4c2f1a]/60 shrink-0" />
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#4c2f1a]/60" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="pb-6 px-6 pl-14 font-sans text-sm md:text-base text-[#2c1b10]/85 leading-relaxed border-t border-[#4c2f1a]/5 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
