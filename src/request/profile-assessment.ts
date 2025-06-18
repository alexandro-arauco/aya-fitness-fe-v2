import {
  AssessmentsResponse,
  ExercisesResponse,
  RegressionResponse,
} from "@/interfaces/profile-assessment/profile-assessment";
import axiosInstance from "@/lib/api";

export async function GetClient(clientId: number) {
  try {
    const response = await axiosInstance.get(`/users/${clientId}`);
    return {
      user: response.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function GetGym(clientId: number) {
  try {
    const response = await axiosInstance.get(`/users/${clientId}`);
    return {
      user: response.data,
    };
  } catch (error) {
    throw error;
  }
}

interface ApiResponse {
  data: AssessmentsResponse[];
  pagination: {
    current_page: number;
    items_per_page: number;
    total_items: number;
    total_pages: number;
  };
}

export async function GetAssessmentByMemberId(
  clientId: number,
  page: number,
  itemsPerPage: number
) {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      `/assessments/${clientId}`,
      {
        params: {
          page,
          items_per_page: itemsPerPage,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetExercisesByAssessmentClient(
  assessmentId: number,
  clientId: number
) {
  try {
    const response = await axiosInstance.get<ExercisesResponse[]>(
      `/assessments/${assessmentId}/${clientId}/exercises`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetAllExercises() {
  try {
    const response = await axiosInstance.get<ExercisesResponse[]>(
      "/assessments/exercises/"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetEvaluationData(
  assessmentId: number,
  exerciseSelected: string,
  clientId: number
) {
  try {
    const exerciseSelectedParsed = JSON.parse(
      exerciseSelected
    ) as ExercisesResponse;

    const response = await axiosInstance.get<RegressionResponse>(
      `/assessments/regression/${assessmentId}/${exerciseSelectedParsed.id}/${clientId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
