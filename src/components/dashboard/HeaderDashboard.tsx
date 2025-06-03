"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Header from "../Header";

export default function HeaderDashboard() {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  const title =
    information && information.type === "gym"
      ? `${information.gym_name} Dashboard`
      : "Admin Dashboard";

  return <Header title={!information ? "---" : title} />;
}
