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
