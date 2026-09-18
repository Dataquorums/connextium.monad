import React, { useState } from 'react';
import { X, Terminal, Play, Check, Copy, RefreshCw, Shield, Database, ExternalLink } from 'lucide-react';

interface DeveloperPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperPortalModal: React.FC<DeveloperPortalModalProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('treasury');
  const [environment, setEnvironment] = useState<string>('echo-sandbox');
  const [apiKey] = useState<string>('cnx_echo_live_79a2f180be4e2');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseOutput, setResponseOutput] = useState<any>({
    status: 200,
    message: 'Echo mesh connection established. Ready for RPC calls.',
    network: 'g.connextium.echo.node-04',
    latencyMs: 72
  });

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExecute = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedEndpoint === 'treasury') {
        setResponseOutput({
          status: 200,
          statusText: 'OK',
          timestamp: new Date().toISOString(),
          allocationId: 'ADA_ALLOC_9948271',
          treasuryNode: 'GTT-US-CORP-9821',
          currency: 'USD',
          amountDisbursed: '450000.00',
          beneficiaryPointer: '$connextium.xyz/supplier/acct_882',
          consensusProof: '0x9a8f237bc81001e...4f9a',
          verityCheck: '4_EYES_CONSENSUS_VALIDATED',
          erpSyncStatus: 'POSTED_SAP_BSEG_DOC_0099412'
        });
      } else if (selectedEndpoint === 'verity') {
        setResponseOutput({
          status: 200,
          statusText: 'OK',
          timestamp: new Date().toISOString(),
          invoiceVerificationId: 'VERITY_INV_2026_09884',
          buyerAnchor: 'CORP-TESLA-SUPPLY',
          supplierAnchor: 'SUP-SEMICON-88',
          truthStatus: 'VERIFIED_GOODS_RECEIPT_MATCHED',
          doubleFinancingRisk: 'ZERO_DIGEST_UNIQUE',
          capitalDueValue: {
            faceAmount: 782000.0,
            approvedFactoringDiscountBps: 110,
            netPayable: 773398.0
          }
        });
      } else {
        setResponseOutput({
          status: 200,
          statusText: 'OK',
          timestamp: new Date().toISOString(),
          ilpPacketRoute: 'g.connextium.echo.node-04 -> sepa.instant.bridge',
          packetHops: 2,
          streamProtocol: 'ILPv4_STREAM_V2',
          clearingLatency: '68ms',
          preimageHash: 'sha256:4b19e28...0c4'
        });
      }
    }, 500);
  };

  return (
    <div
      id="developer-console-modal"
      className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="bg-[#f6f3f1] border border-[#cecac8] rounded-[32px] md:rounded-[40px] max-w-4xl w-full p-6 md:p-8 relative shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#cecac8] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#242424] flex items-center justify-center text-[#f6f3f1]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#797776]">
                INTERACTIVE CONSOLE
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl text-[#242424] font-normal leading-tight">
                Connextium Echo Testbed
              </h3>
            </div>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className="p-2 rounded-full border border-[#cecac8] text-[#797776] hover:text-[#242424] hover:bg-[#ffffff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Environment & API Key Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#cecac8] flex items-center justify-between">
            <span className="text-[#797776]">ENVIRONMENT:</span>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="bg-transparent font-medium text-[#242424] focus:outline-none cursor-pointer"
            >
              <option value="echo-sandbox">Finux Echo Sandbox (Public)</option>
              <option value="echo-staging">Finux Staging Mesh</option>
              <option value="mainnet-pre">Connextium Live Pre-Release</option>
            </select>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#cecac8] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#797776]">SANDBOX KEY:</span>
              <span className="text-[#242424] font-medium truncate">{apiKey}</span>
            </div>
            <button
              onClick={handleCopyKey}
              className="p-1 rounded text-[#797776] hover:text-[#242424] transition-colors"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-[#2b59d1]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {[
            { id: 'treasury', label: 'POST /v2/treasury/allocate', desc: 'GTT Digital Asset Accounts' },
            { id: 'verity', label: 'POST /v2/verity/verify', desc: '4-Stage Capital Consensus' },
            { id: 'ilp', label: 'GET /v2/ilp/stream', desc: 'ILPv4 Packet Clearing' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedEndpoint(tab.id)}
              className={`px-4 py-2 rounded-full border text-xs font-mono whitespace-nowrap transition-all ${
                selectedEndpoint === tab.id
                  ? 'border-[#242424] bg-[#242424] text-[#ffffff]'
                  : 'border-[#cecac8] bg-[#ffffff] text-[#4e4d4d] hover:border-[#797776]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* JSON Request & Response Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Left Request Payload */}
          <div className="p-4 rounded-2xl bg-[#000000] text-[#f6f3f1] font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-2 flex justify-between">
                <span>REQUEST PAYLOAD</span>
                <span className="text-[#a7fccd]">JSON / TLS 1.3</span>
              </div>
              <pre className="text-[#cecac8] text-[11px] leading-relaxed overflow-x-auto">
                {selectedEndpoint === 'treasury' &&
`{
  "treasuryId": "GTT-US-CORP-9821",
  "beneficiary": "$connextium.xyz/supplier/882",
  "capitalDueValue": {
    "amount": "450000.00",
    "currency": "USD"
  },
  "consensusPolicy": "VERITY_4_EYES"
}`}
                {selectedEndpoint === 'verity' &&
`{
  "documentId": "INV-2026-09884",
  "erpOrigin": "SAP_S4_HANA",
  "faceAmount": 782000.00,
  "currency": "EUR",
  "verificationStage": "BUYER_SELLER_CONSENSUS"
}`}
                {selectedEndpoint === 'ilp' &&
`{
  "destination": "$connextium.xyz/clearing/eu",
  "streamProtocol": "ILPv4_STREAM",
  "maxPacketValue": "25000.00"
}`}
              </pre>
            </div>

            <button
              onClick={handleExecute}
              disabled={isLoading}
              className="mt-4 w-full py-2.5 rounded-full bg-[#2b59d1] text-white hover:bg-[#244cb5] text-xs uppercase tracking-wider font-mono font-medium transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Call...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Endpoint</span>
                </>
              )}
            </button>
          </div>

          {/* Right Live Response */}
          <div className="p-4 rounded-2xl bg-[#000000] text-[#f6f3f1] font-mono text-xs flex flex-col">
            <div className="text-[10px] text-[#797776] uppercase tracking-wider mb-2 flex justify-between items-center">
              <span>LIVE RPC RESPONSE</span>
              <span className="text-[#a7fccd]">HTTP 200 OK</span>
            </div>
            <pre className="text-[#a7fccd] text-[11px] leading-relaxed overflow-x-auto flex-1 p-1">
              {JSON.stringify(responseOutput, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#cecac8] text-xs font-mono text-[#797776]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a7fccd]"></span>
            <span>Finux Labs Signal RPC Endpoint Operational</span>
          </div>

          <a
            href="https://finuxlabs.github.io/"
            target="_blank"
            rel="noreferrer"
            className="text-[#2b59d1] hover:underline flex items-center gap-1"
          >
            <span>Open Finux Labs Full Architecture Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
