import React, { useState } from 'react';
import { Shield, ArrowRight, Zap, CheckCircle2, Lock, Activity, RefreshCw } from 'lucide-react';

interface MathDiagramProps {
  moduleId: string;
  isExecuting?: boolean;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({ moduleId, isExecuting = false }) => {
  const [activeParam, setActiveParam] = useState<string | null>(null);

  const renderDiagram = () => {
    switch (moduleId) {
      case 'gtt-api':
        return <GttTreasuryMathDiagram isExecuting={isExecuting} activeParam={activeParam} onHoverParam={setActiveParam} />;
      case 'verity-engine':
        return <VerityConsensusMathDiagram isExecuting={isExecuting} activeParam={activeParam} onHoverParam={setActiveParam} />;
      case 'ilp-gateway':
        return <IlpPacketStreamMathDiagram isExecuting={isExecuting} activeParam={activeParam} onHoverParam={setActiveParam} />;
      case 'cdsc-clearing':
        return <CdscDiscountMathDiagram isExecuting={isExecuting} activeParam={activeParam} onHoverParam={setActiveParam} />;
      default:
        return <GttTreasuryMathDiagram isExecuting={isExecuting} activeParam={activeParam} onHoverParam={setActiveParam} />;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {renderDiagram()}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. GTT Treasury API: Bilinear Balance Conservation & Sub-ledger Topology   */
/* -------------------------------------------------------------------------- */
const GttTreasuryMathDiagram: React.FC<{
  isExecuting: boolean;
  activeParam: string | null;
  onHoverParam: (p: string | null) => void;
}> = ({ isExecuting, activeParam, onHoverParam }) => {
  return (
    <div className="space-y-6">
      {/* Simplified Mathematical Formalism Header */}
      <div className="p-5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-[#797776] uppercase tracking-widest block mb-1">
            BALANCE INVARIANT (ZERO FLOAT NETTING)
          </span>
          <div className="text-sm md:text-base text-[#242424] font-medium tracking-tight overflow-x-auto whitespace-nowrap py-0.5">
            <span>∑ Debits (Treasury) + ∑ Credits (Supplier) ≡ </span>
            <span className="text-[#2b59d1] font-bold">0</span>
            <span className="text-[#797776] text-xs ml-2">[ Strict Balance Conservation ]</span>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cecac8] text-[11px] text-[#2b59d1] font-medium flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#2b59d1]"></span>
          <span>Zero Float Theorem</span>
        </div>
      </div>

      {/* Abstract Vector Topology Diagram */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ffffff] border border-[#cecac8] relative overflow-hidden shadow-xs">
        <svg viewBox="0 0 700 240" className="w-full h-auto select-none" aria-label="GTT Multilateral Ledger Topology">
          <defs>
            <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#2b59d1" />
            </marker>
            <marker id="arrow-dark" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#242424" />
            </marker>
            <pattern id="grid-dots-airy" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#cecac8" opacity="0.35" />
            </pattern>
          </defs>

          {/* Coordinate Grid Background */}
          <rect width="700" height="240" fill="url(#grid-dots-airy)" />

          {/* Coordinate Axis Line */}
          <line x1="50" y1="210" x2="650" y2="210" stroke="#cecac8" strokeWidth="1" strokeDasharray="4 4" />
          <text x="645" y="226" fill="#797776" fontSize="10" fontFamily="monospace" textAnchor="end">t (ms)</text>

          {/* Flow Stream Vectors */}
          <path
            d="M 140 120 C 220 40, 280 40, 350 120"
            fill="none"
            stroke="#2b59d1"
            strokeWidth="2.5"
            markerEnd="url(#arrow-blue)"
            strokeDasharray={isExecuting ? '6 4' : 'none'}
            className={isExecuting ? 'animate-pulse' : ''}
          />
          <path
            d="M 350 120 C 420 200, 480 200, 560 120"
            fill="none"
            stroke="#242424"
            strokeWidth="2"
            markerEnd="url(#arrow-dark)"
          />

          {/* Flux Label 1 */}
          <g transform="translate(245, 45)">
            <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#ffffff" stroke="#cfdaf5" strokeWidth="1" />
            <text x="0" y="4" textAnchor="middle" fill="#2b59d1" fontSize="10" fontFamily="monospace" fontWeight="bold">
              + $450,000 Alloc
            </text>
          </g>

          {/* Flux Label 2 */}
          <g transform="translate(455, 195)">
            <rect x="-70" y="-12" width="140" height="24" rx="12" fill="#ffffff" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="4" textAnchor="middle" fill="#242424" fontSize="10" fontFamily="monospace" fontWeight="bold">
              − $450,000 Payout
            </text>
          </g>

          {/* Treasury Root */}
          <g transform="translate(140, 120)">
            <circle r="26" fill="#f6f3f1" stroke="#242424" strokeWidth="2" />
            <circle r="5" fill="#242424" />
            <rect x="-55" y="-48" width="110" height="18" rx="6" fill="#ffffff" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="-35" textAnchor="middle" fill="#242424" fontSize="10" fontFamily="monospace" fontWeight="bold">
              T₀ : TREASURY
            </text>
            <text x="0" y="4" textAnchor="middle" fill="#797776" fontSize="9" fontFamily="monospace">
              ADA[0]
            </text>
          </g>

          {/* Liquidity Hub */}
          <g transform="translate(350, 120)">
            <circle r="32" fill="#cfdaf5" stroke="#2b59d1" strokeWidth="2" />
            <circle r="10" fill="#2b59d1" />
            <rect x="-70" y="-52" width="140" height="18" rx="6" fill="#ffffff" stroke="#cfdaf5" strokeWidth="1" />
            <text x="0" y="-39" textAnchor="middle" fill="#2b59d1" fontSize="10" fontFamily="monospace" fontWeight="bold">
              LIQUIDITY POOL
            </text>
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace">
              ADA Sync
            </text>
          </g>

          {/* Supplier Beneficiary */}
          <g transform="translate(560, 120)">
            <circle r="26" fill="#f6f3f1" stroke="#242424" strokeWidth="2" />
            <circle r="5" fill="#242424" />
            <rect x="-65" y="-48" width="130" height="18" rx="6" fill="#ffffff" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="-35" textAnchor="middle" fill="#242424" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Sₖ : SUPPLIER
            </text>
            <text x="0" y="4" textAnchor="middle" fill="#797776" fontSize="9" fontFamily="monospace">
              ADA[k]
            </text>
          </g>
        </svg>
      </div>

      {/* Illustrated Text Annotations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            01. BILINEAR BALANCE CONSERVATION
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Every allocation vector from root treasury <span className="text-[#242424] font-semibold">T₀</span> is matched with an identical entry in supplier account <span className="text-[#242424] font-semibold">Sₖ</span>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            02. ATOMIC LIQUIDITY NETTING
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Liquidity pool executes settlement in &lt;180ms with immediate automatic writeback to SAP BKPF/BSEG financial tables.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Verity Engine: 4-Stage State Consensus Automaton                       */
/* -------------------------------------------------------------------------- */
const VerityConsensusMathDiagram: React.FC<{
  isExecuting: boolean;
  activeParam: string | null;
  onHoverParam: (p: string | null) => void;
}> = ({ isExecuting, activeParam, onHoverParam }) => {
  return (
    <div className="space-y-6">
      {/* Simplified Mathematical Formalism Header */}
      <div className="p-5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-[#797776] uppercase tracking-widest block mb-1">
            4-STAGE CONSENSUS PIPELINE
          </span>
          <div className="text-sm md:text-base text-[#242424] font-medium tracking-tight overflow-x-auto whitespace-nowrap py-0.5">
            <span>[ ERP Digest ]</span>
            <span className="text-[#2b59d1] mx-1.5">→</span>
            <span>[ 4-Eyes Consensus ]</span>
            <span className="text-[#2b59d1] mx-1.5">→</span>
            <span className="text-[#2b59d1] font-bold">[ Capital Due ]</span>
            <span className="text-[#10b981] mx-1.5">→</span>
            <span className="text-[#10b981] font-bold">[ Atomic Release ]</span>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cecac8] text-[11px] text-[#2b59d1] font-medium flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs">
          <Shield className="w-3.5 h-3.5" />
          <span>Zero Duplicate Theorem</span>
        </div>
      </div>

      {/* Abstract State Automaton SVG Diagram with Clear Directed Flow */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ffffff] border border-[#cecac8] relative overflow-hidden shadow-xs">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#797776] mb-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2b59d1]"></span>
            <span>CONSENSUS PROGRESSION RAIL</span>
          </span>
          <span className="text-[#2b59d1] font-medium">
            {isExecuting ? 'STATUS: EXECUTING STAGE 04 DvP' : 'STATUS: STAGE 03 CAPITAL DUE LOCKED'}
          </span>
        </div>

        <svg viewBox="0 0 700 230" className="w-full h-auto select-none" aria-label="Verity 4-Stage State Consensus Automaton">
          <defs>
            <marker id="arrow-blue-verity" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#2b59d1" />
            </marker>
            <marker id="arrow-gray-verity" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#a0b5eb" />
            </marker>
            <marker id="arrow-green-verity" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Segment 1: Stage 01 -> Stage 02 (Active Verified Flow) */}
          <line
            x1="115"
            y1="110"
            x2="230"
            y2="110"
            stroke="#2b59d1"
            strokeWidth="3"
            markerEnd="url(#arrow-blue-verity)"
          />
          <g transform="translate(172, 92)">
            <rect x="-35" y="-9" width="70" height="18" rx="9" fill="#f6f3f1" stroke="#cfdaf5" strokeWidth="1" />
            <text x="0" y="3" textAnchor="middle" fill="#2b59d1" fontSize="9" fontFamily="monospace" fontWeight="bold">
              Matched
            </text>
          </g>

          {/* Segment 2: Stage 02 -> Stage 03 (Active Verified Flow) */}
          <line
            x1="290"
            y1="110"
            x2="405"
            y2="110"
            stroke="#2b59d1"
            strokeWidth="3"
            markerEnd="url(#arrow-blue-verity)"
          />
          <g transform="translate(350, 92)">
            <rect x="-35" y="-9" width="70" height="18" rx="9" fill="#f6f3f1" stroke="#cfdaf5" strokeWidth="1" />
            <text x="0" y="3" textAnchor="middle" fill="#2b59d1" fontSize="9" fontFamily="monospace" fontWeight="bold">
              Consensus
            </text>
          </g>

          {/* Segment 3: Stage 03 -> Stage 04 (Execution Trigger Flow) */}
          <line
            x1="475"
            y1="110"
            x2="585"
            y2="110"
            stroke={isExecuting ? "#10b981" : "#cfdaf5"}
            strokeWidth="3"
            strokeDasharray={isExecuting ? "none" : "5 4"}
            markerEnd={isExecuting ? "url(#arrow-green-verity)" : "url(#arrow-gray-verity)"}
            className={isExecuting ? "animate-pulse" : ""}
          />
          <g transform="translate(530, 92)">
            <rect
              x="-40"
              y="-9"
              width="80"
              height="18"
              rx="9"
              fill={isExecuting ? "#a7fccd" : "#f6f3f1"}
              stroke={isExecuting ? "#10b981" : "#cecac8"}
              strokeWidth="1"
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fill={isExecuting ? "#10b981" : "#797776"}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              DvP Trigger
            </text>
          </g>

          {/* Stage 01 */}
          <g transform="translate(85, 110)">
            <circle r="26" fill="#f6f3f1" stroke="#242424" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#242424" fontSize="11" fontFamily="monospace" fontWeight="bold">01</text>
            
            <rect x="-45" y="-48" width="90" height="18" rx="6" fill="#ffffff" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="-35" textAnchor="middle" fill="#242424" fontSize="9.5" fontFamily="monospace" fontWeight="bold">ERP INTAKE</text>
            
            <rect x="-40" y="36" width="80" height="18" rx="6" fill="#f6f3f1" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="49" textAnchor="middle" fill="#797776" fontSize="9" fontFamily="monospace">Invoice Hash</text>
          </g>

          {/* Stage 02 */}
          <g transform="translate(260, 110)">
            <circle r="26" fill="#f6f3f1" stroke="#242424" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#242424" fontSize="11" fontFamily="monospace" fontWeight="bold">02</text>
            
            <rect x="-45" y="-48" width="90" height="18" rx="6" fill="#ffffff" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="-35" textAnchor="middle" fill="#242424" fontSize="9.5" fontFamily="monospace" fontWeight="bold">CONSENSUS</text>
            
            <rect x="-42" y="36" width="84" height="18" rx="6" fill="#f6f3f1" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="49" textAnchor="middle" fill="#797776" fontSize="9" fontFamily="monospace">4-Eyes Lock</text>
          </g>

          {/* Stage 03 */}
          <g transform="translate(440, 110)">
            <circle r="30" fill="#cfdaf5" stroke="#2b59d1" strokeWidth="2.5" />
            <text x="0" y="4" textAnchor="middle" fill="#2b59d1" fontSize="12" fontFamily="monospace" fontWeight="bold">03</text>
            
            <rect x="-45" y="-52" width="90" height="18" rx="6" fill="#ffffff" stroke="#cfdaf5" strokeWidth="1" />
            <text x="0" y="-39" textAnchor="middle" fill="#2b59d1" fontSize="9.5" fontFamily="monospace" fontWeight="bold">VALUATION</text>
            
            <rect x="-38" y="38" width="76" height="18" rx="6" fill="#cfdaf5" stroke="#2b59d1" strokeWidth="1" />
            <text x="0" y="51" textAnchor="middle" fill="#2b59d1" fontSize="9" fontFamily="monospace" fontWeight="bold">Capital Due</text>
          </g>

          {/* Stage 04 */}
          <g transform="translate(615, 110)">
            <circle r="26" fill="#10b981" stroke="#10b981" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">04</text>
            
            <rect x="-42" y="-48" width="84" height="18" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="-35" textAnchor="middle" fill="#10b981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">RELEASE</text>
            
            <rect x="-45" y="36" width="90" height="18" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="49" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">DvP Complete</text>
          </g>
        </svg>
      </div>

      {/* Illustrated Text Annotations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            01. CRYPTOGRAPHIC COMMITMENT
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Unique fingerprint is stamped upon ERP intake, preventing duplicate financing or unauthorized claims.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            02. ATOMIC CAPITAL RELEASE
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Funds disburse simultaneously with title transfer of the verified invoice receivable without intermediary delays.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. ILP Gateway: Discrete Packet-Stream Calculus & Preimage Mesh            */
/* -------------------------------------------------------------------------- */
const IlpPacketStreamMathDiagram: React.FC<{
  isExecuting: boolean;
  activeParam: string | null;
  onHoverParam: (p: string | null) => void;
}> = ({ isExecuting, activeParam, onHoverParam }) => {
  return (
    <div className="space-y-6">
      {/* Simplified Mathematical Formalism Header */}
      <div className="p-5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-[#797776] uppercase tracking-widest block mb-1">
            PACKET STREAM MECHANICS
          </span>
          <div className="text-sm md:text-base text-[#242424] font-medium tracking-tight overflow-x-auto whitespace-nowrap py-0.5">
            <span>Total Value (1,250,000 EUR) = </span>
            <span className="text-[#2b59d1] font-bold">∑ 50 × 25,000 EUR Packets</span>
            <span className="text-[#797776] text-xs ml-2">[ Sub-85ms per hop ]</span>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cecac8] text-[11px] text-[#2b59d1] font-medium flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs">
          <Activity className="w-3.5 h-3.5" />
          <span>Hop Latency &lt;85ms</span>
        </div>
      </div>

      {/* Abstract Packet Quantization SVG */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ffffff] border border-[#cecac8] relative overflow-hidden shadow-xs">
        <svg viewBox="0 0 700 230" className="w-full h-auto select-none" aria-label="ILPv4 Discrete Packet Stream Flow">
          <defs>
            <linearGradient id="packetGradAiry" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cfdaf5" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Coordinate Axes */}
          <line x1="60" y1="185" x2="640" y2="185" stroke="#cecac8" strokeWidth="1" />
          <line x1="70" y1="35" x2="70" y2="195" stroke="#cecac8" strokeWidth="1" />
          <text x="635" y="202" fill="#797776" fontSize="10" fontFamily="monospace" textAnchor="end">t (ms)</text>
          <text x="50" y="40" fill="#797776" fontSize="10" fontFamily="monospace">Value</text>

          {/* Quantized Step Staircase */}
          <path
            d="M 70 185 L 140 185 L 140 160 L 220 160 L 220 135 L 300 135 L 300 110 L 380 110 L 380 85 L 460 85 L 460 60 L 540 60"
            fill="none"
            stroke="#2b59d1"
            strokeWidth="3"
          />

          {/* Fill under curve */}
          <path
            d="M 70 185 L 140 185 L 140 160 L 220 160 L 220 135 L 300 135 L 300 110 L 380 110 L 380 85 L 460 85 L 460 60 L 540 60 L 540 185 Z"
            fill="url(#packetGradAiry)"
            opacity="0.15"
          />

          {/* Preimage Lock Tag placed in clear top-left area */}
          <g transform="translate(210, 48)">
            <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#242424" />
            <text x="0" y="4" textAnchor="middle" fill="#cfdaf5" fontSize="9.5" fontFamily="monospace">
              PREIMAGE LOCK: SHA-256
            </text>
          </g>

          {/* Packet Metric Callout placed in clear top-right area */}
          <g transform="translate(540, 40)">
            <circle r="5" fill="#10b981" />
            <rect x="-65" y="-30" width="130" height="22" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="-16" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              CLEARED: 1.25M EUR
            </text>
          </g>
        </svg>
      </div>

      {/* Illustrated Text Annotations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            01. PACKET QUANTIZATION
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Invoices stream over small <span className="text-[#242424] font-semibold">25,000 EUR</span> packets, eliminating counterparty credit and float risk.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            02. CRYPTOGRAPHIC PREIMAGE LOCK
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Packets clear atomically when destination reveals cryptographic preimage key within the 85ms routing loop.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. CDSC Engine: Dynamic Yield Surface & Discount Manifold                  */
/* -------------------------------------------------------------------------- */
const CdscDiscountMathDiagram: React.FC<{
  isExecuting: boolean;
  activeParam: string | null;
  onHoverParam: (p: string | null) => void;
}> = ({ isExecuting, activeParam, onHoverParam }) => {
  return (
    <div className="space-y-6">
      {/* Simplified Mathematical Formalism Header */}
      <div className="p-5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-[#797776] uppercase tracking-widest block mb-1">
            DYNAMIC DISCOUNT VALUATION
          </span>
          <div className="text-sm md:text-base text-[#242424] font-medium tracking-tight overflow-x-auto whitespace-nowrap py-0.5">
            <span>Net Payout = Face Value × [ 1 − (</span>
            <span className="text-[#2b59d1] font-bold">APR</span>
            <span> × </span>
            <span className="text-[#10b981] font-bold">Days</span>
            <span> / 360) ]</span>
            <span className="text-[#797776] text-xs ml-2">[ Closed-form valuation ]</span>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cecac8] text-[11px] text-[#2b59d1] font-medium flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs">
          <span>DvP Matrix Verified</span>
        </div>
      </div>

      {/* Abstract Geometric Yield Curve SVG */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ffffff] border border-[#cecac8] relative overflow-hidden shadow-xs">
        <svg viewBox="0 0 700 240" className="w-full h-auto select-none" aria-label="CDSC Dynamic Factoring Curve">
          <defs>
            <linearGradient id="discountAreaAiry" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfdaf5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Coordinate Frame */}
          <line x1="60" y1="195" x2="640" y2="195" stroke="#cecac8" strokeWidth="1" />
          <line x1="70" y1="35" x2="70" y2="205" stroke="#cecac8" strokeWidth="1" />
          <text x="635" y="212" fill="#797776" fontSize="10" fontFamily="monospace" textAnchor="end">t (Days)</text>

          {/* Nominal Baseline Curve */}
          <line x1="70" y1="60" x2="540" y2="60" stroke="#cecac8" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Nominal Label with pill */}
          <g transform="translate(170, 42)">
            <rect x="-85" y="-12" width="170" height="22" rx="6" fill="#ffffff" stroke="#cecac8" strokeWidth="1" />
            <text x="0" y="3" textAnchor="middle" fill="#797776" fontSize="9.5" fontFamily="monospace">
              Face Value: $250,000
            </text>
          </g>

          {/* Discount Curve */}
          <path
            d="M 70 60 L 190 75 L 360 105 L 540 150"
            fill="none"
            stroke="#2b59d1"
            strokeWidth="3"
          />

          <path
            d="M 70 60 L 360 105 L 360 195 L 70 195 Z"
            fill="url(#discountAreaAiry)"
          />

          {/* Target Point at t=45 (x=360, y=105) */}
          <g transform="translate(360, 105)">
            <circle r="5" fill="#2b59d1" />
            
            {/* Callout box placed clearly ABOVE target with pointer stem */}
            <g transform="translate(-75, -55)">
              <rect x="0" y="0" width="150" height="38" rx="8" fill="#242424" />
              <polygon points="70,38 80,38 75,44" fill="#242424" />
              <text x="75" y="16" textAnchor="middle" fill="#a7fccd" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                PAYOUT: $246,875.00
              </text>
              <text x="75" y="30" textAnchor="middle" fill="#cecac8" fontSize="8.5" fontFamily="monospace">
                DISCOUNT: -$3,125.00 (45d)
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Illustrated Text Annotations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            01. DYNAMIC YIELD SPREAD
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Discount parameters adapt dynamically to corporate credit ratings and anchor balance metrics, eliminating manual loan processing.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cecac8]">
          <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5 font-semibold">
            02. INSTANT DVP SETTLEMENT
          </div>
          <p className="text-[#4e4d4d] text-xs leading-relaxed">
            Delivery vs. Payment guarantees title transfer of verified receivable occurs synchronously with digital cash credit into ERP sub-ledgers.
          </p>
        </div>
      </div>
    </div>
  );
};
