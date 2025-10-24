import { TaskType, TaskCategory } from './enums';

export const MIN_FILES_REQUIRED = 1;

export const TASKS_REQUIRING_COMPLETION_SCOPE = [
  TaskType.COMPLETION
];

export const COMPLETION_ENHANCEMENT_OPTIONS = [
  TaskType.CHARACTER_DEEP_ANALYZER,
  TaskType.DIALOGUE_ADVANCED_ANALYZER,
  TaskType.VISUAL_CINEMATIC_ANALYZER
];

export const TASK_LABELS: Record<TaskType, string> = {
  [TaskType.ANALYSIS]: 'تحليل درامي',
  [TaskType.CREATIVE]: 'إبداع محاكي',
  [TaskType.INTEGRATED]: 'تحليل متكامل',
  [TaskType.COMPLETION]: 'إكمال النص',
  [TaskType.CHARACTER_DEEP_ANALYZER]: 'تحليل الشخصيات المعمق',
  [TaskType.DIALOGUE_ADVANCED_ANALYZER]: 'تحليل الحوار المتقدم',
  [TaskType.VISUAL_CINEMATIC_ANALYZER]: 'التحليل البصري السينمائي',
  [TaskType.THEMES_MESSAGES_ANALYZER]: 'تحليل المواضيع والرسائل',
  [TaskType.CULTURAL_HISTORICAL_ANALYZER]: 'التحليل الثقافي التاريخي',
  [TaskType.PRODUCIBILITY_ANALYZER]: 'تحليل القابلية للإنتاج',
  [TaskType.TARGET_AUDIENCE_ANALYZER]: 'تحليل الجمهور المستهدف',
  [TaskType.LITERARY_QUALITY_ANALYZER]: 'تحليل الجودة الأدبية',
  [TaskType.RECOMMENDATIONS_GENERATOR]: 'مولد التوصيات'
};

export const TASK_CATEGORY_MAP: Record<TaskType, TaskCategory> = {
  [TaskType.ANALYSIS]: TaskCategory.CORE,
  [TaskType.CREATIVE]: TaskCategory.CORE,
  [TaskType.INTEGRATED]: TaskCategory.CORE,
  [TaskType.COMPLETION]: TaskCategory.CORE,
  [TaskType.CHARACTER_DEEP_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.DIALOGUE_ADVANCED_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.VISUAL_CINEMATIC_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.THEMES_MESSAGES_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.CULTURAL_HISTORICAL_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.PRODUCIBILITY_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.TARGET_AUDIENCE_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.LITERARY_QUALITY_ANALYZER]: TaskCategory.ADVANCED_MODULES,
  [TaskType.RECOMMENDATIONS_GENERATOR]: TaskCategory.ADVANCED_MODULES
};