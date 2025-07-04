"use client";

import DownloadButton from "@/components/DownloadButton";
import SkeletonTable from "@/components/SkeletonTable";
import Table from "@/components/Table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AssessmentsResponse } from "@/interfaces/profile-assessment/profile-assessment";
import { GetAssessmentByMemberId } from "@/request/profile-assessment";
import { columns } from "@/utils/profile/columns";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AssessmentsListProps {
  userId: number;
}

export default function AssessmentsList({ userId }: AssessmentsListProps) {
  const router = useRouter();
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["assessments", userId, currentPage],
    queryFn: () => GetAssessmentByMemberId(userId, currentPage),
    refetchOnMount: true,
  });

  if (!data) {
    return <SkeletonTable />;
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const CustomActionsElements = (item: AssessmentsResponse) => {
    return [
      <DownloadButton
        data={{
          assessment_id: item.id,
        }}
        url="/assessments/download-files/"
        fileName={`${getFileName(item.exercises)}_${item.created_at}.zip`}
      />,
    ];
  };

  const getFileName = (input: string) => {
    return input.replace(/, /g, "_").toLowerCase();
  };

  return (
    <Table
      className="text-sm text-left rtl:text-right text-gray-500"
      data={data.data}
      columns={columns}
      totalItems={data.pagination.total_items}
      itemsPerPage={data.pagination.items_per_page}
      currentPage={currentPage}
      onPageChange={onPageChange}
      actions={{
        onView: (item) => {
          router.push(`/profile/${userId}/assessment/${item.id}`);
        },
      }}
      customActions={
        information?.type === "admin"
          ? (item) => CustomActionsElements(item)
          : undefined
      }
    />
  );
}
