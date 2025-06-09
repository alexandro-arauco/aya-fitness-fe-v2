"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PlusIcon } from "lucide-react";
import ButtonNewAssessment from "./ButtonNewAssessment";

export default function HeaderProfile() {
  const { getItem } = useLocalStorage<Record<string, any>>();
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
