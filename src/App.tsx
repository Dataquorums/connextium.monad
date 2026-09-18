/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PipelineDiagram } from './components/PipelineDiagram';
import { IntegrationHub } from './components/IntegrationHub';
import { CoreFeaturesGrid } from './components/CoreFeaturesGrid';
import { ReceivablesSimulator } from './components/ReceivablesSimulator';
import { DocsQuickstart } from './components/DocsQuickstart';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DeveloperPortalModal } from './components/DeveloperPortalModal';

export default function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f3f1] text-[#242424] flex flex-col font-mono selection:bg-[#cfdaf5] selection:text-[#000000]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Primary Sticky Header */}
      <Navbar onOpenPortal={() => setIsPortalOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Typographic & Value Proposition Hero */}
        <HeroSection onOpenPortal={() => setIsPortalOpen(true)} />

        {/* Data Transformation & Flow Pipeline */}
        <PipelineDiagram />

        {/* Core Software Integration Features Showcase */}
        <IntegrationHub />

        {/* 6 Architectural Pillars & Capabilities */}
        <CoreFeaturesGrid />

        {/* Interactive Factoring & Settlement Simulator */}
        <ReceivablesSimulator />

        {/* Specifications, SDK Installation & Finux Labs References */}
        <DocsQuickstart />

        {/* Technical Questions & Architecture FAQs */}
        <FaqSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Developer Sandbox Testing Console Modal */}
      <DeveloperPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />
    </div>
  );
}
