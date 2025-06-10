"use client";

import { columns } from "@/utils/profile/columns";
import Table from "@/components/Table";
import { useQuery } from "@tanstack/react-query";
import { GetAssessmentByMemberId } from "@/request/profile-assessment";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AssessmentsListProps {
  userId: number;
}

export default function AssessmentsList({ userId }: AssessmentsListProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["assessments", userId],
    queryFn: () => GetAssessmentByMemberId(userId, currentPage, 10),
    refetchOnMount: true,
  });

  if (!data) {
    return <></>;
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
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
    />
  );
}
