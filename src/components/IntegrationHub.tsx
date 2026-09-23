import React, { useState } from 'react';
import { INTEGRATION_MODULES } from '../data/integrationData';
import { IntegrationModule } from '../types';
import { Terminal, Copy, Check, Play, Shield, Cpu, RefreshCw, Layers, Binary, Code2 } from 'lucide-react';
import { MathDiagram } from './MathDiagram';

export const IntegrationHub: React.FC = () => {
  const [activeModule, setActiveModule] = useState<IntegrationModule>(INTEGRATION_MODULES[0]);
  const [viewMode, setViewMode] = useState<'math' | 'code'>('math');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<{
    status: string;
    latency: string;
    hash: string;
    timestamp: string;
  } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeModule.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setIsExecuting(true);
    setExecutionResult(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        status: '200 OK — ANCHOR VERIFIED & CAPITAL ALLOCATED',
        latency: activeModule.latency,
        hash: `cnx_${Math.random().toString(16).substring(2, 10)}_${Date.now().toString(16)}`,
        timestamp: new Date().toISOString()
      });
    }, 600);
  };

  return (
    <section
      id="integrations"
      className="py-28 md:py-36 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
            PROGRAMMATIC ARCHITECTURE & SCHEMATICS
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight mb-4">
            Unified architectural interfaces for enterprise clearing rails.
          </h2>
          <p className="font-mono text-base text-[#4e4d4d] leading-relaxed">
            Rigorous topological state machines, bilinear balance conservation invariants, and discrete packet stream calculus linking accounts payable to multi-rail settlement.
          </p>
        </div>

        {/* Integration Modules Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {INTEGRATION_MODULES.map((module) => {
            const isActive = activeModule.id === module.id;
            return (
              <button
                key={module.id}
                id={`integration-tab-${module.id}`}
                onClick={() => {
                  setActiveModule(module);
                  setExecutionResult(null);
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'border-[#242424] bg-[#ffffff] shadow-sm ring-1 ring-[#242424]'
                    : 'border-[#cecac8] bg-[#f6f3f1] hover:border-[#797776] hover:bg-[#ffffff]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776]">
                    {module.tag}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]" />}
                </div>
                <span className="font-editorial text-lg text-[#242424] block leading-tight">
                  {module.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Integration Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Spec & Features Column (4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-[40px] border border-[#cecac8] bg-[#ffffff] shadow-xs space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#cfdaf5] text-[#242424] text-[11px] font-mono font-medium tracking-tight mb-3">
                {activeModule.tag}
              </span>
              <h3 className="font-editorial text-3xl text-[#242424] font-normal leading-tight mb-3">
                {activeModule.name}
              </h3>
              <p className="font-mono text-sm text-[#4e4d4d] leading-relaxed mb-6">
                {activeModule.fullDesc}
              </p>
            </div>

            {/* Protocol & Latency Badges */}
            <div className="space-y-4 pt-4 border-t border-[#cecac8]/60 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-[#797776] block mb-2 font-semibold">
                  PROTOCOLS & INTERFACES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModule.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="px-2.5 py-1 rounded-full border border-[#cecac8] bg-[#f6f3f1] text-[#242424]"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#797776] block mb-2 font-semibold">
                  ERP & TMS COMPATIBILITY
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModule.erpCompatibility.map((erp) => (
                    <span
                      key={erp}
                      className="px-2.5 py-1 rounded-full border border-[#cecac8] bg-[#f6f3f1] text-[#4e4d4d]"
                    >
                      {erp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase text-[#797776] mb-1">
                    <Cpu className="w-3.5 h-3.5 text-[#2b59d1]" />
                    <span>LATENCY</span>
                  </div>
                  <div className="text-sm text-[#242424] font-medium">{activeModule.latency}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase text-[#797776] mb-1">
                    <Shield className="w-3.5 h-3.5 text-[#2b59d1]" />
                    <span>SECURITY</span>
                  </div>
                  <div className="text-sm text-[#242424] font-medium truncate">{activeModule.security}</div>
                </div>
              </div>
            </div>

            {/* Test Action */}
            <div className="pt-2">
              <button
                id="btn-simulate-api-execution"
                onClick={handleSimulate}
                disabled={isExecuting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#242424] text-[#ffffff] hover:bg-[#000000] text-xs uppercase tracking-wider font-mono font-medium transition-all shadow-xs"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#a7fccd]" />
                    <span>Computing Invariant Verification...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#a7fccd]" />
                    <span>Simulate Protocol Verification</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Architecture Schematic Diagram (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* View Switcher Strip */}
            <div className="p-2 rounded-2xl border border-[#cecac8] bg-[#ffffff] flex items-center justify-between font-mono text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <button
                  id="view-toggle-math"
                  onClick={() => setViewMode('math')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-medium ${
                    viewMode === 'math'
                      ? 'bg-[#242424] text-[#ffffff] shadow-xs'
                      : 'text-[#4e4d4d] hover:text-[#242424] hover:bg-[#f6f3f1]'
                  }`}
                >
                  <Binary className="w-3.5 h-3.5 text-[#a7fccd]" />
                  <span>Architecture Schematic Diagram</span>
                </button>

                <button
                  id="view-toggle-code"
                  onClick={() => setViewMode('code')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-medium ${
                    viewMode === 'code'
                      ? 'bg-[#242424] text-[#ffffff] shadow-xs'
                      : 'text-[#4e4d4d] hover:text-[#242424] hover:bg-[#f6f3f1]'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-[#cfdaf5]" />
                  <span>Wire Protocol Code</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[#797776] text-[11px] pr-3">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <span>SCHEMATIC V2.4</span>
              </div>
            </div>

            {/* Main Content Area */}
            {viewMode === 'math' ? (
              <div className="p-8 md:p-10 rounded-[40px] border border-[#cecac8] bg-[#ffffff] shadow-xs">
                <MathDiagram moduleId={activeModule.id} isExecuting={isExecuting} />

                {/* Live Execution Output Drawer if executed */}
                {executionResult && (
                  <div className="mt-8 pt-6 border-t border-[#cecac8] animate-fadeIn">
                    <div className="flex items-center justify-between text-xs font-mono mb-3">
                      <span className="text-[#2b59d1] font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                        {executionResult.status}
                      </span>
                      <span className="text-[#797776]">{executionResult.latency}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#000000] font-mono text-xs space-y-1.5 text-[#cecac8]">
                      <div>
                        <span className="text-[#797776]">WITNESS PROOF: </span>
                        <span className="text-[#cfdaf5]">{executionResult.hash}</span>
                      </div>
                      <div>
                        <span className="text-[#797776]">INVARIANT: </span>
                        <span className="text-[#a7fccd]">STRICT_CONSERVATION_HOLDS (Δℒ ≡ 0)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 md:p-10 rounded-[40px] border border-[#cecac8] bg-[#000000] text-[#f6f3f1] shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#242424] mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff9473]/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ecda98]/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#a7fccd]/80 inline-block" />
                    </div>
                    <span className="text-xs font-mono text-[#797776] ml-2">
                      {activeModule.codeSnippet.filename}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase text-[#797776] px-2 py-0.5 rounded bg-[#242424]">
                      {activeModule.codeSnippet.language}
                    </span>
                    <button
                      id="btn-copy-code"
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg text-[#cecac8] hover:text-[#ffffff] hover:bg-[#242424] transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#a7fccd]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <pre className="font-mono text-xs md:text-sm text-[#cecac8] overflow-x-auto leading-relaxed max-h-[380px] p-2 select-all">
                  <code>{activeModule.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
