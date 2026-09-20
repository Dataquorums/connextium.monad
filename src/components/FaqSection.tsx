import React, { useState } from 'react';
import { TECHNICAL_FAQS } from '../data/integrationData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
            FREQUENTLY ASKED
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight">
            Integration, guarantees, and protocol specifications.
          </h2>
        </div>

        {/* Monad-style FAQ Accordion Rows */}
        <div className="divide-y divide-[#cecac8] border-t border-[#cecac8]">
          {TECHNICAL_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="py-8 md:py-10 transition-colors"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full text-left flex items-start justify-between gap-6 focus:outline-none group"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#797776] block">
                      {faq.category}
                    </span>
                    <span className="font-editorial text-2xl md:text-[28px] text-[#242424] font-normal leading-snug group-hover:text-[#2b59d1] transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div className="p-2 rounded-full border border-[#cecac8] shrink-0 text-[#242424] group-hover:border-[#242424] transition-all mt-1">
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2b59d1]' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-6 pr-12 animate-fadeIn">
                    <p className="font-mono text-sm sm:text-base text-[#4e4d4d] leading-relaxed max-w-4xl">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
