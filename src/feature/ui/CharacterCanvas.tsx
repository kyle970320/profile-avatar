import { memo } from "react";
import { useGetCharacter } from "../model/useGetCharacter";
import type { AccessoryType, HairType } from "../type/character";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/shared/lib/variants";

interface Props {
  hairColor: number;
  accessoryType: AccessoryType;
  hairType: HairType;
  bgColor: number;
  eyeColor: number;
  skinColor: number;
  isSweat?: boolean;
  width?: number;
  height?: number;
  x: number;
  y: number;
  hasAnimation?: boolean;
}
export default memo(function CharacterCanvas({
  width = 160,
  height = 160,
  bgColor,
  hairColor,
  accessoryType,
  hairType,
  eyeColor,
  skinColor,
  isSweat = false,
  x,
  y,
  hasAnimation = true,
}: Props) {
  const { mountRef } = useGetCharacter({
    bgColor,
    hairColor,
    accessoryType,
    hairType,
    eyeColor,
    skinColor,
    isSweat,
    width,
    height,
    x,
    y,
    hasAnimation,
  });
  const { theme } = useTheme();
  return (
    <div
      style={{ backgroundColor: `#${bgColor.toString(16)}` }}
      className={cn(
        "flex justify-center items-center w-full h-full py-5",
        theme === "dark" ? "bg-[#0b1220]" : "bg-[#dddddd]",
      )}
    >
      <div className="relative" style={{ width, height }}>
        <div ref={mountRef} className="relative w-full h-full" />
      </div>
    </div>
  );
});
