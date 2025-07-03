"use client";

import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetAssessmentRecommendation,
  GetExercisesRecommendation,
} from "@/request/recommendation";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";

interface RecomendationPageProps {
  clientId: number;
  assessmentId: number;
  exerciseId: number;
}

export default function RecommendationPage({
  clientId,
  assessmentId,
  exerciseId,
}: RecomendationPageProps) {
  const [exercisesRecommendation, setExercisesRecommendation] = useState<
    { value: string; label: string }[]
  >([]);

  const [exerciseRecommendationSelected, setExerciseRecommendationSelected] =
    useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ["exercise-recommendation", clientId, assessmentId, exerciseId],
    queryFn: () =>
      GetExercisesRecommendation(assessmentId, exerciseId, clientId),
    retryOnMount: true,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { data: dataRecommendation } = useQuery({
    queryKey: [
      "recommendation",
      clientId,
      assessmentId,
      exerciseId,
      exerciseRecommendationSelected,
    ],
    queryFn: () =>
      GetAssessmentRecommendation(
        assessmentId,
        exerciseId,
        clientId,
        exerciseRecommendationSelected
      ),
    retryOnMount: true,
    enabled: exerciseRecommendationSelected !== null,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!data) return;

    const { strength_level } = data;
    setExercisesRecommendation(strength_level.data);
  }, [data]);

  const HeaderTable = (item: Record<string, any>) => {
    return Object.keys(item);
  };

  return (
    <div className="px-3 md:px-10 py-3 space-y-3">
      <Card className="rounded-md shadow-xl">
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
          <div className="w-full md:w-1/3">
            <Dropdown
              data={exercisesRecommendation}
              onChange={(value) => setExerciseRecommendationSelected(value)}
              value={exerciseRecommendationSelected}
            />
          </div>
          {exerciseRecommendationSelected ? (
            <div className="flex justify-between md:justify-normal items-center">
              <div className="text-xl font-bold items-center">
                {`1RM Value = 
                ${
                  exerciseRecommendationSelected &&
                  (data?.strength_level as Record<string, any>)[
                    exerciseRecommendationSelected
                  ].toFixed(0)
                } ${data?.strength_level.metric.toUpperCase()}`}
              </div>
              <Button
                className="text-xl cursor-pointer hover:text-blue-500 font-bold transition-transform duration-300 hover:scale-105"
                variant="link"
                onClick={() =>
                  generatePDF(contentRef, {
                    filename: `assessments_recommendation_${
                      exercisesRecommendation.find(
                        (item) => item.value === exerciseRecommendationSelected
                      )?.label
                    }.pdf`,
                  })
                }
              >
                <DownloadIcon />
                Download PDF
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {dataRecommendation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" ref={contentRef}>
          {dataRecommendation.recommendation_values.map((item, idx) => (
            <Card key={item.name + "-" + idx} className="rounded-md shadow-xl">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {item.exercises.data &&
                        item.exercises.data[0] &&
                        HeaderTable(item.exercises.data[0]).map((header) => (
                          <TableHead key={header}>
                            {header.includes("weight")
                              ? `${header.toUpperCase()} (${data?.strength_level.metric.toUpperCase()})`
                              : header.toUpperCase()}
                          </TableHead>
                        ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {item.exercises.data &&
                      item.exercises.data.map(
                        (values: Record<string, any>, rowIdx: number) => (
                          <TableRow key={rowIdx}>
                            {item.exercises.data[0] &&
                              HeaderTable(item.exercises.data[0]).map(
                                (header) => (
                                  <TableCell key={header}>
                                    {values[header] === 0
                                      ? "No data available."
                                      : values[header]}
                                  </TableCell>
                                )
                              )}
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
