"use client";

import Header from "@/components/Header";
import { useAuth } from "@/providers/AuthProvider";

export default function HeaderDashboard() {
  const { userInfo: information } = useAuth();

  const title =
    information && information.type === "gym"
      ? `${information.gym_name} Dashboard`
      : "Admin Dashboard";

  return <Header title={!information ? "---" : title} menuItems={[]} />;
}
