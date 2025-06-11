import Image from "next/image";

interface ModelBodyProps {
  sex: string;
  side: string;
  bodyPart: string;
}

export default function ModelBody({ sex, side, bodyPart }: ModelBodyProps) {
  const source = `/model/${sex}/${bodyPart.toLowerCase()}_${side}.png`;

  return <Image src={source} alt="Body Model" width={350} height={700} />;
}
