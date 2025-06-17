"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Levels } from "@/interfaces/profile-assessment/profile-assessment";
import clsx from "clsx";

interface TrainingLevelsProps {
  levels: Levels[];
  exercise: string;
}

export default function TrainingLevels({
  levels,
  exercise,
}: TrainingLevelsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 mt-2">
      <Card className="rounded-md shadow-xl">
        <CardContent className="space-y-10">
          <CardTitle className="text-center text-3xl font-semibold mb-4">
            Fitness Training Level
          </CardTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center justify-items-center">
            {levels.map((item, index) => (
              <Badge
                className={clsx(
                  "text-xl italic text-black",
                  index === 0 && "bg-[#ff9f9f]",
                  index === 1 && "bg-[#ffbf94]",
                  index === 2 && "bg-[#94f5ec]",
                  index === 3 && "bg-[#a7d7ff]"
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
            <div className="rounded-md text-6xl font-bold text-white bg-orange-400 px-3 py-5">
              29%
            </div>
            <div>
              <div className="text-2xl">{exercise} Assessment Score:</div>
              <div className="text-center text-4xl font-bold">NOVICE</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
