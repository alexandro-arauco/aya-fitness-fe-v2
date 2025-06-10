"use client";

import Header from "@/components/Header";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ButtonNewAssessment from "./ButtonNewAssessment";
import { useQueryClient } from "@tanstack/react-query";

export default function HeaderProfile({ userId }: { userId: number }) {
  const { getItem } = useLocalStorage<Record<string, any>>();

  const queryClient = useQueryClient();
  queryClient.setQueryData(["userId"], userId);

  const information = getItem("user-info");
  const title =
    information && information.type === "admin" ? "Customer" : "Member";

  return (
    <Header
      title={information ? title : ""}
      actionsButtons={<ButtonNewAssessment />}
    />
  );
}
