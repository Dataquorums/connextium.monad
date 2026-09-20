import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowUpRight, BookOpen, GitBranch, Shield, Landmark } from 'lucide-react';

export const DocsQuickstart: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const SPEC_LINKS = [
    {
      title: 'Global Trade Treasury: GTT Explorer',
      category: 'SUPPLY CHAIN FINANCE',
      desc: 'On-chain Accounts of Digital Assets (ADA) and automated accounting.',
      icon: <Landmark className="w-4 h-4 text-[#2b59d1]" />,
      url: 'https://finuxlabs.github.io/'
    },
    {
      title: 'Verity: Capital Due Value Blueprint',
      category: 'ENTERPRISE CONSENSUS',
      desc: 'Resolving commercial value before capital release across ERP invoices.',
      icon: <Shield className="w-4 h-4 text-[#2b59d1]" />,
      url: 'https://finuxlabs.github.io/'
    },
    {
      title: 'Interledger Portal Hub & Node Spec',
      category: 'ILP PROTOCOL',
      desc: 'ILP node architectures, clearing mechanics, and cross-rail packet routing.',
      icon: <GitBranch className="w-4 h-4 text-[#2b59d1]" />,
      url: 'https://finuxlabs.github.io/'
    },
    {
      title: 'CDSC Commerce & Factoring Model',
      category: 'STRUCTURED CLEARING',
      desc: 'Invoice submission, anchor confirmation, factoring, and swap mechanics.',
      icon: <BookOpen className="w-4 h-4 text-[#2b59d1]" />,
      url: 'https://finuxlabs.github.io/'
    }
  ];

  return (
    <section
      id="specs"
      className="py-24 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
            SPECIFICATIONS & SDK
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight mb-4">
            Production SDKs grounded in open standards.
          </h2>
          <p className="font-mono text-base text-[#4e4d4d]">
            Implementations of Finux Labs specifications. Install via npm or explore open standards.
          </p>
        </div>

        {/* 3-Step Quickstart Terminal Strip */}
        <div className="p-8 md:p-10 rounded-[40px] border border-[#cecac8] bg-[#ffffff] shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#cecac8]/60 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#797776] block mb-1">
                INTEGRATION IN THREE COMMANDS
              </span>
              <span className="font-editorial text-2xl text-[#242424]">
                Enterprise SDK Quickstart
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#797776]">SDK v2.4.0 (Stable)</span>
              <span className="w-2 h-2 rounded-full bg-[#a7fccd]"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-5 rounded-3xl border border-[#cecac8]/60 bg-[#f6f3f1] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776] block mb-2">
                  01. INSTALLATION
                </span>
                <p className="font-mono text-xs text-[#4e4d4d] mb-4">
                  Add the client SDK to your Node.js or TypeScript backend.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#000000] text-[#f6f3f1] font-mono text-xs flex items-center justify-between gap-2">
                <code className="text-[#cfdaf5] truncate">npm i @connextium/sdk</code>
                <button
                  onClick={() => handleCopy('npm i @connextium/sdk', 'step1')}
                  className="text-[#797776] hover:text-[#f6f3f1] shrink-0"
                >
                  {copiedCmd === 'step1' ? <Check className="w-3.5 h-3.5 text-[#a7fccd]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-3xl border border-[#cecac8]/60 bg-[#f6f3f1] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776] block mb-2">
                  02. CONFIGURE CREDENTIALS
                </span>
                <p className="font-mono text-xs text-[#4e4d4d] mb-4">
                  Export your Echo endpoint and API key.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#000000] text-[#f6f3f1] font-mono text-xs flex items-center justify-between gap-2">
                <code className="text-[#cfdaf5] truncate">export CNX_KEY="cnx_echo_..."</code>
                <button
                  onClick={() => handleCopy('export CNX_KEY="cnx_echo_..."', 'step2')}
                  className="text-[#797776] hover:text-[#f6f3f1] shrink-0"
                >
                  {copiedCmd === 'step2' ? <Check className="w-3.5 h-3.5 text-[#a7fccd]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-3xl border border-[#cecac8]/60 bg-[#f6f3f1] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776] block mb-2">
                  03. HOOK ERP LISTENER
                </span>
                <p className="font-mono text-xs text-[#4e4d4d] mb-4">
                  Mount the webhook listener for SAP/Oracle invoice events.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#000000] text-[#f6f3f1] font-mono text-xs flex items-center justify-between gap-2">
                <code className="text-[#cfdaf5] truncate">cnx listen --erp=sap_s4</code>
                <button
                  onClick={() => handleCopy('cnx listen --erp=sap_s4', 'step3')}
                  className="text-[#797776] hover:text-[#f6f3f1] shrink-0"
                >
                  {copiedCmd === 'step3' ? <Check className="w-3.5 h-3.5 text-[#a7fccd]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Finux Labs Specification Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEC_LINKS.map((spec, i) => (
            <a
              key={i}
              href={spec.url}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-[32px] border border-[#cecac8] bg-[#f6f3f1] hover:bg-[#ffffff] hover:border-[#797776] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-full bg-[#ffffff] border border-[#cecac8]/60 group-hover:border-[#2b59d1] transition-colors">
                    {spec.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#797776] group-hover:text-[#242424] transition-colors" />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776] block mb-1">
                  {spec.category}
                </span>
                <h4 className="font-editorial text-xl text-[#242424] font-normal leading-snug mb-3">
                  {spec.title}
                </h4>
                <p className="font-mono text-xs text-[#4e4d4d] leading-relaxed">
                  {spec.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#cecac8]/40 text-[11px] font-mono text-[#2b59d1] uppercase font-medium flex items-center gap-1">
                <span>Finux Labs Portal</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
