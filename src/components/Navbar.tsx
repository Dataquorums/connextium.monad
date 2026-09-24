import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-40 bg-[#f6f3f1]/90 backdrop-blur-md border-b border-[#cecac8]/60 transition-all duration-200"
    >
      <div className="max-w-[1432px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          id="nav-brand-logo"
          href="https://connextium.xyz/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-[#242424] flex items-center justify-center text-[#f6f3f1] font-mono text-xs font-semibold group-hover:bg-[#2b59d1] transition-colors">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-2xl tracking-tight text-[#242424] leading-none">
              Connextium<span className="text-[#2b59d1]">.xyz</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#797776] -mt-0.5">
              Finux Labs
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            id="nav-link-architecture"
            href="#architecture"
            className="text-xs uppercase tracking-wider text-[#4e4d4d] hover:text-[#242424] font-medium transition-colors"
          >
            Pipeline
          </a>
          <a
            id="nav-link-integrations"
            href="#integrations"
            className="text-xs uppercase tracking-wider text-[#4e4d4d] hover:text-[#242424] font-medium transition-colors"
          >
            Software Integrations
          </a>
          <a
            id="nav-link-features"
            href="#features"
            className="text-xs uppercase tracking-wider text-[#4e4d4d] hover:text-[#242424] font-medium transition-colors"
          >
            Core Modules
          </a>
          <a
            id="nav-link-simulator"
            href="#simulator"
            className="text-xs uppercase tracking-wider text-[#4e4d4d] hover:text-[#242424] font-medium transition-colors"
          >
            Netting Sandbox
          </a>
          <a
            id="nav-link-specs"
            href="#specs"
            className="text-xs uppercase tracking-wider text-[#4e4d4d] hover:text-[#242424] font-medium transition-colors"
          >
            Specifications
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            id="nav-docs-btn"
            href="https://finuxlabs.github.io/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#242424] text-[#242424] hover:bg-[#242424] hover:text-[#f6f3f1] text-xs uppercase tracking-wider font-medium transition-all"
          >
            <span>Finux Labs Chapter</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            id="nav-developer-portal-btn"
            onClick={onOpenPortal}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2b59d1] text-[#ffffff] hover:bg-[#244cb5] text-xs uppercase tracking-wider font-medium transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Console</span>
            <span className="text-white/80">▸</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="nav-mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-lg text-[#242424] hover:bg-[#cecac8]/30 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="nav-mobile-menu"
          className="md:hidden border-t border-[#cecac8] bg-[#f6f3f1] px-6 py-6 space-y-4"
        >
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#242424] py-2 border-b border-[#cecac8]/40"
          >
            Pipeline Architecture
          </a>
          <a
            href="#integrations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#242424] py-2 border-b border-[#cecac8]/40"
          >
            Software Integrations
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#242424] py-2 border-b border-[#cecac8]/40"
          >
            Core Modules
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#242424] py-2 border-b border-[#cecac8]/40"
          >
            Netting Sandbox
          </a>
          <a
            href="#specs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#242424] py-2 border-b border-[#cecac8]/40"
          >
            Specifications
          </a>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="https://finuxlabs.github.io/"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center px-5 py-3 rounded-full border border-[#242424] text-[#242424] text-xs uppercase tracking-wider font-medium"
            >
              Finux Labs Chapter
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full text-center px-5 py-3 rounded-full bg-[#2b59d1] text-white text-xs uppercase tracking-wider font-medium"
            >
              Open Developer Console ▸
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
