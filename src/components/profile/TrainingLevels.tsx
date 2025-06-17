"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DonutChart from "@/components/profile/chart/Donut";
import { Progress } from "@/components/ui/progress";
import { Badge } from "../ui/badge";

export default function TrainingLevels() {
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 mt-2">
      <Card className="rounded-md shadow-xl">
        <CardContent className="space-y-10">
          <CardTitle className="text-center text-3xl font-semibold mb-4">
            Fitness Training Level
          </CardTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center justify-items-center">
            <Badge className="text-xl italic bg-[#ff9f9f] text-black">
              Level 1 (Beginner): 0 - 29%
            </Badge>
            <Badge className="text-xl italic bg-[#ffbf94] text-black">
              Level 1 (Beginner): 0 - 29%
            </Badge>
            <Badge className="text-xl italic bg-[#94f5ec] text-black">
              Level 1 (Beginner): 0 - 29%
            </Badge>
            <Badge className="text-xl italic bg-[#a7d7ff] text-black">
              Level 1 (Beginner): 0 - 29%
            </Badge>
          </div>

          <div className="flex justify-center items-center space-x-8">
            <div className="rounded-md text-6xl font-bold text-white bg-orange-400 px-3 py-5">
              29%
            </div>
            <div>
              <div className="text-2xl">Chest Press Assessment Score:</div>
              <div className="text-center text-4xl font-bold">NOVICE</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
