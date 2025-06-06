"use client";

import UserForm from "../dashboard/UserForm";

interface UserProfilePromProps {
  userId: number;
}

export default function UserProfileForm({ userId }: UserProfilePromProps) {
  return <UserForm userId={1} />;
}
