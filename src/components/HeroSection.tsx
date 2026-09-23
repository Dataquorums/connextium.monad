import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, GitCommit, Binary } from 'lucide-react';

interface HeroSectionProps {
  onOpenPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPortal }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-32 md:pt-36 md:pb-40 px-6 lg:px-12 border-b border-[#cecac8]"
    >
      {/* Soft atmospheric gradient wash behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[350px] pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full opacity-35 filter blur-[80px] bg-gradient-to-r from-[#ff9473] via-[#a0b5eb] to-[#a7fccd]" />
      </div>

      <div className="max-w-[1140px] mx-auto text-center flex flex-col items-center">
        {/* Release Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#cecac8] bg-[#f6f3f1] mb-8 text-xs font-mono tracking-tight text-[#4e4d4d] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#2b59d1]"></span>
          <span className="text-[#242424] font-medium">CONNEXTIUM PROTOCOL</span>
        </div>

        {/* Simplified Symbolic Pipeline Badge */}
        <div className="mb-8 px-5 py-2.5 rounded-2xl bg-[#ffffff]/90 border border-[#cecac8] text-xs font-mono text-[#242424] inline-flex items-center gap-2.5 shadow-xs flex-wrap justify-center">
          <Binary className="w-3.5 h-3.5 text-[#2b59d1]" />
          <span className="flex items-center gap-1.5 font-medium">
            <span>ERP Invoice</span>
            <span className="text-[#2b59d1]">→</span>
            <span>Verity Consensus</span>
            <span className="text-[#2b59d1]">→</span>
            <span>ILP Stream</span>
            <span className="text-[#10b981]">→</span>
            <span className="text-[#10b981] font-semibold">Instant Settlement</span>
          </span>
          <span className="text-[#cecac8]">|</span>
          <span className="text-[#797776]">Δt &lt; 180ms</span>
        </div>

        {/* Editorial Serif Display Headline */}
        <h1
          id="hero-headline"
          className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[1.1] text-[#242424] tracking-[-0.025em] max-w-[1040px] mb-8"
        >
          The Programmable Treasury & Settlement Fabric
        </h1>

        {/* Monospace Subtext */}
        <p
          id="hero-subtext"
          className="font-mono text-base sm:text-lg md:text-xl text-[#4e4d4d] max-w-[720px] leading-[1.5] mb-14 tracking-[-0.015em]"
        >
          Operationalizing Finux Labs specifications for enterprise ERP reconciliation, Verity 4-stage invoice consensus, and instant multi-rail clearing.
        </p>

        {/* Centered Pill Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mb-20">
          <button
            id="hero-primary-cta"
            onClick={onOpenPortal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2b59d1] text-[#ffffff] hover:bg-[#244cb5] text-sm uppercase tracking-wider font-mono font-medium transition-all shadow-xs group"
          >
            <span>Explore Integration APIs</span>
            <span className="group-hover:translate-x-0.5 transition-transform">▸</span>
          </button>

          <a
            id="hero-secondary-cta"
            href="#integrations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#242424] text-[#242424] hover:bg-[#242424] hover:text-[#f6f3f1] text-sm uppercase tracking-wider font-mono font-medium transition-all"
          >
            <span>View Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Spacious Metric Row */}
        <div
          id="hero-metrics-strip"
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#cecac8]/60 text-left"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#797776] uppercase">Consensus</span>
            <div className="font-editorial text-3xl text-[#242424]">4-Stage</div>
            <div className="text-xs font-mono text-[#4e4d4d]">Zero duplicate financing</div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#797776] uppercase">Latency</span>
            <div className="font-editorial text-3xl text-[#242424]">&lt; 180ms</div>
            <div className="text-xs font-mono text-[#4e4d4d]">Real-time ledger sync</div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#797776] uppercase">Protocol</span>
            <div className="font-editorial text-3xl text-[#242424]">ILPv4</div>
            <div className="text-xs font-mono text-[#4e4d4d]">Continuous value stream</div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#797776] uppercase">ERP Ingest</span>
            <div className="font-editorial text-3xl text-[#242424]">Two-Way</div>
            <div className="text-xs font-mono text-[#4e4d4d]">SAP & Oracle GL sync</div>
          </div>
        </div>
      </div>
    </section>
  );
};
