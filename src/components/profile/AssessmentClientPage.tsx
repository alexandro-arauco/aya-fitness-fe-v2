"use client";

import Dropdown from "@/components/Dropdown";
import GaugeSymmetry from "@/components/profile/chart/Gauge";
import ModelBody from "@/components/profile/ModelBody";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../Logo";
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
  const pathname = usePathname();

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
      <div className="px-10 py-3 space-y-3">
        <Card className="rounded-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl mx-auto flex items-center space-x-3">
              <Logo width={150} height={150} defaultLogo="/logo.png" />
              <div className="space-x-2 mx-auto items-center">
                <div className="text-3xl font-bold text-[#FF7E06]">AYA</div>
                <div className="text-3xl font-normal italic text-[#FF7E06]">
                  FITNESS
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-2xl">
              This infographic provides a comprehensive overview of an
              individual's <span className="font-bold">strength capacity</span>.
              Understanding these data points helps in maintaining and improving
              overall health, fitness, and wellness.
            </p>
            <div className="text-center">
              <Badge className="text-2xl">
                “Health is wealth, invest wisely. ” -{" "}
                <span className="font-normal italic">Unknown</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-md shadow-xl">
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="w-1/3">
              <Dropdown
                data={data.map((item) => ({
                  value: JSON.stringify(item),
                  label: item.name,
                }))}
                onChange={(value) => setExerciseSelected(value)}
                value={exerciseSelected}
              />
            </div>

            {exerciseSelected && evaluationData ? (
              <Link
                href={`${pathname}/recommendations/${
                  JSON.parse(exerciseSelected).id
                }`}
                className="hover:border-b hover:text-blue-500 font-bold transition-transform duration-300 hover:scale-105"
              >
                See Recommendation
              </Link>
            ) : null}
          </CardContent>
        </Card>

        {exerciseSelected && evaluationData ? (
          <>
            <TrainingLevels
              levels={evaluationData.levels}
              exercise={
                (JSON.parse(exerciseSelected) as ExercisesResponse).name
              }
              trainingLevel={evaluationData.training_level}
              percentage_BW={evaluationData.percentage_BW}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2">
              {symmetryValue ? (
                <ModelBody
                  bodyPart={
                    (JSON.parse(exerciseSelected) as ExercisesResponse)
                      .body_part
                  }
                  sex={evaluationData.regression.left.sex}
                  leftWeightImpulse={
                    evaluationData.regression.left.weightImpulse
                  }
                  rightWeightImpulse={
                    evaluationData.regression.right.weightImpulse
                  }
                />
              ) : null}

              {/* Symmetry Score Card */}
              <Card className="rounded-md shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl mx-auto">
                    Symmetry Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
