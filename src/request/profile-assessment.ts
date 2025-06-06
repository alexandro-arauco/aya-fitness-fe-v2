import { AssessmentsResponse } from "@/interfaces/profile-assessment/profile-assessment";
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
