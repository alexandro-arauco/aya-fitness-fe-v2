"use client";

import Header from "@/components/Header";
import { MenuItem } from "@/interfaces/menu/menu";
import { useSearchParams } from "next/navigation";

interface HeaderAssessmentListProps {
  client_id: number;
}

export default function HeaderAssessmentList({
  client_id,
}: HeaderAssessmentListProps) {
  const searchParams = useSearchParams();
  const gymId = searchParams.get("gym");

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      label: "Member Profile",
      link: `/profile/${gymId ? gymId : client_id}`,
    },
  ];

  return (
    <Header title="Strength Assessment Summary Report" menuItems={menuItems} />
  );
}
