import React, { useState, useEffect } from 'react';
import { PIPELINE_NODES } from '../data/integrationData';
import { PipelineNode } from '../types';
import { Database, ShieldCheck, Landmark, Cpu, CreditCard, ArrowRight, Play, RotateCcw } from 'lucide-react';

export const PipelineDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(PIPELINE_NODES[1]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Auto-step simulation timer
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_NODES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const getNodeIcon = (type: PipelineNode['type']) => {
    switch (type) {
      case 'source':
        return <Database className="w-3.5 h-3.5 text-[#242424]" />;
      case 'verification':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#2b59d1]" />;
      case 'treasury':
        return <Landmark className="w-3.5 h-3.5 text-[#242424]" />;
      case 'settlement':
        return <Cpu className="w-3.5 h-3.5 text-[#242424]" />;
      case 'destination':
        return <CreditCard className="w-3.5 h-3.5 text-[#242424]" />;
    }
  };

  return (
    <section
      id="architecture"
      className="py-24 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
              IN-FLIGHT DATA & VALUE TRANSFORMS
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight">
              Deterministic pipeline from ERP invoice to instant multi-rail clearing.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="pipeline-toggle-sim-btn"
              onClick={() => setIsSimulating(!isSimulating)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#cecac8] bg-[#ffffff]/60 text-xs font-mono uppercase tracking-wider text-[#242424] hover:bg-[#ffffff] transition-all"
            >
              {isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#a7fccd] animate-pulse"></span>
                  <span>Streaming In-Flight</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#2b59d1]" />
                  <span>Resume Live Flow</span>
                </>
              )}
            </button>
            <button
              id="pipeline-reset-btn"
              onClick={() => setActiveStep(0)}
              title="Reset Flow"
              className="p-2 rounded-full border border-[#cecac8] text-[#797776] hover:text-[#242424] hover:bg-[#ffffff]/60 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Pipeline Canvas */}
        <div className="p-8 md:p-12 rounded-[40px] border border-[#cecac8] bg-[#f6f3f1] relative overflow-hidden shadow-sm">
          {/* Ambient center hub glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none -z-0 opacity-40 filter blur-[90px] bg-gradient-to-r from-[#a0b5eb] via-[#a7fccd] to-[#cfdaf5]"
            aria-hidden="true"
          />

          {/* Node Flow Track */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
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
                      className={`w-full text-left p-5 rounded-2xl md:rounded-[32px] border transition-all duration-200 relative group ${
                        isSelected
                          ? 'border-[#242424] bg-[#ffffff] shadow-md ring-1 ring-[#242424]'
                          : isCurrentActive
                          ? 'border-[#2b59d1] bg-[#ffffff]/90 shadow-sm'
                          : 'border-[#cecac8] bg-[#f6f3f1] hover:border-[#797776] hover:bg-[#ffffff]/50'
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
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1 rounded-full bg-[#f6f3f1] border border-[#cecac8]/60">
                          {getNodeIcon(node.type)}
                        </div>
                        <span className="font-mono text-xs uppercase font-medium text-[#242424] tracking-tight truncate">
                          {node.label}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-[#797776] truncate">
                        {node.sublabel}
                      </div>

                      {/* Active state badge */}
                      {isCurrentActive && (
                        <div className="mt-3 pt-2 border-t border-[#cecac8]/40 flex items-center gap-1.5 text-[10px] font-mono text-[#2b59d1]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1] animate-pulse"></span>
                          <span>Processing Packet</span>
                        </div>
                      )}
                    </button>

                    {/* Connector Arrow on Desktop */}
                    {index < PIPELINE_NODES.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#cecac8]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Node Spec Inspector */}
            <div className="mt-8 p-6 md:p-8 rounded-3xl border border-[#cecac8] bg-[#ffffff] relative z-10 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#cecac8]/60">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#cfdaf5] text-[#242424] text-xs font-mono font-medium tracking-tight">
                      {selectedNode.label}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#797776]">
                      {selectedNode.sublabel}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-[#4e4d4d] max-w-2xl">
                    {selectedNode.details}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="px-4 py-2 rounded-full border border-[#cecac8] bg-[#f6f3f1] flex flex-col">
                    <span className="text-[10px] uppercase text-[#797776]">VERIFICATION</span>
                    <span className="text-[#242424] font-medium uppercase">PROOF VERIFIED</span>
                  </div>
                  <div className="px-4 py-2 rounded-full border border-[#cecac8] bg-[#f6f3f1] flex flex-col">
                    <span className="text-[10px] uppercase text-[#797776]">ROUTING</span>
                    <span className="text-[#2b59d1] font-medium">ATOMIC STREAM</span>
                  </div>
                </div>
              </div>

              {/* Data payload preview for selected stage */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">PAYLOAD HASH</span>
                  <span className="text-[#242424] font-medium">0x8f2a93c7...e4b1</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">ERP ANCHOR</span>
                  <span className="text-[#242424] font-medium">SAP_S4_INV_2026_09884</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/40">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">SETTLEMENT ENGINE</span>
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
