"use client";

import Dropdown from "@/components/Dropdown";
import Logo from "@/components/Logo";
import GaugeSymmetry from "@/components/profile/chart/Gauge";
import ModelBody from "@/components/profile/ModelBody";
import TrainingLevels from "@/components/profile/TrainingLevels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";

interface AssessmentClientPageProps {
  assessmentId: number;
  clientId: number;
}

export default function AssessmentClientPage({
  assessmentId,
  clientId,
}: AssessmentClientPageProps) {
  const [exerciseSelected, setExerciseSelected] = useState<string | null>(null);
  const [symmetryValue, setSymmetryValue] = useState(-1);
  const contentRef = useRef<HTMLDivElement>(null);
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

  const getWeakerSide = () => {
    if (!exerciseSelected || !evaluationData) return 0;

    const { weight: leftWeight } =
      evaluationData?.regression.left.weightImpulse;
    const { weight: weightRight } =
      evaluationData?.regression.right.weightImpulse;

    return leftWeight > weightRight ? symmetryValue : symmetryValue * -1;
  };

  return (
    <>
      <div className="px-3 md:px-10 py-3 space-y-3">
        {!exerciseSelected ? (
          <Card className="rounded-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl mx-auto flex items-center space-x-3">
                <Logo width={200} defaultLogo="/secondary-logo.png" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-justify md:text-normal">
              <p className="text-md md:text-xl">
                This assessment summary report provides a comprehensive overview
                of an individual's{" "}
                <span className="font-bold">strength capacity</span>.
                Understanding these data points helps in maintaining and
                improving overall health, fitness, and wellness.
              </p>
              <div className="text-center">
                <Badge className="text-sm flex-1 flex-wrap">
                  “Health is wealth, invest wisely. ”{" "}
                  <span className="font-normal italic">- Unknown</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Card className="rounded-md shadow-xl">
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0">
            <div className="w-full lg:w-1/3">
              <Dropdown
                data={data.map((item) => ({
                  value: JSON.stringify(item),
                  label: item.name,
                }))}
                onChange={(value) => setExerciseSelected(value)}
                value={exerciseSelected}
                placeholder="Select an Exercise"
              />
            </div>

            {exerciseSelected && evaluationData ? (
              <div className="flex items-center space-x-2.5">
                <Button
                  className="cursor-pointer hover:text-blue-500 font-bold transition-transform duration-300 hover:scale-105 text-sm md:text-md"
                  variant="link"
                  onClick={() =>
                    generatePDF(contentRef, {
                      filename: "Strength-Assessment-Summary-Report.pdf",
                    })
                  }
                >
                  <DownloadIcon />
                  Download PDF
                </Button>
                <Link
                  href={`${pathname}/recommendations/${
                    JSON.parse(exerciseSelected).id
                  }`}
                  className="hover:border-b hover:text-blue-500 font-bold transition-transform duration-300 hover:scale-105 text-center text-sm md:text-md"
                >
                  See Recommendation
                </Link>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {exerciseSelected && evaluationData ? (
          <div ref={contentRef}>
            <TrainingLevels
              levels={evaluationData.levels}
              exercise={
                (JSON.parse(exerciseSelected) as ExercisesResponse).name
              }
              trainingLevel={evaluationData.training_level}
              percentage_BW={evaluationData.percentage_BW}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2">
              {symmetryValue !== -1 ? (
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
                  symmetryValue={getWeakerSide()}
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
                    value={getWeakerSide()}
                    bodyPart={
                      (JSON.parse(exerciseSelected) as ExercisesResponse)
                        .body_part
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
