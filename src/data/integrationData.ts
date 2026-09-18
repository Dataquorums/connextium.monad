import { IntegrationModule, PipelineNode, FeatureItem, FaqItem } from '../types';

export const INTEGRATION_MODULES: IntegrationModule[] = [
  {
    id: 'gtt-api',
    name: 'GTT Business Client API',
    tag: 'GLOBAL TRADE TREASURY',
    shortDesc: 'On-chain Accounts of Digital Assets (ADA) with automated cryptographic ledger sync for buyers, suppliers, and liquidity pools.',
    fullDesc: 'The Global Trade Treasury (GTT) Business Client API exposes stable REST/gRPC endpoints and webhook event subscriptions. It replaces delayed bank batch processing and opaque ERP reconciliation with cryptographically verified multi-party balances and programmatic sub-ledgers.',
    protocols: ['REST v2', 'gRPC', 'ILP-SPSP', 'WebSocket'],
    erpCompatibility: ['SAP S/4HANA', 'Oracle ERP Cloud', 'NetSuite SuiteScript', 'MS Dynamics 365'],
    latency: '< 180ms',
    security: 'Ed25519 Request Signing + mTLS',
    codeSnippet: {
      language: 'typescript',
      filename: 'treasury-settlement.ts',
      code: `import { ConnextiumClient } from '@connextium/sdk';

// Initialize with Finux Labs Echo environment credentials
const client = new ConnextiumClient({
  endpoint: 'https://api.connextium.xyz/v2',
  apiKey: process.env.CONNEXTIUM_API_KEY,
  environment: 'echo-sandbox' // Finux Labs Echo Mesh
});

// Create verifiable Accounts of Digital Assets (ADA) allocation
const allocation = await client.treasury.createAllocation({
  treasuryId: 'GTT-US-CORP-9821',
  beneficiaryPointer: '$connextium.xyz/supplier/acct_882',
  capitalDueValue: {
    amount: '450000.00',
    currency: 'USD',
    settlementRail: 'ILP_MULTI_RAIL'
  },
  invoiceHash: '0x8f2a93c71e0b5...d4e9',
  consensusPolicy: 'VERITY_4_EYES_ANCHORED'
});

console.log('Cryptographic Settlement Anchor:', allocation.proofHash);`
    }
  },
  {
    id: 'verity-engine',
    name: 'Verity Capital Due Engine',
    tag: 'SUPPLY CHAIN FINANCE',
    shortDesc: 'Four-stage architectural blueprint resolving real-world commercial truth before unlocking financing and releasing liquidity.',
    fullDesc: 'Verity bridges enterprise procurement data and on-chain capital disbursement through a deterministic 4-stage pipeline: (1) Invoice Truth validation from ERP, (2) Buyer-Seller multi-party consensus, (3) Capital Due Value dynamic discounting calculation, and (4) Atomic settlement release.',
    protocols: ['OpenID Connect', 'EDIFACT / ANSI X12', 'JSON-LD Verifiable Credentials'],
    erpCompatibility: ['SAP IDoc / BAPI', 'Oracle Business Events', 'Workday Financials'],
    latency: '< 320ms',
    security: 'Zero-Knowledge Invoice Audit Trail',
    codeSnippet: {
      language: 'bash',
      filename: 'verify-invoice.sh',
      code: `# Trigger Verity 4-Stage Capital Verification
curl -X POST https://api.connextium.xyz/v2/verity/verify \\
  -H "Authorization: Bearer cnx_live_9a7d83..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "documentId": "INV-2026-09884",
    "erpOrigin": "SAP_S4_HANA",
    "erpSystemId": "PRD-US-01",
    "buyerAnchorId": "CORP-TESLA-SUPPLY",
    "supplierId": "SUP-SEMICON-88",
    "faceAmount": 782000.00,
    "currency": "EUR",
    "dueDate": "2026-11-15T00:00:00Z",
    "verificationStage": "BUYER_SELLER_CONSENSUS"
  }'`
    }
  },
  {
    id: 'ilp-gateway',
    name: 'Interledger Protocol Gateway',
    tag: 'PACKET-SWITCHED CLEARING',
    shortDesc: 'High-throughput packet routing engine connecting traditional banking rails (SWIFT, SEPA, FedNow) with digital asset networks.',
    fullDesc: 'Based on the Interledger Protocol (ILP) specifications maintained by Finux Labs. Payments are broken into cryptographically bound micropackets streamed across heterogeneous payment adapters, eliminating single-point counterparty credit risk and enabling cross-currency settlement in sub-seconds.',
    protocols: ['ILPv4 STREAM', 'Bilateral Settlement Engine', 'ISO 20022 camt/pacs'],
    erpCompatibility: ['Universal Bank Interface', 'Treasury Workstation Hub'],
    latency: '< 85ms packet hop',
    security: 'SHA-256 Preimage Condition Locking',
    codeSnippet: {
      language: 'typescript',
      filename: 'ilp-stream-packet.ts',
      code: `import { createIlpRouter } from '@connextium/ilp';

const router = await createIlpRouter({
  nodeAddress: 'g.connextium.echo.node-04',
  settlementEngine: 'SEPA_INSTANT_BRIDGE'
});

// Stream high-value invoice clearing over low-risk packets
const stream = router.createStreamSession({
  destinationPointer: '$connextium.xyz/clearing/eu-central',
  totalClearingValue: '1250000.00',
  currency: 'EUR',
  maxPacketValue: '25000.00' // Auto-packetized clearing
});

stream.on('packetAck', (packet) => {
  console.log(\`Packet #\${packet.sequence}: \${packet.amount} cleared with proof \${packet.hash}\`);
});`
    }
  },
  {
    id: 'cdsc-clearing',
    name: 'CDSC Receivables & Factoring Engine',
    tag: 'DYNAMIC STRUCTURED CLEARING',
    shortDesc: 'Structured receivables management, dynamic APR discounting curves, and real-time Delivery-vs-Payment (DvP) swap accounting.',
    fullDesc: 'The Commerce & Dynamic Structured Clearing (CDSC) module tokenizes approved receivables into fungible accounting units. It enables dynamic early payment discounting curves, factoring syndicate distribution, and automated swap accounting at invoice maturity.',
    protocols: ['DvP Atomic Swap', 'Smart Escrow V2', 'Accounting Matrix Sync'],
    erpCompatibility: ['Coupa', 'Basware', 'Kyriba TMS', 'Finastra'],
    latency: '< 240ms',
    security: 'Multi-Sig Escrow + Anchor Consensus',
    codeSnippet: {
      language: 'json',
      filename: 'cdsc-webhook-payload.json',
      code: `{
  "event": "receivable.factoring.approved",
  "timestamp": "2026-09-17T20:31:22.000Z",
  "data": {
    "receivableId": "REC-CDSC-88192",
    "originalFaceValue": 250000.00,
    "earlySettlementValue": 246875.00,
    "discountSpreadBps": 125,
    "daysAccelerated": 45,
    "factoringSyndicate": "CONNEXTIUM_LIQUIDITY_VAULT_A",
    "settlementExecution": "IMMEDIATE_ADA_CREDIT",
    "erpReconciliationWebhook": "https://erp.enterprise.com/hooks/connextium-sync"
  }
}`
    }
  }
];

