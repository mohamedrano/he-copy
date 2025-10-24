export interface ProcessedFile {
  fileName: string;
  textContent: string;
  size: number;
  sizeBytes: number;
}

export interface AIRequest {
  agent: string;
  prompt: string;
  files: ProcessedFile[];
  params: any;
}

export interface AIResponse {
  raw?: string;
  parsed?: any;
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