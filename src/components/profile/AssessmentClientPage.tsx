"use client";

import {
  GetEvaluationData,
  GetExercisesByAssessmentClient,
} from "@/request/profile-assessment";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import { Label } from "@/components/ui/label";

interface AssessmentClientPageProps {
  assessmentId: number;
  clientId: number;
}

export default function AssessmentClientPage({
  assessmentId,
  clientId,
}: AssessmentClientPageProps) {
  const [exerciseSelected, setExerciseSelected] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["assessment-exercises", assessmentId, clientId],
    queryFn: () => GetExercisesByAssessmentClient(assessmentId, clientId),
  });

  const { data: evaluationData } = useQuery({
    queryKey: ["evaluation-data", assessmentId, clientId, exerciseSelected],
    queryFn: () =>
      GetEvaluationData(assessmentId, exerciseSelected ?? "", clientId),
    enabled: exerciseSelected !== null,
  });

  useEffect(() => {
    if (!exerciseSelected) return;
  }, [exerciseSelected]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="px-10 py-3">
        <div className="bg-white flex py-5 rounded-md shadow-xl px-3">
          <div className="w-1/2 space-y-3">
            <Label className="font-bold">Exercises</Label>
            <Dropdown
              data={data.map((item) => ({
                value: JSON.stringify(item),
                label: item.name,
              }))}
              onChange={(value) => setExerciseSelected(value)}
              value={exerciseSelected}
            />
          </div>
        </div>
      </div>

      {}
    </>
  );
}
