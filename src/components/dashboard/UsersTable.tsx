"use client";

import Table, { Column } from "@/components/Table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fetchUsers } from "@/request/dashboard";
import { ClientTable, Gym } from "@/schemas/dashboard-schema";
import { columnsClientsList, columnsGymsList } from "@/utils/dashboard/columns";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkeletonTable from "../SkeletonTable";

interface UsersTableProps {
  userId?: number;
  onSelect?: (item: ClientTable) => void | null;
}

export default function UsersTable({ userId = 0, onSelect }: UsersTableProps) {
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

  const { data: filterQuery = "" } = useQuery({
    queryKey: ["filterQuery"],
    queryFn: () => "", // dummy function
    enabled: false, // prevents it from running
    initialData: "",
  });
  const { data: filterCreatedAt = "" } = useQuery({
    queryKey: ["filterCreatedAt"],
    queryFn: () => "", // dummy function
    enabled: false, // prevents it from running
    initialData: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "users",
      currentPage,
      userId ? userId : information?.id,
      userId ? "gym" : information?.type,
      filterQuery,
      filterCreatedAt,
    ],
    queryFn: () =>
      fetchUsers(
        userId ? userId : information!.id,
        userId ? "gym" : information!.type,
        currentPage,
        filterQuery,
        filterCreatedAt
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!information?.id && !!information?.type,
  });

  // Handle no data
  if (!data) {
    return <SkeletonTable />;
  }

  type TableEntity = Gym | ClientTable;

  let columnsResponse: Column<TableEntity>[] = [];
  let dataResponse: TableEntity[] = [];

  if (userId) {
    columnsResponse = columnsClientsList as Column<TableEntity>[];
    dataResponse = (data.data as ClientTable[]) || [];
  } else {
    if (information!.type === "admin") {
      columnsResponse = columnsGymsList as Column<TableEntity>[];
      dataResponse = (data.data as Gym[]) || [];
    } else if (information!.type === "gym") {
      columnsResponse = columnsClientsList as Column<TableEntity>[];
      dataResponse = (data.data as ClientTable[]) || [];
    }
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
              if (userId && onSelect) {
                onSelect(item as ClientTable);
                return;
              }

              if (information.type === "admin") {
                router.push(`/profile/${item.id}`);
                return;
              }

              if (information.type === "gym") {
                router.push(`/profile/${item.id}`);
                return;
              }
            },
          }}
        />
      )}
    </>
  );
}
