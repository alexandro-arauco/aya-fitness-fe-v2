"use client";

import { UploadAssessment } from "@/actions/assessment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExercisesResponse } from "@/interfaces/profile-assessment/profile-assessment";
import { GetAllExercises } from "@/request/profile-assessment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FileAssessment from "./FileAssessment";

interface AssessmentExercise {
  exerciseId: number;
  left: File[];
  right: File[];
}

export default function ExercisesAssessment({
  onClose,
}: {
  onClose?: () => void;
}) {
  const queryClient = useQueryClient();
  const userId = queryClient.getQueryData(["userId"]);
  const [exerciseSelected, setExerciseSelected] = useState<ExercisesResponse[]>(
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [assessmentExercise, setAssessmentExercise] = useState<
    AssessmentExercise[]
  >([]);

  const [trainerName, setTrainerName] = useState("");
  const [errorsUploadAssessmentExercise, setErrorsUploadAssessmentExercise] =
    useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ["exercises"],
    queryFn: GetAllExercises,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      UploadAssessment(userId as string, trainerName, assessmentExercise),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["assessments"],
        exact: false,
      });

      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      await handleOnSuccess();
    },
  });

  const handleOnSuccess = async () => {
    toast.success("Assessment Created successfully.", {
      position: "top-right",
    });

    if (onClose) onClose();
  };

  useEffect(() => {
    validateAssessmentsExercises();
    if (exerciseSelected.length === 0) setTrainerName("");
  }, [exerciseSelected, JSON.stringify(assessmentExercise)]);

  const validateAssessmentsExercises = () => {
    const tmp = [...assessmentExercise];
    const errors: string[] = [];

    if (!tmp.length) {
      setErrorsUploadAssessmentExercise([
        "Upload Files for the Exercises Selected",
      ]);
      return;
    }

    tmp.forEach((item) => {
      const exercise = exerciseSelected.filter(
        (value) => value.id === item.exerciseId
      );

      const totalLeftFiles = item.left.length;
      const totalRightFiles = item.right.length;

      if (totalRightFiles + totalLeftFiles !== 8) {
        errors.push(`Exercise ${exercise[0].name} has pending files to upload`);
      }
    });

    setErrorsUploadAssessmentExercise(errors);
  };

  const handleSelectExercise = (value: ExercisesResponse) => {
    const tmp = [...exerciseSelected];
    const index = tmp.findIndex((item) => item.id === value.id);

    if (index === -1) {
      tmp.push(value);
    } else {
      const tmpAssessmentExercise = [...assessmentExercise];
      const indexTmpAssessmentExercise = tmpAssessmentExercise.findIndex(
        (item) => item.exerciseId === tmp[index].id
      );

      if (indexTmpAssessmentExercise !== -1) {
        tmpAssessmentExercise.splice(indexTmpAssessmentExercise, 1);
        setAssessmentExercise(tmpAssessmentExercise);
      }

      tmp.splice(index, 1);
    }
    tmp.sort((a, b) => a.id - b.id);

    if (!tmp[currentIndex] && currentIndex > 0) {
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

  const removeSelectedFile = (key: "left" | "right", index: number) => {
    setAssessmentExercise((prev) =>
      prev
        .map((exercise) =>
          exercise.exerciseId === exerciseSelected[currentIndex].id
            ? {
                ...exercise,
                [key]: exercise[key].filter((_, i) => i !== index),
              }
            : exercise
        )
        .filter(
          (exercise) => exercise.left.length > 0 || exercise.right.length > 0
        )
    );
  };

  const handleUploadAssessment = () => {
    mutate();
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
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
            />
          </section>
          <section>
            <Label className="font-bold">
              Upload Assessment to {exerciseSelected[currentIndex].name} (
              {exerciseSelected[currentIndex].body_part.toUpperCase()})
            </Label>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full">
            <FileAssessment
              key={`left-${currentIndex}`}
              title="Left Side"
              side="left"
              onSelectFile={onSelectFile}
              selectedFiles={getSelectedFiles("left")}
              removeSelectedFile={removeSelectedFile}
            />
            <FileAssessment
              key={`right-${currentIndex}`}
              title="Right Side"
              side="right"
              onSelectFile={onSelectFile}
              selectedFiles={getSelectedFiles("right")}
              removeSelectedFile={removeSelectedFile}
            />
          </section>

          {errorsUploadAssessmentExercise.map((item, idx) => (
            <div
              key={item + idx}
              className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded p-2 my-1"
              role="alert"
              aria-live="polite"
            >
              <span aria-hidden="true" className="text-red-600">
                ⚠️
              </span>
              <p className="italic text-red-700 text-sm">
                {item}. Please ensure all required files are uploaded before
                proceeding.
              </p>
            </div>
          ))}

          <section>
            {exerciseSelected.length === 1 && (
              <Button
                className="cursor-pointer"
                disabled={errorsUploadAssessmentExercise.length > 0}
                onClick={handleUploadAssessment}
              >
                Upload
              </Button>
            )}
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
                      handleUploadAssessment();
                    } else {
                      setCurrentIndex(currentIndex + 1);
                    }
                  }}
                  disabled={
                    currentIndex + 1 > exerciseSelected.length - 1 &&
                    errorsUploadAssessmentExercise.length > 0
                  }
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
