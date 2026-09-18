import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f6f3f1] border-t border-[#cecac8] pt-20 pb-16 px-6 lg:px-12 text-[#242424]">
      <div className="max-w-[1432px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#cecac8]/60">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#242424] flex items-center justify-center text-[#f6f3f1] font-mono text-xs font-semibold">
                C
              </div>
              <span className="font-editorial text-2xl tracking-tight text-[#242424]">
                Connextium<span className="text-[#2b59d1]">.xyz</span>
              </span>
            </div>

            <p className="font-mono text-xs text-[#4e4d4d] leading-relaxed max-w-sm">
              Flagship implementation of Finux Labs specifications—modernizing supply chain finance,
              trade treasury, and multi-rail packet settlement for global enterprise commerce.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff] border border-[#cecac8] text-[#242424]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a7fccd] animate-pulse"></span>
                ECHO MESH: HEALTHY
              </span>
              <span className="text-[#797776]">BUILD: MVP-2026.07.03</span>
            </div>
          </div>

          {/* Col 1: Protocol Pillars */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#797776] block">
              PILLARS
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#integrations" className="text-[#4e4d4d] hover:text-[#242424] transition-colors">
                  GTT Explorer (ADA Accounts)
                </a>
              </li>
              <li>
                <a href="#integrations" className="text-[#4e4d4d] hover:text-[#242424] transition-colors">
                  Verity SCF Blueprint
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-[#4e4d4d] hover:text-[#242424] transition-colors">
                  Interledger Clearing Gateway
                </a>
              </li>
              <li>
                <a href="#integrations" className="text-[#4e4d4d] hover:text-[#242424] transition-colors">
                  CDSC Factoring Chapter
                </a>
              </li>
              <li>
                <a href="#features" className="text-[#4e4d4d] hover:text-[#242424] transition-colors">
                  Agentic Finance Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Integrations */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#797776] block">
              CONNECTORS
            </span>
            <ul className="space-y-2">
              <li>
                <span className="text-[#4e4d4d]">SAP S/4HANA OData</span>
              </li>
              <li>
                <span className="text-[#4e4d4d]">Oracle ERP Cloud REST</span>
              </li>
              <li>
                <span className="text-[#4e4d4d]">NetSuite SuiteScript</span>
              </li>
              <li>
                <span className="text-[#4e4d4d]">SEPA Instant / FedNow</span>
              </li>
              <li>
                <span className="text-[#4e4d4d]">ISO 20022 camt.053</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Specs */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#797776] block">
              FINUX LABS
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://finuxlabs.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4e4d4d] hover:text-[#2b59d1] flex items-center gap-1 transition-colors"
                >
                  <span>Tech Portal Signal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://finuxlabs.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4e4d4d] hover:text-[#2b59d1] flex items-center gap-1 transition-colors"
                >
                  <span>Echo Developer Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/finuxlabs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4e4d4d] hover:text-[#2b59d1] flex items-center gap-1 transition-colors"
                >
                  <span>GitHub Repository</span>
                  <Github className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://interledger.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4e4d4d] hover:text-[#2b59d1] flex items-center gap-1 transition-colors"
                >
                  <span>Interledger.org Spec</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#797776]">
          <div>
            © 2026 Finux Labs / Connextium.xyz. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Cryptographic Proof Engine</span>
            <span>•</span>
            <span>Zero-Knowledge Audit</span>
            <span>•</span>
            <span>Apache 2.0 / Open Spec</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
