"use client";

import { columnsClientsList, columnsGymsList } from "@/utils/dashboard/columns";
import Table, { Column } from "@/components/Table";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/api";
import { useEffect, useState } from "react";
import { ClientTable, Gym } from "@/schemas/dashboard-schema";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const fetchUsers = async (
  userId: number,
  userType: string,
  page: number,
  itemsPerPage: number = 10
) => {
  if (!userId || !userType) throw new Error("Missing user info");

  console.log({ userId, userType, page });

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
    },
    headers: { ...headers },
  });

  return response.data;
};

export default function UsersTable() {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const [information, setInformation] = useState<{
    id: number;
    type: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Load user information on mount and when localStorage changes
  useEffect(() => {
    const userInfo = getItem("user-info");

    if (userInfo && userInfo.id && userInfo.type) {
      setInformation({
        id: Number(userInfo.id), // Ensure it's a number
        type: userInfo.type,
      });
    } else {
      setInformation(null);
    }
  }, [getItem]);

  // Reset page when user info changes
  useEffect(() => {
    if (information) {
      setCurrentPage(1);
    }
  }, [information?.id, information?.type]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage, information?.id, information?.type],
    queryFn: () => fetchUsers(information!.id, information!.type, currentPage),
    enabled: !!information?.id && !!information?.type,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle error state
  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error loading data. Please try again.</div>;
  }

  // Handle no data
  if (!data) {
    return <></>;
  }

  type TableEntity = Gym | ClientTable;

  let columnsResponse: Column<TableEntity>[] = [];
  let dataResponse: TableEntity[] = [];

  if (information!.type === "admin") {
    columnsResponse = columnsGymsList as Column<TableEntity>[];
    dataResponse = (data.data as Gym[]) || [];
  } else if (information!.type === "gym") {
    columnsResponse = columnsClientsList as Column<TableEntity>[];
    dataResponse = (data.data as ClientTable[]) || [];
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading || !information ? (
        <div>Loading...</div>
      ) : (
        <Table<TableEntity>
          data={dataResponse}
          columns={columnsResponse}
          totalItems={data.pagination?.total_items || 0}
          itemsPerPage={data.pagination?.items_per_page || 10}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
