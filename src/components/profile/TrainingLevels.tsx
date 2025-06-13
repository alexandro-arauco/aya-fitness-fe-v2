"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DonutChart from "@/components/profile/chart/Donut";
import { Progress } from "@/components/ui/progress";

export default function TrainingLevels() {
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 mt-2">
      <Card className="rounded-md shadow-xl">
        <CardContent className="space-y-10">
          <CardTitle className="text-center text-3xl font-semibold mb-4">
            Fitness Training Level
          </CardTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center justify-items-center">
            <div>
              <DonutChart value={25} color="red" />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Beginner</h2>
                <Progress value={25} />
              </div>
            </div>

            <div>
              <DonutChart value={50} color="orange" />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Novice</h2>
                <Progress value={50} />
              </div>
            </div>

            <div>
              <DonutChart value={75} color="blue" />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Intermediate</h2>
                <Progress value={75} />
              </div>
            </div>

            <div>
              <DonutChart value={100} color="green" />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Advanced</h2>
                <Progress value={100} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
