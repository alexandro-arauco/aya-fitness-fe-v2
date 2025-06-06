"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Header from "../Header";

export default function HeaderProfile() {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");
  const title =
    information && information.type === "admin" ? "Customer" : "Member";

  return <Header title={information ? title : ""} />;
}
