export interface ProcessedFile {
  fileName: string;
  textContent: string;
  size: number;
  sizeBytes: number;
  name?: string;
}

export interface AIRequest {
  agent: string;
  prompt: string;
  files: ProcessedFile[];
  params: any;
  parameters?: any;
}

export interface AIResponse {
  raw?: string;
  parsed?: any;
  agent?: string;
}

export interface Result<T> {
  ok: boolean;
  value?: T;
  error?: {
    code: string;
    message: string;
    cause?: any;
  };
}

export type AgentId = string;

export interface AIAgentCapabilities {
  canAnalyze?: boolean;
  canGenerate?: boolean;
  canTransform?: boolean;
  canPredict?: boolean;
  requiresContext?: boolean;
  multiModal?: boolean;
  requiresFiles?: boolean;
  outputType?: string;
}

export interface AIAgentConfig {
  id: string;
  name: string;
  description?: string;
  type: string;
  capabilities?: AIAgentCapabilities;
  dependencies?: string[];
  collaborators?: string[];
  enhancedBy?: string[];
  prompt?: string;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
}