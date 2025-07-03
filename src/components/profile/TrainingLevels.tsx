"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="rounded-md shadow-xl">
      <CardContent className="space-y-10">
        <CardTitle className="text-center text-xl md:text-3xl font-semibold mb-4">
          Strength Level (Based on % Body Weight)
        </CardTitle>

        <div className="flex flex-wrap md:flex-row items-center justify-around md:justify-between gap-y-3 md:gap-y-0">
          {levels.map((item, index) => (
            <Badge
              key={item.id}
              className={clsx(
                "text-md md:text-xl italic text-black w-full md:w-auto",
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
              "rounded-md text-3xl md:text-6xl font-bold text-white px-3 py-5 text-center",
              `${levelColors[trainingLevel as keyof typeof levelColors]}`
            )}
          >
            {percentage_BW} %
          </div>
          <div>
            <div className="text-xl md:text-2xl text-center">{exercise} Assessment Score:</div>
            <div className="text-center text-2xl md:text-4xl font-bold">
              {trainingLevel}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
