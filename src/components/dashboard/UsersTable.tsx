"use client";

import { columnsClientsList, columnsGymsList } from "@/utils/dashboard/columns";
import Table, { Column } from "@/components/Table";
import { useQuery } from "@tanstack/react-query";
import useGetFromQuery from "@/hooks/useGetFromQuery";
import axiosInstance from "@/lib/api";
import { useState } from "react";
import { ClientTable, Gym } from "@/schemas/dashboard-schema";

const fetchUsers = async (
  userId: number,
  userType: string,
  page: number,
  itemsPerPage: number = 10
) => {
  if (!userId || !userType) throw new Error("Missing user info");

  const url = userType === "admin" ? "/admins/gyms" : `/gyms/${userId}/clients`;
  const headers =
    userType === "gym"
      ? {
          "X-User-ID": userId,
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
  const { information } = useGetFromQuery("user-info");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage, information?.id, information?.type],
    queryFn: () => fetchUsers(information.id, information.type, currentPage),
    retryOnMount: true,
    enabled: information !== undefined,
  });

  if (!information) return;

  type TableEntity = Gym | ClientTable;

  let columnsResponse: Column<TableEntity>[] = [];
  let dataResponse: TableEntity[] = [];

  if (information.type === "admin") {
    columnsResponse = columnsGymsList as Column<TableEntity>[];
    dataResponse = data.data as Gym[];
  } else {
    console.log({ data });
    columnsResponse = columnsClientsList as Column<TableEntity>[];
    dataResponse = data.data as ClientTable[];
  }

  const onPageChance = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {data && !isLoading ? (
        <Table<TableEntity>
          data={dataResponse || []}
          columns={columnsResponse}
          totalItems={data.pagination.total_items}
          itemsPerPage={data.pagination.items_per_page}
          onPageChange={onPageChance}
          currentPage={currentPage}
        />
      ) : null}
    </>
  );
}
