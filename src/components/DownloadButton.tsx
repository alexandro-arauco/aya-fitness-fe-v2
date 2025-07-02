"use client";

import { DownloadAssessmentFiles } from "@/actions/assessment";
import { AssessmentsResponse } from "@/interfaces/profile-assessment/profile-assessment";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, Loader2 } from "lucide-react";

interface DownloadButtonProps {
  data: Record<string, any>;
  url: string;
  fileName: string;
}

export default function DownloadButton({
  data,
  url,
  fileName,
}: DownloadButtonProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: Record<string, any>) =>
      DownloadAssessmentFiles(values),
    onSuccess: async (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });

  const downloadAssessmentFiles = () => {
    mutate({ data, url });
  };

  return (
    <button onClick={() => downloadAssessmentFiles()}>
      {isPending ? (
        <Loader2 className="size-5 animate-spin text-slate-400" />
      ) : (
        <DownloadIcon className="size-5 hover:stroke-black hover:scale-110" />
      )}
    </button>
  );
}
