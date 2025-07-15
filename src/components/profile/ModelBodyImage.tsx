import Image from "next/image";

interface ModelBodyImageProps {
  sex: string;
  side: string;
  bodyPart: string;
}

export default function ModelBodyImage({
  sex,
  side,
  bodyPart,
}: ModelBodyImageProps) {
  const source = `/model/${bodyPart.toLowerCase()}_${side}.png`;

  return (
    <Image
      src={source}
      alt="Body Model"
      width={bodyPart.toLowerCase() === "legs" ? 200 : 350}
      height={700}
    />
  );
}
