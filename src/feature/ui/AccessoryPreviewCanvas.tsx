import { memo } from "react";
import { useGetAccessoryPreview } from "../model/useGetAccessoryPreview";
import type { AccessoryType } from "../type/character";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/shared/lib/variants";

interface Props {
  accessoryType: AccessoryType;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export default memo(function AccessoryPreviewCanvas({
  accessoryType,
  width = 80,
  height = 80,
  className,
  onClick,
}: Props) {
  const { mountRef } = useGetAccessoryPreview({
    accessoryType,
    width,
    height,
  });
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "flex justify-center items-center w-full h-full overflow-hidden border-2 border-sub-bg rounded-2xl cursor-pointer",
        theme === "dark" ? "bg-[#0b1220]" : "bg-[#dddddd]",
        className,
      )}
      style={{ width, height }}
      onClick={onClick}
    >
      <div className="relative" style={{ width, height }}>
        <div ref={mountRef} className="relative w-full h-full" />
      </div>
    </div>
  );
});
