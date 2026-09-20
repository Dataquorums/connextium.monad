import { IntegrationModule, PipelineNode, FeatureItem, FaqItem } from '../types';

export const INTEGRATION_MODULES: IntegrationModule[] = [
  {
    id: 'gtt-api',
    name: 'GTT Business Client API',
    tag: 'GLOBAL TRADE TREASURY',
    shortDesc: 'Automated sub-ledger sync for buyers, suppliers, and liquidity pools.',
    fullDesc: 'REST & gRPC endpoints replacing delayed batch processing with cryptographically verified multi-party balances and sub-ledgers.',
    protocols: ['REST v2', 'gRPC', 'ILP-SPSP', 'WebSocket'],
    erpCompatibility: ['SAP S/4HANA', 'Oracle ERP Cloud', 'NetSuite SuiteScript', 'MS Dynamics 365'],
    latency: '< 180ms',
    security: 'Ed25519 Signing + mTLS',
    codeSnippet: {
      language: 'typescript',
      filename: 'treasury-settlement.ts',
      code: `import { ConnextiumClient } from '@connextium/sdk';

// Initialize with Echo environment credentials
const client = new ConnextiumClient({
  endpoint: 'https://api.connextium.xyz/v2',
  apiKey: process.env.CONNEXTIUM_API_KEY,
  environment: 'echo-sandbox'
});

// Create verifiable allocation
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

console.log('Settlement Anchor:', allocation.proofHash);`
    }
  },
  {
    id: 'verity-engine',
    name: 'Verity Capital Due Engine',
    tag: 'SUPPLY CHAIN FINANCE',
    shortDesc: 'Four-stage blueprint verifying commercial truth before capital release.',
    fullDesc: 'Deterministic 4-stage pipeline: ERP Invoice Truth validation, Buyer-Seller consensus, Capital Due discounting, and atomic release.',
    protocols: ['OpenID Connect', 'EDIFACT / ANSI X12', 'JSON-LD Credentials'],
    erpCompatibility: ['SAP IDoc / BAPI', 'Oracle Business Events', 'Workday Financials'],
    latency: '< 320ms',
    security: 'Zero-Knowledge Audit Trail',
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
    "buyerAnchorId": "CORP-TESLA-SUPPLY",
    "supplierId": "SUP-SEMICON-88",
    "faceAmount": 782000.00,
    "currency": "EUR",
    "verificationStage": "BUYER_SELLER_CONSENSUS"
  }'`
    }
  },
  {
    id: 'ilp-gateway',
    name: 'Interledger Protocol Gateway',
    tag: 'PACKET-SWITCHED CLEARING',
    shortDesc: 'High-throughput packet routing across banking rails and digital networks.',
    fullDesc: 'Streams cryptographically bound micropackets across payment rails, eliminating counterparty credit risk with sub-second settlement.',
    protocols: ['ILPv4 STREAM', 'Bilateral Settlement', 'ISO 20022 camt/pacs'],
    erpCompatibility: ['Universal Bank Interface', 'Treasury Workstation Hub'],
    latency: '< 85ms per hop',
    security: 'SHA-256 Preimage Locking',
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
  maxPacketValue: '25000.00'
});

