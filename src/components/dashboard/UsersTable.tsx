"use client";

import Table, { Column } from "@/components/Table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fetchUsers } from "@/request/dashboard";
import { ClientTable, Gym } from "@/schemas/dashboard-schema";
import { columnsClientsList, columnsGymsList } from "@/utils/dashboard/columns";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersTable() {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const [information, setInformation] = useState<{
    id: number;
    type: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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

  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage, information?.id, information?.type],
    queryFn: () => fetchUsers(information!.id, information!.type, currentPage),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!information?.id && !!information?.type,
  });

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
          actions={{
            onView: (item) => {
              if (information.type === "admin") {
                router.push(`/profile/${item.id}`);
                return;
              }

              if (information.type === "gym") {
                router.push(`/profile/${item.id}`);
                return;
              }
            },
            onDelete: (item) => console.log("Delete", item),
          }}
        />
      )}
    </>
  );
}
