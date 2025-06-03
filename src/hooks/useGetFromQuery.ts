"use client";

import { useQueryClient } from "@tanstack/react-query";

export default function useGetFromQuery(key: string) {
  const queryClient = useQueryClient();

  return {
    information: queryClient.getQueryData([key]) as Record<string, any>,
  };
}
