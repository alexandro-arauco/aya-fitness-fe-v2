export interface ExercisesRecommendation {
  strength_level: StrengthLevel;
}

interface StrengthLevel {
  data: { label: string; value: string }[];
  cable?: number;
  dumbbell?: number;
  barbell?: number;
  dumbbellSplitSquat?: number;
  dumbbellSquat?: number;
  deadlift?: number;
  metric: string;
}

export interface RecommendationValues {
  recommendation_values: Record<string, any>[];
}
