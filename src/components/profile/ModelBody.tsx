"use client";

import { Card, CardContent } from "@/components/ui/card";
import ModelBodyImage from "./ModelBodyImage";
import { WeightImpulse } from "@/interfaces/profile-assessment/profile-assessment";

interface ModelBodyProps {
  bodyPart: string;
  leftWeightImpulse: WeightImpulse;
  rightWeightImpulse: WeightImpulse;
  sex: string;
}

export default function ModelBody({
  bodyPart,
  leftWeightImpulse,
  rightWeightImpulse,
  sex,
}: ModelBodyProps) {
  const side_1 = bodyPart.toLowerCase() === "back" ? "Left" : "Right";
  const side_2 = bodyPart.toLowerCase() === "back" ? "Right" : "Left";

  const getValueWeightBySide = (side: string) => {
    if (side.toLowerCase() === "left") {
      return `${leftWeightImpulse.weight.toFixed(0)} ${
        leftWeightImpulse.metric
      }`;
    }

    if (side.toLowerCase() === "right") {
      return `${rightWeightImpulse.weight.toFixed(0)} ${
        rightWeightImpulse.metric
      }`;
    }
  };

  return (
    <Card className="rounded-md shadow-xl">
      <CardContent className="flex flex-row justify-between items-center space-x-4">
        <div className="flex-1 text-end text-3xl">
          <div>{side_1}</div>
          <div className="text-xl">{getValueWeightBySide(side_1)}</div>
        </div>

        <ModelBodyImage bodyPart={bodyPart} side="left" sex={sex} />

        <div className="flex-1 text-start text-3xl">
          <div>{side_2}</div>
          <div className="text-xl">{getValueWeightBySide(side_2)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
