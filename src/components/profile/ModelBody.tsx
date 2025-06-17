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

  const getValuePercentageBWBySide = (side: string) => {
    if (side.toLowerCase() === "left") {
      return `${(leftWeightImpulse.percentageBW * 100).toFixed(0)} %`;
    }

    if (side.toLowerCase() === "right") {
      return `${(rightWeightImpulse.percentageBW * 100).toFixed(0)} %`;
    }
  };

  return (
    <Card className="rounded-md shadow-xl">
      <CardContent className="flex flex-row justify-between items-center space-x-4">
        <div className="flex flex-col space-y-5">
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">1 RM:</h2>
            <h2>{getValueWeightBySide(side_1)}</h2>
          </div>
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">% BW:</h2>
            <h2>{getValuePercentageBWBySide(side_1)}</h2>
          </div>
        </div>

        <ModelBodyImage bodyPart={bodyPart} side="left" sex={sex} />

        <div className="flex flex-col space-y-5">
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">1 RM:</h2>
            <h2>{getValueWeightBySide(side_2)}</h2>
          </div>
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">% BW:</h2>
            <h2>{getValuePercentageBWBySide(side_2)}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
