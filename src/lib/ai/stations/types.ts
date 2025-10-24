// src/lib/ai/stations/types.ts
import { z } from 'zod';

/**
 * مخطط Zod للتحقق من مدخلات خط الأنابيب
 * يدعم كل من البنية الجديدة والقديمة للتوافق
 */
export const PipelineInputSchema = z.object({
  // النص الرئيسي للتحليل (مطلوب)
  fullText: z.string().min(1, 'fullText is required'),

  // اسم المشروع (مطلوب)
  projectName: z.string().min(1, 'projectName is required'),

  // مسار ملف النثر (اختياري)
  proseFilePath: z.string().optional(),

  // لغة النص: افتراضي ar
  language: z.enum(['ar', 'en']).default('ar'),

  // سياق وميتا بيانات اختيارية
  context: z
    .object({
      title: z.string().optional(),
      author: z.string().optional(),
      sceneHints: z.array(z.string()).optional(),
      genre: z.string().optional(),
      description: z.string().optional(),
    })
    .optional()
    .default({}),

  // أعلام تشغيل المحطات أو الإعدادات
  flags: z
    .object({
      runStations: z.boolean().default(true),
      fastMode: z.boolean().default(false),
      skipValidation: z.boolean().default(false),
      verboseLogging: z.boolean().default(false),
    })
    .optional()
    .default({
      runStations: true,
      fastMode: false,
      skipValidation: false,
      verboseLogging: false,
    }),

  // خيارات متقدمة للوكلاء
  agents: z
    .object({
      set: z.array(z.string()).optional(), // مثل: ['characterDeepAnalyzer', ...]
      temperature: z.number().min(0).max(2).default(0.2),
      maxTokens: z.number().positive().optional(),
      model: z.string().optional(),
    })
    .optional()
    .default({ temperature: 0.2 }),
});

/**
 * نوع TypeScript المستنتج من مخطط Zod
 */
export type PipelineInput = z.infer<typeof PipelineInputSchema>;

/**
 * مخطط لمخرجات خط الأنابيب
 */
export const PipelineRunResultSchema = z.object({
  stationOutputs: z.object({
    station1: z.any(),
    station2: z.any(),
    station3: z.any(),
    station4: z.any(),
    station5: z.any(),
    station6: z.any(),
    station7: z.any(),
  }),
  pipelineMetadata: z.object({
    stationsCompleted: z.number(),
    totalExecutionTime: z.number(),
    startedAt: z.string(),
    finishedAt: z.string(),
  }),
});

export type PipelineRunResult = z.infer<typeof PipelineRunResultSchema>;

/**
 * حالات المحطات
 */
export type StationStatus = 'pending' | 'running' | 'completed' | 'error';

/**
 * دالة مساعدة لتطبيع المدخلات من صيغ مختلفة
 * تدعم حقول قديمة مثل screenplayText, text, script
 */
export function normalizePipelineInput(input: unknown): unknown {
  if (!input || typeof input !== 'object') {
    return input;
  }

  const body = input as Record<string, unknown>;

  return {
    // دعم أسماء بديلة للنص
    fullText: body.fullText ?? body.screenplayText ?? body.text ?? body.script ?? '',

    // اسم المشروع
    projectName: body.projectName ?? body.project ?? 'untitled-project',

    // مسار النثر
    proseFilePath: body.proseFilePath,

    // اللغة
    language: body.language ?? 'ar',

    // السياق
    context: {
      title: body.title,
      author: body.author,
      sceneHints: body.sceneHints,
      genre: body.genre,
      description: body.description,
      ...(typeof body.context === 'object' && body.context !== null ? body.context : {}),
    },

    // الأعلام
    flags: {
      runStations: body.runStations ?? true,
      fastMode: body.fastMode ?? false,
      skipValidation: body.skipValidation ?? false,
      verboseLogging: body.verboseLogging ?? false,
      ...(typeof body.flags === 'object' && body.flags !== null ? body.flags : {}),
    },

    // خيارات الوكلاء
    agents: {
      set: body.agentSet ?? body.agents,
      temperature: body.temperature,
      maxTokens: body.maxTokens,
      model: body.model,
      ...(typeof body.agents === 'object' && body.agents !== null && !Array.isArray(body.agents) ? body.agents : {}),
    },
  };
}

/**
 * دالة مساعدة للتحقق والتطبيع في خطوة واحدة
 */
export function validateAndNormalizePipelineInput(input: unknown): PipelineInput {
  const normalized = normalizePipelineInput(input);
  return PipelineInputSchema.parse(normalized);
}
