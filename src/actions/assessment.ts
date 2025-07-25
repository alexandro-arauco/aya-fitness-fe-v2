import axiosInstance from "@/lib/api";

export async function UploadAssessment(
  userId: string,
  trainerName: string,
  assessmentExercise: Record<string, any>[]
) {
  try {
    const formData = new FormData();

    formData.append("user_id", userId);
    formData.append("trainer_name", trainerName);

    assessmentExercise.forEach(({ exerciseId, left, right }) => {
      formData.append("exercises_ids", exerciseId.toString());

      left.forEach((leftFile: File) => {
        formData.append("left_files", leftFile);
      });

      right.forEach((rightFile: File) => {
        formData.append("right_files", rightFile);
      });
    });

    await axiosInstance.post("/assessments/", formData);
  } catch (error) {
    throw error;
  }
}

export async function DownloadAssessmentFiles(values: Record<string, any>) {
  try {
    const { data, url } = values;
    const response = await axiosInstance.post(url, data, {
      responseType: "blob", // This is crucial for file downloads
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
