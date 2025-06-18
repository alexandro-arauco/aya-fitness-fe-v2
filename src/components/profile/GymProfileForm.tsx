"use client";

import { GetGym } from "@/request/profile-assessment";
import { useQuery } from "@tanstack/react-query";
import GymForm from "@/components/dashboard/GymForm";

interface GymProfileFormProps {
  userId: number;
}

export default function GymProfileForm({ userId }: GymProfileFormProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["client", userId],
    queryFn: () => GetGym(userId),
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error loading user</>;

  return (
    <GymForm userId={userId} labelAction="Update" defaultValues={data?.user} disable />
  );
}