export const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'node-erp',
    label: 'ERP & Trade Ingest',
    sublabel: 'SAP / Oracle / NetSuite',
    type: 'source',
    status: 'synced',
    details: 'Bidirectional sync pulling purchase orders, goods receipts, and approved payable invoices via native enterprise connectors.'
  },
  {
    id: 'node-verity',
    label: 'Verity Consensus Engine',
    sublabel: 'Capital Due Verification',
    type: 'verification',
    status: 'active',
    details: '4-stage consensus protocol proving invoice authenticity, buyer confirmation, and zero-risk double-financing prevention.'
  },
  {
    id: 'node-gtt',
    label: 'GTT Treasury Core',
    sublabel: 'Digital Asset Accounts (ADA)',
    type: 'treasury',
    status: 'active',
    details: 'Cryptographic ledger maintaining real-time programmable liquidity pools and multi-currency sub-account balances.'
  },
  {
    id: 'node-ilp',
    label: 'ILP Clearing Gateway',
    sublabel: 'Packet-Switched Protocol',
    type: 'settlement',
    status: 'synced',
    details: 'Interledger packet router distributing clearing transactions across ISO 20022 banking rails and on-chain protocols.'
  },
  {
    id: 'node-settlement',
    label: 'Multi-Rail Liquidity',
    sublabel: 'SEPA / FedNow / Stablecoin',
    type: 'destination',
    status: 'ready',
    details: 'Atomic delivery-vs-payment execution with automated remittance ledger posting back to enterprise ERP systems.'
  }
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'feat-erp',
    title: 'Enterprise ERP Connectors',
    category: 'INTEGRATION ARCHITECTURE',
    badge: 'PLUG & PLAY',
    description: 'Certified bidirectional integration modules for SAP S/4HANA, Oracle ERP Cloud, and Microsoft Dynamics 365. Eliminates manual CSV exports and batch uploads.',
    specs: ['Native ABAP / OData connectors', 'Real-time two-way status writeback', 'Zero changes to legacy accounting chart']
  },
  {
    id: 'feat-verity',
    title: 'Verity Capital Due Consensus',
    category: 'VERIFICATION MECHANICS',
    badge: 'PATENTED BLUEPRINT',
    description: 'Resolves commercial invoice truth before capital release. Ensures buyer anchor confirmation and mathematical certainty without credit arbitration.',
    specs: ['4-Stage consensus state machine', 'Cryptographic invoice fingerprinting', 'Double-financing proof guarantee']
  },
  {
    id: 'feat-gtt',
    title: 'GTT Digital Asset Accounts',
    category: 'TREASURY INFRASTRUCTURE',
    badge: 'PROGRAMMABLE LIQUIDITY',
    description: 'On-chain Accounts of Digital Assets (ADA) replacing static bank accounts with programmable, auditable, yield-bearing cash sub-ledgers.',
    specs: ['Sub-second multi-entity netting', 'Automated tax and withholding splits', 'Granular multi-signature controls']
  },
  {
    id: 'feat-ilp',
    title: 'Interledger Packet Routing',
    category: 'PROTOCOL SPECIFICATION',
    badge: 'INTEROPERABLE',
    description: 'Implements the Finux Labs Interledger Protocol (ILP) node specification for trust-minimized value streaming across disparate national payment systems.',
    specs: ['Sub-100ms packet routing latency', 'Support for SWIFT, SEPA, FedNow & on-chain', 'Continuous micro-clearing streams']
  },
  {
    id: 'feat-cdsc',
    title: 'CDSC Dynamic Discounting',
    category: 'SUPPLY CHAIN FINANCE',
    badge: 'FACTORING ENGINE',
    description: 'Automated early payment financing algorithms that dynamically calculate discount rates based on supplier cash flow urgency and buyer risk tier.',
    specs: ['Continuous dynamic yield curves', 'Automated swap accounting entries', 'Syndicated institutional liquidity']
  },
  {
    id: 'feat-agentic',
    title: 'Agentic Finance & Commerce',
    category: 'AUTONOMOUS OPERATIONS',
    badge: 'AI-READY RUNTIME',
    description: 'Built-in support for autonomous software agents to negotiate invoice factoring, verify delivery checkpoints, and trigger settlement without human intervention.',
    specs: ['Agentic payment pointers ($pointer)', 'Verifiable credential authorization', 'Configurable spending and risk caps']
  }
];

