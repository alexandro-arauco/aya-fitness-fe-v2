"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExercisesResponse } from "@/interfaces/profile-assessment/profile-assessment";
import { GetAllExercises } from "@/request/profile-assessment";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FileAssessment from "./FileAssessment";

interface AssessmentExercise {
  exerciseId: number;
  left: File[];
  right: File[];
}

export default function ExercisesAssessment() {
  const [exerciseSelected, setExerciseSelected] = useState<ExercisesResponse[]>(
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [assessmentExercise, setAssessmentExercise] = useState<
    AssessmentExercise[]
  >([]);

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

    if (!tmp[currentIndex] && currentIndex > 0) {
      console.log("Here");
      setCurrentIndex(currentIndex - 1);
    }

    setExerciseSelected(tmp);
  };

  const onSelectFile = (key: string, value: File) => {
    const exercise = exerciseSelected[currentIndex]
      ? exerciseSelected[currentIndex]
      : null;

    if (!exercise) return;

    setAssessmentExercise((prev) => {
      const tmp = [...prev];
      const index = tmp.findIndex((item) => item.exerciseId === exercise.id);

      if (index !== -1) {
        const updated = { ...tmp[index] };
        if (key === "left") {
          updated.left = [...updated.left, value];
        } else {
          updated.right = [...updated.right, value];
        }
        tmp[index] = updated;
      } else {
        tmp.push({
          exerciseId: exercise.id,
          left: key === "left" ? [value] : [],
          right: key === "right" ? [value] : [],
        });
      }

      return tmp;
    });
  };

  const getSelectedFiles = (side: "left" | "right") => {
    const tmp = [...assessmentExercise];
    const exerciseId: number = exerciseSelected[currentIndex]
      ? exerciseSelected[currentIndex].id
      : -1;
    const index = tmp.findIndex((item) => item.exerciseId === exerciseId);

    if (index === -1) return [];

    return tmp[index][side];
  };

  return (
    <>
      <div className="flex rounded-md border border-dashed border-gray-500 py-5 px-2 space-x-4 items-center">
        {data?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={clsx(
                "flex items-center space-x-1 justify-center transition-all duration-150 py-2",
                exerciseSelected[currentIndex] &&
                  exerciseSelected[currentIndex].id === item.id &&
                  "border-b-2 border-b-gray-500"
              )}
            >
              <Checkbox
                id={`exercise-${item.id}`}
                className="border-black cursor-pointer"
                onCheckedChange={() => handleSelectExercise(item)}
              />
              <Label className="cursor-pointer" htmlFor={`exercise-${item.id}`}>
                {item.name}
              </Label>
            </div>
          );
        })}
      </div>

      {exerciseSelected.length && exerciseSelected[currentIndex] ? (
        <>
          <section className="space-y-2">
            <Label className="font-bold">Trainer Name</Label>
            <Input
              className="border-gray-300 h-10 rounded-md"
              placeholder="E.x Jhon Doe"
            />
          </section>
          <section>
            <Label className="font-bold">
              Upload Assessment to {exerciseSelected[currentIndex].name} (
              {exerciseSelected[currentIndex].body_part.toUpperCase()})
            </Label>
          </section>

          <section className="flex space-x-3">
            <FileAssessment
              key={`left-${currentIndex}`}
              title="Left Side"
              side="left"
              onSelectFile={onSelectFile}
              selectedFiles={getSelectedFiles("left")}
            />
            <FileAssessment
              key={`right-${currentIndex}`}
              title="Right Side"
              side="right"
              onSelectFile={onSelectFile}
              selectedFiles={getSelectedFiles("right")}
            />
          </section>

          <section>
            {exerciseSelected.length === 1 && <Button>Upload</Button>}
            {exerciseSelected.length > 1 && (
              <div className="space-x-2">
                <Button
                  className={clsx("cursor-pointer")}
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  Previous
                </Button>
                <Button
                  className={clsx("cursor-pointer")}
                  onClick={() => {
                    if (currentIndex + 1 > exerciseSelected.length - 1) {
                      //handleUploadAssessmentExercisesFiles();
                    } else {
                      setCurrentIndex(currentIndex + 1);
                    }
                  }}
                >
                  {currentIndex + 1 > exerciseSelected.length - 1
                    ? "Upload"
                    : "Next"}
                </Button>
              </div>
            )}
          </section>
        </>
      ) : null}
    </>
  );
}
