export interface IntegrationModule {
  id: string;
  name: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  protocols: string[];
  erpCompatibility: string[];
  latency: string;
  security: string;
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface PipelineNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'source' | 'verification' | 'treasury' | 'settlement' | 'destination';
  status: 'active' | 'synced' | 'ready';
  details: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string[];
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
