"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Levels } from "@/interfaces/profile-assessment/profile-assessment";
import clsx from "clsx";

interface TrainingLevelsProps {
  levels: Levels[];
  exercise: string;
  trainingLevel: string;
  percentage_BW: number;
}

export default function TrainingLevels({
  levels,
  exercise,
  trainingLevel,
  percentage_BW,
}: TrainingLevelsProps) {
  const levelColors = {
    Beginner: "bg-[#ff9f9f]",
    Novice: "bg-[#ffbf94]",
    Intermediate: "bg-[#94f5ec]",
    Advanced: "bg-[#a7d7ff]",
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 mt-2">
      <Card className="rounded-md shadow-xl">
        <CardContent className="space-y-10">
          <CardTitle className="text-center text-3xl font-semibold mb-4">
            Strength Level
          </CardTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center justify-items-center">
            {levels.map((item, index) => (
              <Badge
                key={item.id}
                className={clsx(
                  "text-xl italic text-black",
                  `${levelColors[item.title as keyof typeof levelColors]}`
                )}
              >
                Level {item.level} ({item.title}):{" "}
                {`${
                  index !== levels.length - 1
                    ? `${item.min} - ${item.max}`
                    : `${item.min}+`
                } %`}
              </Badge>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-8">
            <div
              className={clsx(
                "rounded-md text-6xl font-bold text-white px-3 py-5",
                `${levelColors[trainingLevel as keyof typeof levelColors]}`
              )}
            >
              {percentage_BW} %
            </div>
            <div>
              <div className="text-2xl">{exercise} Assessment Score:</div>
              <div className="text-center text-4xl font-bold">
                {trainingLevel}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
