"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExercisesResponse } from "@/interfaces/profile-assessment/profile-assessment";
import { GetAllExercises } from "@/request/profile-assessment";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

export default function ExercisesAssessment() {
  const [exerciseSelected, setExerciseSelected] = useState<ExercisesResponse[]>(
    []
  );

  const { data } = useQuery({
    queryKey: ["exercises"],
    queryFn: GetAllExercises,
  });

  const handleSelectExercise = (value: ExercisesResponse) => {
    const tmp = [...exerciseSelected];
    const index = tmp.findIndex((item) => item.id === value.id);

    if (index === -1) {
      tmp.push(value);
    } else {
      tmp.splice(index, 1);
    }
    tmp.sort((a, b) => a.id - b.id);
    setExerciseSelected(tmp);
  };

  return (
    <div className="flex rounded-md border border-dashed border-black py-5 px-2 gap-3 items-center">
      {data?.map((item) => {
        const isSelected = exerciseSelected.some((ex) => ex.id === item.id);
        return (
          <div
            key={item.id}
            className={clsx(
              "flex items-center space-x-2 justify-center transition-all duration-150",
              isSelected && "border-b-2 border-b-gray-500 mb-2 pb-1"
            )}
          >
            <Checkbox
              id={`exercise-${item.id}`}
              className="border-black cursor-pointer"
              checked={isSelected}
              onCheckedChange={() => handleSelectExercise(item)}
            />
            <Label className="cursor-pointer" htmlFor={`exercise-${item.id}`}>
              {item.name}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