export const TECHNICAL_FAQS: FaqItem[] = [
  {
    category: 'INTEGRATION',
    question: 'How does Connextium integrate with our existing SAP or Oracle ERP installation?',
    answer: 'Connextium deploys lightweight native connectors (certified for SAP S/4HANA OData and Oracle REST Integration Cloud). Invoices approved in accounts payable automatically trigger Verity verification events via TLS-encrypted webhooks. When settlement completes, Connextium automatically writes back reconciliation entries (clearing document numbers) directly into your ERP ledger.'
  },
  {
    category: 'SECURITY',
    question: 'What is the relationship between Connextium and Finux Labs specifications?',
    answer: 'Connextium is the flagship operational deployment and production implementation of the open protocol specifications developed by Finux Labs (finuxlabs.github.io). It operationalizes the GTT Business Client API, Verity Supply Chain Finance blueprint, CDSC factoring framework, and the Interledger Protocol (ILP) node mesh.'
  },
  {
    category: 'SETTLEMENT',
    question: 'How does the 4-stage Verity Capital Due Value pipeline prevent fraud?',
    answer: 'Before capital is disbursed by any liquidity provider, Verity strictly executes four sequential cryptographic checks: (1) Origin ERP invoice validity and unique digest generation, (2) Buyer anchor confirmation validating goods receipt, (3) Dynamic discounting and wallet funding lock, and (4) Atomic execution over the Interledger gateway. Invoices cannot be double-factored or financed without consensus.'
  },
  {
    category: 'PERFORMANCE',
    question: 'What is the typical settlement speed and throughput of the ILP gateway?',
    answer: 'The Connextium ILP gateway processes packet-switched settlements in under 85ms per hop with horizontal scaling exceeding 10,000 transactions per second. Real-time payments over SEPA Instant or FedNow achieve sub-5 second end-to-end delivery with instant ERP ledger update.'
  },
  {
    category: 'DEVELOPERS',
    question: 'Is there a developer sandbox available to test the GTT Business Client API?',
    answer: 'Yes. Connextium maintains the Finux Labs Echo Sandbox Environment (echo-sandbox.connextium.xyz), featuring mock ERP instances (SAP/Oracle), simulated banking rails, and real-time Interledger packet inspection tools for developers and treasury partners.'
  }
];
