"use client";

import Header from "@/components/Header";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MenuItem } from "@/interfaces/menu/menu";
import { useQueryClient } from "@tanstack/react-query";
import ButtonNewAssessment from "./ButtonNewAssessment";

export default function HeaderProfile({
  userId,
  title,
}: {
  userId: number;
  title: string;
}) {
  const { getItem } = useLocalStorage<Record<string, any>>();

  const queryClient = useQueryClient();
  queryClient.setQueryData(["userId"], userId);

  const information = getItem("user-info");

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
  ];

  return (
    <Header
      title={title}
      actionsButtons={
        information && information.type === "admin" ? (
          <></>
        ) : (
          <ButtonNewAssessment />
        )
      }
      menuItems={menuItems}
    />
  );
}