stream.on('packetAck', (packet) => {
  console.log(\`Packet #\${packet.sequence}: \${packet.amount} cleared (\${packet.hash})\`);
});`
    }
  },
  {
    id: 'cdsc-clearing',
    name: 'CDSC Receivables & Factoring Engine',
    tag: 'DYNAMIC STRUCTURED CLEARING',
    shortDesc: 'Dynamic discount curves, receivables tokenization, and real-time DvP accounting.',
    fullDesc: 'Tokenizes receivables into fungible units for dynamic early payment discounts, factoring distribution, and automated maturity swaps.',
    protocols: ['DvP Atomic Swap', 'Smart Escrow V2', 'Matrix Sync'],
    erpCompatibility: ['Coupa', 'Basware', 'Kyriba TMS', 'Finastra'],
    latency: '< 240ms',
    security: 'Multi-Sig Escrow + Consensus',
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
    "settlementExecution": "IMMEDIATE_ADA_CREDIT"
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
    details: 'Native connectors sync purchase orders, goods receipts, and approved invoices.'
  },
  {
    id: 'node-verity',
    label: 'Verity Consensus Engine',
    sublabel: 'Capital Due Verification',
    type: 'verification',
    status: 'active',
    details: 'Cryptographic consensus verifying invoice authenticity and eliminating double-financing.'
  },
  {
    id: 'node-gtt',
    label: 'GTT Treasury Core',
    sublabel: 'Digital Asset Accounts (ADA)',
    type: 'treasury',
    status: 'active',
    details: 'Programmable liquidity sub-ledgers and multi-currency balances in real time.'
  },
  {
    id: 'node-ilp',
    label: 'ILP Clearing Gateway',
    sublabel: 'Packet-Switched Protocol',
    type: 'settlement',
    status: 'synced',
    details: 'Packet router streaming value across ISO 20022 bank rails and digital networks.'
  },
  {
    id: 'node-settlement',
    label: 'Multi-Rail Liquidity',
    sublabel: 'SEPA / FedNow / Stablecoin',
    type: 'destination',
    status: 'ready',
    details: 'Atomic DvP settlement with automated writeback to enterprise ERP ledgers.'
  }
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'feat-erp',
    title: 'Enterprise ERP Connectors',
    category: 'INTEGRATION ARCHITECTURE',
    badge: 'PLUG & PLAY',
    description: 'Certified two-way connectors for SAP, Oracle, and Dynamics. Eliminates manual CSV exports.',
    specs: ['Native ABAP & OData connectors', 'Real-time two-way writeback', 'Zero chart-of-accounts disruption']
  },
  {
    id: 'feat-verity',
    title: 'Verity Capital Due Consensus',
    category: 'VERIFICATION MECHANICS',
    badge: 'PATENTED BLUEPRINT',
    description: 'Resolves commercial invoice truth before capital release with buyer anchor consensus.',
    specs: ['4-stage state machine', 'Cryptographic fingerprinting', 'Double-financing prevention']
  },
  {
    id: 'feat-gtt',
    title: 'GTT Digital Asset Accounts',
    category: 'TREASURY INFRASTRUCTURE',
    badge: 'PROGRAMMABLE LIQUIDITY',
    description: 'Replaces static bank accounts with programmable, auditable cash sub-ledgers.',
    specs: ['Sub-second netting', 'Automated tax & withholding splits', 'Granular multi-sig controls']
  },
  {
    id: 'feat-ilp',
    title: 'Interledger Packet Routing',
    category: 'PROTOCOL SPECIFICATION',
    badge: 'INTEROPERABLE',
    description: 'Finux Labs ILP node spec for trust-minimized value streaming across global payment rails.',
    specs: ['Sub-100ms routing latency', 'SWIFT, SEPA, FedNow & on-chain', 'Continuous micro-clearing streams']
  },
  {
    id: 'feat-cdsc',
    title: 'CDSC Dynamic Discounting',
    category: 'SUPPLY CHAIN FINANCE',
    badge: 'FACTORING ENGINE',
    description: 'Automated early financing algorithms calculating dynamic discounts from buyer risk tiers.',
    specs: ['Dynamic yield curves', 'Automated swap accounting', 'Syndicated institutional liquidity']
  },
  {
    id: 'feat-agentic',
    title: 'Agentic Finance & Commerce',
    category: 'AUTONOMOUS OPERATIONS',
    badge: 'AI-READY RUNTIME',
    description: 'Autonomous agent support for negotiating factoring, verifying delivery, and triggering settlement.',
    specs: ['Agent payment pointers ($pointer)', 'Verifiable credential authorization', 'Configurable spending caps']
  }
];

export const TECHNICAL_FAQS: FaqItem[] = [
  {
    category: 'INTEGRATION',
    question: 'How does Connextium integrate with SAP or Oracle ERP?',
    answer: 'Lightweight connectors (SAP S/4HANA OData & Oracle REST Cloud) trigger Verity verification events via webhooks. Upon settlement, clearing document IDs write back directly to your ERP ledger.'
  },
  {
    category: 'SECURITY',
    question: 'What is the relationship with Finux Labs specifications?',
    answer: 'Connextium is the production deployment of Finux Labs specifications—operationalizing the GTT API, Verity SCF blueprint, CDSC factoring framework, and ILP node mesh.'
  },
  {
    category: 'SETTLEMENT',
    question: 'How does the 4-stage Verity pipeline prevent fraud?',
    answer: 'Verity runs four sequential checks: (1) ERP invoice digest validation, (2) Buyer goods-receipt consensus, (3) Capital Due discount lock, and (4) Atomic ILP execution. Prevents duplicate financing and unauthorized claims.'
  },
  {
    category: 'PERFORMANCE',
    question: 'What is the settlement speed and throughput of the ILP gateway?',
    answer: 'Sub-85ms per packet hop with 10,000+ TPS capacity. Real-time bank rails (SEPA Instant, FedNow) achieve end-to-end delivery in under 5 seconds.'
  },
  {
    category: 'DEVELOPERS',
    question: 'Is there a developer sandbox available?',
    answer: 'Yes. The Finux Labs Echo Sandbox (echo-sandbox.connextium.xyz) provides mock ERP instances (SAP/Oracle), simulated rails, and real-time packet inspection.'
  }
];

