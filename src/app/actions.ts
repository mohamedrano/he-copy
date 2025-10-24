'use server';

import { AnalysisPipeline, PipelineInput } from '@/lib/ai/stations/run-all-stations';

export interface PipelineRunResult {
  stationOutputs: {
    station1: any;
    station2: any;
    station3: any;
    station4: any;
    station5: any;
    station6: any;
    station7: any;
  };
  pipelineMetadata: {
    stationsCompleted: number;
    totalExecutionTime: number;
    startedAt: string;
    finishedAt: string;
  };
}

export async function runFullPipeline(input: PipelineInput): Promise<PipelineRunResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY غير موجود في متغيرات البيئة');
  }
  
  const pipeline = new AnalysisPipeline({
    apiKey,
  });
  
  const result = await pipeline.runFullAnalysis(input);
  
  return {
    stationOutputs: result.stationOutputs,
    pipelineMetadata: result.pipelineMetadata,
  };
}