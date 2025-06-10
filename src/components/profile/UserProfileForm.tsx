"use client";

import { useQuery } from "@tanstack/react-query";
import UserForm from "@/components/dashboard/UserForm";
import { GetClient } from "@/request/profile-assessment";

interface UserProfilePromProps {
  userId: number;
}

export default function UserProfileForm({ userId }: UserProfilePromProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["client", userId],
    queryFn: () => GetClient(userId),
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error loading user</>;

  return (
    <UserForm userId={userId} defaultValues={data?.user} labelAction="Update" />
  );
}
