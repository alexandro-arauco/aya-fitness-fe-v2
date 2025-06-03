"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 120, height = 120 }: LogoProps) {
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  const logo =
    information && information.logo
      ? `data:image/png;base64,${information.logo}`
      : "/logo.png";

  return (
    <Image
      className="mx-auto"
      src={logo}
      alt="Logo Aya Fitness"
      width={width}
      height={height}
    />
  );
}
