import React, { useState, useEffect } from 'react';
import { PIPELINE_NODES } from '../data/integrationData';
import { PipelineNode } from '../types';
import { Database, ShieldCheck, Landmark, Cpu, CreditCard, ArrowRight, Play, RotateCcw, Binary } from 'lucide-react';

export const PipelineDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(PIPELINE_NODES[1]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Auto-step simulation timer
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_NODES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const getNodeIcon = (type: PipelineNode['type']) => {
    switch (type) {
      case 'source':
        return <Database className="w-4 h-4 text-[#242424]" />;
      case 'verification':
        return <ShieldCheck className="w-4 h-4 text-[#2b59d1]" />;
      case 'treasury':
        return <Landmark className="w-4 h-4 text-[#242424]" />;
      case 'settlement':
        return <Cpu className="w-4 h-4 text-[#242424]" />;
      case 'destination':
        return <CreditCard className="w-4 h-4 text-[#242424]" />;
    }
  };

  const getStageFormula = (index: number) => {
    switch (index) {
      case 0:
        return 'Ingest : PO + INV → Hash';
      case 1:
        return 'Consensus : 4-Eyes Lock';
      case 2:
        return 'Treasury : Balance Invariant';
      case 3:
        return 'Router : Stream Hop < 85ms';
      case 4:
        return 'Settlement : Instant DvP';
      default:
        return 'State : Synced';
    }
  };

  return (
    <section
      id="architecture"
      className="py-28 md:py-36 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
              IN-FLIGHT PROTOCOL STATE TRANSFORMS
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight">
              Deterministic pipeline from ERP invoice to instant multi-rail clearing.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="pipeline-toggle-sim-btn"
              onClick={() => setIsSimulating(!isSimulating)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#cecac8] bg-[#ffffff] text-xs font-mono uppercase tracking-wider text-[#242424] hover:border-[#797776] transition-all shadow-xs"
            >
              {isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>Streaming In-Flight</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#2b59d1]" />
                  <span>Resume Live Flow</span>
                </>
              )}
            </button>
            <button
              id="pipeline-reset-btn"
              onClick={() => setActiveStep(0)}
              title="Reset Flow"
              className="p-2.5 rounded-full border border-[#cecac8] bg-[#ffffff] text-[#797776] hover:text-[#242424] hover:border-[#797776] transition-all shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Pipeline Canvas */}
        <div className="p-8 md:p-14 rounded-[40px] border border-[#cecac8] bg-[#f6f3f1] relative overflow-hidden shadow-xs">
          {/* Node Flow Track */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative">
              {PIPELINE_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const isCurrentActive = activeStep === index;

                return (
                  <div key={node.id} className="relative flex flex-col items-center">
                    {/* Node Button */}
                    <button
                      id={`pipeline-node-${node.id}`}
                      onClick={() => {
                        setSelectedNode(node);
                        setActiveStep(index);
                        setIsSimulating(false);
                      }}
                      className={`w-full text-left p-6 rounded-[28px] border transition-all duration-200 relative group ${
                        isSelected
                          ? 'border-[#242424] bg-[#ffffff] shadow-md ring-1 ring-[#242424]'
                          : isCurrentActive
                          ? 'border-[#2b59d1] bg-[#ffffff]/90 shadow-xs'
                          : 'border-[#cecac8] bg-[#ffffff]/60 hover:border-[#797776] hover:bg-[#ffffff]'
                      }`}
                    >
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776]">
                          STAGE 0{index + 1}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCurrentActive
                              ? 'bg-[#2b59d1] animate-ping'
                              : isSelected
                              ? 'bg-[#242424]'
                              : 'bg-[#cecac8]'
                          }`}
                        />
                      </div>

                      {/* Node Label & Icon */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-full bg-[#f6f3f1] border border-[#cecac8]/60">
                          {getNodeIcon(node.type)}
                        </div>
                        <span className="font-mono text-xs uppercase font-medium text-[#242424] tracking-tight truncate">
                          {node.label}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-[#797776] truncate mb-3">
                        {node.sublabel}
                      </div>

                      {/* Protocol State Transform Formula */}
                      <div className="text-[10px] font-mono px-2.5 py-1.5 rounded-xl bg-[#f6f3f1] border border-[#cecac8]/60 text-[#2b59d1] font-medium truncate">
                        {getStageFormula(index)}
                      </div>
                    </button>

                    {/* Connector Arrow on Desktop */}
                    {index < PIPELINE_NODES.length - 1 && (
                      <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#cecac8]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Node Spec Inspector */}
            <div className="mt-10 p-8 md:p-10 rounded-[32px] border border-[#cecac8] bg-[#ffffff] relative z-10 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#cecac8]/60">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#cfdaf5] text-[#242424] text-xs font-mono font-medium tracking-tight">
                      {selectedNode.label}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#797776]">
                      {selectedNode.sublabel}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-[#4e4d4d] max-w-2xl leading-relaxed">
                    {selectedNode.details}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="px-4 py-2 rounded-full border border-[#cecac8] bg-[#f6f3f1]">
                    <span className="text-[10px] uppercase text-[#797776] block">STATE VALIDATION</span>
                    <span className="text-[#242424] font-medium uppercase">INVARIANT VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Data payload preview for selected stage */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">STATE HASH (DIGEST)</span>
                  <span className="text-[#242424] font-medium">0x8f2a93c7...e4b1</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">ERP ANCHOR TENSOR</span>
                  <span className="text-[#242424] font-medium">SAP_S4_INV_2026_09884</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">FORMAL ENGINE</span>
                  <span className="text-[#2b59d1] font-medium">ILP_STREAM_ISO20022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
