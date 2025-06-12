"use client";

import Dropdown from "@/components/Dropdown";
import DonutChart from "@/components/profile/chart/Donut";
import GaugeSymmetry from "@/components/profile/chart/Gauge";
import ModelBody from "@/components/profile/ModelBody";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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

    const { left, right } = evaluationData as unknown as RegressionResponse;
    const averageLeftROFD = (
      left.data.reduce((acc, current) => acc + current.rofd, 0) /
      left.data.length
    ).toFixed(0);

    const averageRightROFD = (
      right.data.reduce((acc, current) => acc + current.rofd, 0) /
      right.data.length
    ).toFixed(0);

    setSymmetryValue(calculateSymmetry(+averageLeftROFD, +averageRightROFD));
  };

  useEffect(() => {
    if (!evaluationData && isLoading) return;

    calculateValues();
  }, [evaluationData, isLoading]);

  if (!data) {
    return <></>;
  }

  const getLeftValueWeight = () => {
    if (!exerciseSelected) return 0;
    const exercise = JSON.parse(exerciseSelected) as ExercisesResponse;

    const bodyPart = exercise.body_part.toLowerCase();

    if (bodyPart === "back") {
      return evaluationData?.left.weightImpulse.weight.toFixed(0);
    } else {
      return evaluationData?.right.weightImpulse.weight.toFixed(0);
    }
  };

  const getRightValueWeight = () => {
    if (!exerciseSelected) return 0;
    const exercise = JSON.parse(exerciseSelected || "") as ExercisesResponse;

    const bodyPart = exercise.body_part.toLowerCase();

    if (bodyPart === "back") {
      return evaluationData?.right.weightImpulse.weight.toFixed(0);
    } else {
      return evaluationData?.left.weightImpulse.weight.toFixed(0);
    }
  };

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

        {exerciseSelected ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2">
              <Card className="rounded-md shadow-xl">
                <CardContent className="flex flex-row justify-between items-center space-x-4">
                  {/* Left side */}
                  <div className="flex-1 text-end text-3xl">
                    <div>
                      {(() => {
                        try {
                          const exercise = JSON.parse(
                            exerciseSelected || ""
                          ) as ExercisesResponse;
                          return exercise.body_part.toLowerCase() === "back"
                            ? "Left"
                            : "Right";
                        } catch {
                          return "";
                        }
                      })()}
                    </div>
                    <div className="text-xl">
                      {`${getLeftValueWeight()} ${
                        evaluationData?.left?.metric ?? ""
                      }`}
                    </div>
                  </div>

                  {/* Model */}
                  {evaluationData && (
                    <ModelBody
                      bodyPart={(() => {
                        try {
                          return (
                            JSON.parse(
                              exerciseSelected || ""
                            ) as ExercisesResponse
                          ).body_part;
                        } catch {
                          return "";
                        }
                      })()}
                      side="left"
                      sex={evaluationData.left?.sex ?? ""}
                    />
                  )}

                  {/* Right side */}
                  <div className="flex-1 text-start text-3xl">
                    <div>
                      {(() => {
                        try {
                          const exercise = JSON.parse(
                            exerciseSelected || ""
                          ) as ExercisesResponse;
                          return exercise.body_part.toLowerCase() === "back"
                            ? "Right"
                            : "Left";
                        } catch {
                          return "";
                        }
                      })()}
                    </div>
                    <div className="text-xl">
                      {`${getRightValueWeight()} ${
                        evaluationData?.left?.metric ?? ""
                      }`}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Symmetry Score Card */}
              <Card className="rounded-md shadow-xl">
                <CardContent>
                  <CardTitle className="text-3xl">Symmetry Score</CardTitle>
                  <GaugeSymmetry value={symmetryValue} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-2 md:gap-4 mt-2">
              <Card className="rounded-md shadow-xl">
                <CardContent className="space-y-10">
                  <CardTitle className="text-center text-3xl font-semibold mb-4">
                    Fitness Training Level
                  </CardTitle>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center justify-items-center">
                    <div>
                      <DonutChart value={25} color="red" />
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold">Beginner</h2>
                        <Progress value={25} />
                      </div>
                    </div>

                    <div>
                      <DonutChart value={50} color="orange" />
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold">Novice</h2>
                        <Progress value={50} />
                      </div>
                    </div>

                    <div>
                      <DonutChart value={75} color="blue" />
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold">Intermediate</h2>
                        <Progress value={75} />
                      </div>
                    </div>

                    <div>
                      <DonutChart value={100} color="green" />
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold">Advanced</h2>
                        <Progress value={100} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-center">Individual Component</h2>
                    <div>
                      <DonutChart value={75} color="blue" />
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-center">Intermediate</h2>
                        <Progress value={75} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
