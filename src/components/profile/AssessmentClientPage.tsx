"use client";

import Dropdown from "@/components/Dropdown";
import GaugeSymmetry from "@/components/profile/chart/Gauge";
import ModelBody from "@/components/profile/ModelBody";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ExercisesResponse,
  RegressionResponse,
} from "@/interfaces/profile-assessment/profile-assessment";
import {
  GetEvaluationData,
  GetExercisesByAssessmentClient,
} from "@/request/profile-assessment";
import calculateSymmetry from "@/utils/assessment/calculations";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TrainingLevels from "./TrainingLevels";

interface AssessmentClientPageProps {
  assessmentId: number;
  clientId: number;
}

export default function AssessmentClientPage({
  assessmentId,
  clientId,
}: AssessmentClientPageProps) {
  const [exerciseSelected, setExerciseSelected] = useState<string | null>(null);
  const [symmetryValue, setSymmetryValue] = useState(0);

  const { data } = useQuery({
    queryKey: ["assessment-exercises", assessmentId, clientId],
    queryFn: () => GetExercisesByAssessmentClient(assessmentId, clientId),
  });

  const { data: evaluationData, isLoading } = useQuery({
    queryKey: ["evaluation-data", assessmentId, clientId, exerciseSelected],
    queryFn: () =>
      GetEvaluationData(assessmentId, exerciseSelected ?? "", clientId),
    enabled: exerciseSelected !== null,
  });

  useEffect(() => {
    if (!exerciseSelected) return;
  }, [exerciseSelected]);

  const calculateValues = () => {
    if (!evaluationData) return;

    const { regression } = evaluationData as unknown as RegressionResponse;
    const { left, right } = regression;

    setSymmetryValue(
      calculateSymmetry(left.weightImpulse.weight, right.weightImpulse.weight)
    );
  };

  useEffect(() => {
    if (!evaluationData && isLoading) return;

    calculateValues();
  }, [evaluationData, isLoading]);

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

        {exerciseSelected && evaluationData ? (
          <>
            <TrainingLevels />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2">
              {symmetryValue ? (
                <ModelBody
                  bodyPart={
                    (JSON.parse(exerciseSelected) as ExercisesResponse)
                      .body_part
                  }
                  sex={evaluationData.regression.left.sex}
                  leftWeightImpulse={evaluationData.regression.left.weightImpulse}
                  rightWeightImpulse={evaluationData.regression.right.weightImpulse}
                />
              ) : null}

              {/* Symmetry Score Card */}
              <Card className="rounded-md shadow-xl">
                <CardContent>
                  <CardTitle className="text-3xl">Symmetry Score</CardTitle>
                  <GaugeSymmetry
                    value={symmetryValue}
                    bodyPart={
                      (JSON.parse(exerciseSelected) as ExercisesResponse)
                        .body_part
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
