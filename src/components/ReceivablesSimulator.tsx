import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, DollarSign, Clock, Sparkles, Binary, TrendingDown } from 'lucide-react';

export const ReceivablesSimulator: React.FC = () => {
  const [faceValue, setFaceValue] = useState<number>(350000);
  const [erpSource, setErpSource] = useState<string>('SAP_S4');
  const [acceleratedDays, setAcceleratedDays] = useState<number>(45);
  const [currency, setCurrency] = useState<string>('USD');

  // Dynamic calculation based on Finux Labs CDSC factoring formula
  const annualRate = 0.0385; // 3.85% prime anchor rate
  const discountRate = (annualRate * acceleratedDays) / 360;
  const discountAmount = faceValue * discountRate;
  const netSettlement = faceValue - discountAmount;
  const typicalFactoringFee = faceValue * 0.025; // 2.5% traditional factoring fee
  const liquiditySavings = typicalFactoringFee - discountAmount;

  return (
    <section
      id="simulator"
      className="py-28 md:py-36 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
            DYNAMIC VALUATION SIMULATOR
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight mb-4">
            Dynamic term structure & discount yield curves.
          </h2>
          <p className="font-mono text-base text-[#4e4d4d]">
            Evaluate algebraic settlement equations, acceleration intervals, and DvP liquidity distributions in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls Card (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-10 rounded-[40px] border border-[#cecac8] bg-[#ffffff] shadow-xs flex flex-col justify-between">
            <div className="space-y-7">
              <div className="flex items-center justify-between pb-5 border-b border-[#cecac8]/60">
                <span className="text-xs font-mono uppercase tracking-wider text-[#797776]">
                  MODEL PARAMETERS
                </span>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#cfdaf5] text-[#242424]">
                  CDSC ALGORITHM V2
                </span>
              </div>

              {/* Currency & Face Value Input */}
              <div>
                <label className="text-xs font-mono uppercase text-[#797776] block mb-2 font-medium">
                  Invoice Face Value (𝒱₀)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[#797776] text-sm">
                    {currency === 'USD' ? '$' : '€'}
                  </span>
                  <input
                    id="input-face-value"
                    type="number"
                    min="10000"
                    max="10000000"
                    step="50000"
                    value={faceValue}
                    onChange={(e) => setFaceValue(Math.max(1000, Number(e.target.value)))}
                    className="w-full pl-9 pr-4 py-3.5 rounded-2xl border border-[#cecac8] font-mono text-base text-[#242424] focus:outline-none focus:border-[#242424] bg-[#f6f3f1]/50"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[11px] font-mono text-[#797776]">
                  <span>Min: 10,000</span>
                  <span>Max: 10,000,000</span>
                </div>
              </div>

              {/* ERP Connector Selection */}
              <div>
                <label className="text-xs font-mono uppercase text-[#797776] block mb-2 font-medium">
                  Origin ERP Document System
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'SAP_S4', label: 'SAP S/4HANA' },
                    { id: 'ORACLE_CLOUD', label: 'Oracle ERP' },
                    { id: 'NETSUITE', label: 'NetSuite' }
                  ].map((erp) => (
                    <button
                      key={erp.id}
                      onClick={() => setErpSource(erp.id)}
                      className={`p-3 rounded-xl border text-xs font-mono text-center transition-all ${
                        erpSource === erp.id
                          ? 'border-[#242424] bg-[#242424] text-[#ffffff]'
                          : 'border-[#cecac8] bg-[#f6f3f1] text-[#4e4d4d] hover:border-[#797776]'
                      }`}
                    >
                      {erp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days Accelerated Slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-mono uppercase text-[#797776] font-medium">
                    Acceleration Window (Δt)
                  </label>
                  <span className="font-mono text-xs font-semibold text-[#2b59d1]">
                    {acceleratedDays} Days Early
                  </span>
                </div>
                <input
                  id="slider-accelerated-days"
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={acceleratedDays}
                  onChange={(e) => setAcceleratedDays(Number(e.target.value))}
                  className="w-full accent-[#2b59d1] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#797776] mt-1.5">
                  <span>5 Days</span>
                  <span>45 Days</span>
                  <span>90 Days</span>
                </div>
              </div>
            </div>

            {/* Invariant Guarantee Badge */}
            <div className="mt-8 p-4 rounded-2xl bg-[#cfdaf5]/50 border border-[#cfdaf5] flex items-start gap-3 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#2b59d1] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#242424] font-medium block">
                  Verity Invariant Guarantee
                </span>
                <span className="text-[#4e4d4d]">
                  Anchor locked at intake with capital released via GTT liquidity pool without recourse.
                </span>
              </div>
            </div>
          </div>

          {/* Right Calculations Result (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-[40px] border border-[#cecac8] bg-[#ffffff] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#cecac8]/60 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#797776] block mb-1">
                    ALGEBRAIC VALUATION
                  </span>
                  <span className="font-editorial text-3xl text-[#242424]">
                    Real-Time Settlement Netting
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-[#797776] block">
                    SOLVER LATENCY
                  </span>
                  <span className="font-mono text-sm text-[#2b59d1] font-medium">
                    &lt; 180ms Instant
                  </span>
                </div>
              </div>

              {/* Formula Evaluation Box */}
              <div className="p-5 rounded-2xl bg-[#f6f3f1] border border-[#cecac8]/60 mb-8 font-mono text-xs">
                <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-1.5">
                  CLOSED-FORM CDSC SPREAD EQUATION
                </div>
                <div className="text-sm md:text-base text-[#242424] font-medium">
                  <span className="font-serif italic text-base">𝒱</span><sub className="text-[10px]">net</sub> = 
                  ${faceValue.toLocaleString()} · [ 1 - (0.0385 · {acceleratedDays}/360) ] = 
                  <span className="text-[#2b59d1] font-bold"> ${netSettlement.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Main Net Settlement Big Number */}
              <div className="p-8 rounded-3xl bg-[#f6f3f1] border border-[#cecac8]/60 mb-8">
                <span className="text-xs font-mono uppercase text-[#797776] block mb-1.5">
                  IMMEDIATE SUPPLIER PAYOUT (CAPITAL DUE VALUE)
                </span>
                <div className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#242424] tracking-tight">
                  ${netSettlement.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs font-mono text-[#797776]">
                  <span>Face: ${faceValue.toLocaleString()}</span>
                  <span>•</span>
                  <span>Discount: -${discountAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                  <span>•</span>
                  <span className="text-[#2b59d1]">Dynamic APR: 3.85%</span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-5 text-xs font-mono mb-8">
                <div className="p-5 rounded-2xl border border-[#cecac8]/40 bg-[#f6f3f1]/60">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">
                    FACTORING SAVINGS
                  </span>
                  <span className="text-lg text-[#242424] font-medium">
                    +${Math.max(0, liquiditySavings).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-[10px] text-[#797776] block mt-1">
                    vs. traditional 2.5% fee
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-[#cecac8]/40 bg-[#f6f3f1]/60">
                  <span className="text-[10px] uppercase text-[#797776] block mb-1">
                    ERP WRITEBACK
                  </span>
                  <span className="text-lg text-[#242424] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2b59d1]" />
                    <span>Auto-Cleared</span>
                  </span>
                  <span className="text-[10px] text-[#797776] block mt-1">
                    Posted to {erpSource}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Cryptographic Audit Ledger String */}
            <div className="pt-5 border-t border-[#cecac8]/60 text-xs font-mono">
              <div className="flex items-center justify-between text-[#797776] mb-2">
                <span>SETTLEMENT PROOF RECORD:</span>
                <span className="text-[10px] text-[#2b59d1]">HASH VERIFIED (ILPv4)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#000000] text-[#cfdaf5] font-mono text-[11px] truncate">
                0x7c9a_verity_anchor_{erpSource.toLowerCase()}_{faceValue}_{acceleratedDays}d_sig_valid
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
