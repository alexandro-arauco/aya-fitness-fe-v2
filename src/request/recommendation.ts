import {
  ExercisesRecommendation,
  RecommendationValues,
} from "@/interfaces/profile-assessment/recommendation";
import axiosInstance from "@/lib/api";

export async function GetExercisesRecommendation(
  assessmentId: number,
  exerciseId: number,
  clientId: number
) {
  try {
    const response = await axiosInstance.get<ExercisesRecommendation>(
      `/assessments/recommendation/${assessmentId}/${exerciseId}/${clientId}/`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetAssessmentRecommendation(
  assessmentId: number,
  exerciseId: number,
  clientId: number,
  exerciseRecommendationId: string | null
) {
  try {
    const response = await axiosInstance.get<RecommendationValues>(
      `/assessments/recommendation/${assessmentId}/${exerciseId}/${clientId}/${exerciseRecommendationId}/`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
