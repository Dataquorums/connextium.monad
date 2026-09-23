import React from 'react';
import { CORE_FEATURES } from '../data/integrationData';
import { Building2, ShieldCheck, Landmark, GitBranch, TrendingUp, Bot, Check } from 'lucide-react';

export const CoreFeaturesGrid: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'feat-erp':
        return <Building2 className="w-5 h-5 text-[#242424]" />;
      case 'feat-verity':
        return <ShieldCheck className="w-5 h-5 text-[#2b59d1]" />;
      case 'feat-gtt':
        return <Landmark className="w-5 h-5 text-[#242424]" />;
      case 'feat-ilp':
        return <GitBranch className="w-5 h-5 text-[#242424]" />;
      case 'feat-cdsc':
        return <TrendingUp className="w-5 h-5 text-[#242424]" />;
      case 'feat-agentic':
        return <Bot className="w-5 h-5 text-[#242424]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#242424]" />;
    }
  };

  return (
    <section
      id="features"
      className="py-28 md:py-36 px-6 lg:px-12 border-b border-[#cecac8] bg-[#f6f3f1]"
    >
      <div className="max-w-[1432px] mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#797776] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2b59d1]"></span>
            CORE PILLARS
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#242424] font-normal leading-tight mb-4">
            Cryptographic certainty and real-time balance sync.
          </h2>
          <p className="font-mono text-base text-[#4e4d4d]">
            Foundational capabilities enabling automated treasury, verified factoring, and packet settlement.
          </p>
        </div>

        {/* Feature Cards Grid (Spacious 3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_FEATURES.map((feat) => {
            const isElevated = feat.id === 'feat-verity';

            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                className={`rounded-[40px] p-10 flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                  isElevated
                    ? 'bg-[#cfdaf5] border border-[#cfdaf5]'
                    : 'bg-[#ffffff] border border-[#cecac8] hover:border-[#797776]'
                }`}
              >
                {/* For elevated card: atmospheric gradient illustration overlay */}
                {isElevated && (
                  <div
                    className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full pointer-events-none opacity-60 filter blur-[40px] bg-gradient-to-tr from-[#ff9473] via-[#a0b5eb] to-[#a7fccd]"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10">
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                        isElevated
                          ? 'bg-[#ffffff] border-[#cfdaf5]'
                          : 'bg-[#f6f3f1] border-[#cecac8]'
                      }`}
                    >
                      {getIcon(feat.id)}
                    </div>
                    {feat.badge && (
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full ${
                          isElevated
                            ? 'bg-[#242424] text-[#ffffff]'
                            : 'bg-[#f6f3f1] text-[#4e4d4d] border border-[#cecac8]/60'
                        }`}
                      >
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#797776] mb-2">
                    {feat.category}
                  </div>
                  <h3 className="font-editorial text-2xl md:text-3xl text-[#242424] font-normal leading-snug mb-4">
                    {feat.title}
                  </h3>

                  <p
                    className={`font-mono text-sm leading-relaxed mb-8 ${
                      isElevated ? 'text-[#242424]' : 'text-[#4e4d4d]'
                    }`}
                  >
                    {feat.description}
                  </p>
                </div>

                {/* Specs List */}
                <div
                  className={`pt-6 border-t relative z-10 space-y-2.5 text-xs font-mono ${
                    isElevated ? 'border-[#242424]/20' : 'border-[#cecac8]/60'
                  }`}
                >
                  {feat.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isElevated ? 'text-[#2b59d1]' : 'text-[#797776]'
                        }`}
                      />
                      <span className={isElevated ? 'text-[#242424]' : 'text-[#4e4d4d]'}>
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
