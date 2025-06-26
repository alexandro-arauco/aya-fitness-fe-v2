import axiosInstance from "@/lib/api";

export const fetchUsers = async (
  userId: number,
  userType: string,
  page: number,
  filterQuery: string,
  filterCreatedAt: string,
  itemsPerPage: number = 10
) => {
  if (!userId || !userType) throw new Error("Missing user info");

  const url = userType === "admin" ? "/admins/gyms" : `/gyms/${userId}/clients`;
  const headers =
    userType === "gym"
      ? {
          "X-User-ID": userId.toString(),
        }
      : {};

  const response = await axiosInstance.get(url, {
    params: {
      page,
      items_per_page: itemsPerPage,
      filter: filterQuery,
      filterCreatedAt: filterCreatedAt,
    },
    headers: { ...headers },
  });

  return response.data;
};
