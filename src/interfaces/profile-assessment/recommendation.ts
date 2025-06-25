export interface ExercisesRecommendation {
  strength_level: StrengthLevel;
}

interface StrengthLevel {
  data: { label: string; value: string }[];
}

export interface RecommendationValues {
  recommendation_values: Record<string, any>[];
}
