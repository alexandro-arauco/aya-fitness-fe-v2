"use client";

import Header from "@/components/Header";
import { MenuItem } from "@/interfaces/menu/menu";
import { useAuth } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import ButtonNewAssessment from "./ButtonNewAssessment";

export default function HeaderProfile({
  userId,
  title,
}: {
  userId: number;
  title: string;
}) {
  const { userInfo: information } = useAuth();

  const queryClient = useQueryClient();
  queryClient.setQueryData(["userId"], userId);

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
