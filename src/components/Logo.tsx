import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 120, height = 120 }: LogoProps) {
  return (
    <Image
      className="mx-auto"
      src="/logo.png"
      alt="Logo Aya Fitness"
      width={width}
      height={height}
    />
  );
}
