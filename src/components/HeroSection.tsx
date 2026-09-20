import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, GitCommit } from 'lucide-react';

interface HeroSectionProps {
  onOpenPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPortal }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-6 lg:px-12 border-b border-[#cecac8]"
    >
      {/* Soft atmospheric gradient wash behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[350px] pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full opacity-35 filter blur-[80px] bg-gradient-to-r from-[#ff9473] via-[#a0b5eb] to-[#a7fccd]" />
      </div>

      <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* Release Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#cecac8] bg-[#f6f3f1] mb-8 text-xs font-mono tracking-tight text-[#4e4d4d] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#2b59d1]"></span>
          <span className="text-[#242424] font-medium">CONNEXTIUM PROTOCOL</span>
          <span className="text-[#cecac8]">•</span>
          <span>FINUX LABS FLAGSHIP</span>
        </div>

        {/* Editorial Serif Display Headline - Locked at 400 weight */}
        <h1
          id="hero-headline"
          className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.12] text-[#242424] tracking-[-0.025em] max-w-[1000px] mb-8"
        >
          The Programmable Treasury & Settlement Fabric
        </h1>

        {/* Monospace Subtext - Technical Manual Character */}
        <p
          id="hero-subtext"
          className="font-mono text-base sm:text-lg md:text-xl text-[#4e4d4d] max-w-[700px] leading-[1.45] mb-12 tracking-[-0.015em]"
        >
          Operationalizing Finux Labs specs for enterprise ERP reconciliation, Verity 4-stage invoice verification, and instant multi-rail clearing.
        </p>

        {/* Centered Pill Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mb-16">
          <button
            id="hero-primary-cta"
            onClick={onOpenPortal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2b59d1] text-[#ffffff] hover:bg-[#244cb5] text-sm uppercase tracking-wider font-mono font-medium transition-all shadow-sm group"
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

        {/* Technical Architecture Metric Badges */}
        <div
          id="hero-metrics-strip"
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#cecac8]/60 text-left"
        >
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
            <div className="flex items-center gap-2 text-xs font-mono text-[#797776] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2b59d1]" />
              <span>Verity Engine</span>
            </div>
            <div className="font-editorial text-2xl text-[#242424]">4-Stage Consensus</div>
            <div className="text-[11px] font-mono text-[#4e4d4d]">Zero duplicate financing</div>
          </div>

          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
            <div className="flex items-center gap-2 text-xs font-mono text-[#797776] uppercase">
              <Zap className="w-3.5 h-3.5 text-[#2b59d1]" />
              <span>GTT API Hop</span>
            </div>
            <div className="font-editorial text-2xl text-[#242424]">&lt; 180ms Latency</div>
            <div className="text-[11px] font-mono text-[#4e4d4d]">Real-time ledger sync</div>
          </div>

          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
            <div className="flex items-center gap-2 text-xs font-mono text-[#797776] uppercase">
              <GitCommit className="w-3.5 h-3.5 text-[#2b59d1]" />
              <span>Interledger</span>
            </div>
            <div className="font-editorial text-2xl text-[#242424]">ILPv4 STREAM</div>
            <div className="text-[11px] font-mono text-[#4e4d4d]">Multi-rail clearing</div>
          </div>

          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
            <div className="flex items-center gap-2 text-xs font-mono text-[#797776] uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2b59d1]" />
              <span>Enterprise ERP</span>
            </div>
            <div className="font-editorial text-2xl text-[#242424]">Bi-directional</div>
            <div className="text-[11px] font-mono text-[#4e4d4d]">SAP, Oracle, NetSuite</div>
          </div>
        </div>
      </div>
    </section>
  );
};
