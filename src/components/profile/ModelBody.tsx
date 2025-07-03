"use client";

import { Card, CardContent } from "@/components/ui/card";
import ModelBodyImage from "./ModelBodyImage";
import { WeightImpulse } from "@/interfaces/profile-assessment/profile-assessment";
import { Separator } from "@radix-ui/react-select";

interface ModelBodyProps {
  bodyPart: string;
  leftWeightImpulse: WeightImpulse;
  rightWeightImpulse: WeightImpulse;
  sex: string;
  symmetryValue: number;
}

export default function ModelBody({
  bodyPart,
  leftWeightImpulse,
  rightWeightImpulse,
  sex,
  symmetryValue,
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

  const getWeakSideMuscleModelBody = () => {
    const { weight: leftWeight } = leftWeightImpulse;
    const { weight: weightRight } = rightWeightImpulse;

    if (
      bodyPart.toLowerCase() !== "back" &&
      Math.abs(symmetryValue) >= 0 &&
      Math.abs(symmetryValue) <= 10
    )
      return "both";

    if (
      bodyPart.toLowerCase() === "back" &&
      Math.abs(symmetryValue) >= 0 &&
      Math.abs(symmetryValue) <= 8
    )
      return "both";

    if (bodyPart.toLowerCase() !== "back") {
      return leftWeight > weightRight ? "right" : "left";
    }

    return weightRight > leftWeight ? "left" : "right";
  };

  return (
    <Card className="rounded-md shadow-xl">
      <CardContent className="flex flex-col md:flex-row justify-center md:justify-between items-center md:space-x-4">
        <div className="hidden md:flex flex-col space-y-2 md:space-y-5">
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold mx-auto">{side_1}</h2>
          </div>
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">1 RM:</h2>
            <h2>{getValueWeightBySide(side_1)}</h2>
          </div>
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">% BW:</h2>
            <h2>{getValuePercentageBWBySide(side_1)}</h2>
          </div>
        </div>

        <ModelBodyImage
          bodyPart={bodyPart}
          side={getWeakSideMuscleModelBody()}
          sex={sex}
        />

        <div className="hidden md:flex flex-col space-y-2 md:space-y-5">
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold mx-auto">{side_2}</h2>
          </div>
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">1 RM:</h2>
            <h2>{getValueWeightBySide(side_2)}</h2>
          </div>
          <div className="flex text-2xl space-x-2 justify-between">
            <h2 className="font-bold">% BW:</h2>
            <h2>{getValuePercentageBWBySide(side_2)}</h2>
          </div>
        </div>

        <div className="flex md:hidden justify-between w-full">
          <div className="flex flex-col space-y-2 w-1/2 pr-2">
            <div className="flex text-2xl space-x-2 justify-between">
              <h2 className="font-bold mx-auto">{side_1}</h2>
            </div>
            <div className="flex text-2xl space-x-2 justify-between">
              <h2 className="font-bold">1 RM:</h2>
              <h2>{getValueWeightBySide(side_1)}</h2>
            </div>
            <div className="flex text-2xl space-x-2 justify-between">
              <h2 className="font-bold">% BW:</h2>
              <h2>{getValuePercentageBWBySide(side_1)}</h2>
            </div>
          </div>

          <div className="flex flex-col space-y-2 w-1/2 pl-2">
            <div className="flex text-2xl space-x-2 justify-between">
              <h2 className="font-bold mx-auto">{side_2}</h2>
            </div>
            <div className="flex text-2xl space-x-2 justify-between">
              <h2 className="font-bold">1 RM:</h2>
              <h2>{getValueWeightBySide(side_2)}</h2>
            </div>
            <div className="flex text-2xl space-x-2 justify-between">
              <h2 className="font-bold">% BW:</h2>
              <h2>{getValuePercentageBWBySide(side_2)}</h2>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
