import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      id="announcement-bar"
      className="w-full bg-[#000000] text-[#f6f3f1] py-2.5 px-4 text-xs tracking-tight border-b border-[#242424] flex items-center justify-between z-50 relative"
    >
      <div className="max-w-[1432px] mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#242424] text-[#cfdaf5] text-[11px] font-medium tracking-normal border border-[#4e4d4d]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a7fccd] animate-pulse"></span>
            SIGNAL SPEC 2026.07
          </span>
          <span className="text-[#cecac8] hidden sm:inline">
            Finux Labs releases GTT Business Client API & Verity Core for enterprise integration.
          </span>
          <span className="text-[#cecac8] sm:hidden">
            GTT Business Client API & Verity Core live on Echo.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            id="announcement-link"
            href="#integrations"
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#f6f3f1] hover:text-[#a0b5eb] border border-white/20 px-3 py-1 rounded-full transition-colors"
          >
            <span>Read Specs</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <button
            id="announcement-close-btn"
            onClick={() => setVisible(false)}
            aria-label="Dismiss announcement"
            className="text-[#797776] hover:text-[#f6f3f1] transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
