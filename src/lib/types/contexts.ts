// Type definitions for context objects used across the application

export interface CharacterContext {
  name: string;
  profile?: any;
  traits?: string[];
  motivations?: string[];
  relationships?: any[];
}

export interface NarrativeContext {
  themes?: string[];
  conflicts?: any[];
  plotPoints?: any[];
  setting?: any;
}

export interface AnalysisContext {
  characters?: CharacterContext[];
  narrative?: NarrativeContext;
  metadata?: Record<string, any>;
}

export type Context = AnalysisContext;
