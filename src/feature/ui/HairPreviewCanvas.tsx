import { memo } from "react";
import { useGetHairPreview } from "../model/useGetHairPreview";
import type { HairType } from "../type/character";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/shared/lib/variants";

interface Props {
  hairType: HairType;
  hairColor: number;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export default memo(function HairPreviewCanvas({
  hairType,
  hairColor,
  width = 80,
  height = 80,
  className,
  onClick,
}: Props) {
  const { mountRef } = useGetHairPreview({
    hairType,
    hairColor,
    width,
    height,
  });
  const { theme } = useTheme();

  return (
    <div
      style={{ width, height }}
      className={cn(
        "flex justify-center items-center w-full h-full border-2 border-sub-bg rounded-2xl cursor-pointer",
        theme === "dark" ? "bg-[#1d1d1d]" : "bg-[#ffffff]",
        className,
      )}
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ width, height }}
      >
        <div ref={mountRef} className="relative w-full h-full rounded-2xl" />
      </div>
    </div>
  );
});
