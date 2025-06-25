"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/Dropdown";
import {
  GetAssessmentRecommendation,
  GetExercisesRecommendation,
} from "@/request/recommendation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="px-10 py-3 space-y-3">
      <Card className="rounded-md shadow-xl">
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="w-full md:w-1/3">
            <Dropdown
              data={exercisesRecommendation}
              onChange={(value) => setExerciseRecommendationSelected(value)}
              value={exerciseRecommendationSelected}
            />
          </div>
        </CardContent>
      </Card>

      {dataRecommendation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataRecommendation.recommendation_values.map((item, idx) => (
            <Card key={item.name + "-" + idx}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  {item.type} - {item.exercises.name}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {item.exercises.data &&
                        item.exercises.data[0] &&
                        HeaderTable(item.exercises.data[0]).map((header) => (
                          <TableHead key={header}>
                            {header.toUpperCase()}
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
                                    {values[header]}
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
