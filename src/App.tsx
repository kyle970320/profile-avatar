import { useRef, useState } from "react";
import CharacterCanvas from "@/feature/ui/CharacterCanvas";
import type { AccessoryType } from "@/feature/type/character";
import type { HairType } from "@/feature/type/character";
import { cn } from "@/shared/lib/variants";
import { produce } from "immer";
import ColorPannel from "@/components/ColorPannel";
import { BG_COLORS, HAIR_COLORS, SKIN_COLORS } from "@/feature/config/colors";
import HairPreviewCanvas from "@/feature/ui/HairPreviewCanvas";
import AccessoryPreviewCanvas from "@/feature/ui/AccessoryPreviewCanvas";
import "@/index.css";

const ALLOWED_ACCESSORIES_FOR_HAIR: Partial<Record<HairType, AccessoryType[]>> =
  {
    cap: ["headphones", "glasses", "none"],
  };

const isAccessoryAllowedForHair = (
  hairType: string,
  accessoryType: string,
): boolean => {
  const allowed = ALLOWED_ACCESSORIES_FOR_HAIR[hairType as HairType];
  if (!allowed) return true;
  return allowed.includes(accessoryType as AccessoryType);
};

export default function App() {
  const characterWrapperRef = useRef<HTMLDivElement | null>(null);
  const [profileState, setProfileState] = useState<Record<string, string>>({
    bgColor: "dddddd",
    hairColor: "000000",
    accessoryType: "none",
    hairType: "none",
    eyeColor: "000000",
    skinColor: "fddbbe",
    isSweat: "false",
  });

  const handleProfileState = (key: string, value: string) => {
    setProfileState(
      produce((draft) => {
        draft[key] = value;
      }),
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background custom-scrollbar overflow-y-auto">
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <ColorPannel
            state={profileState}
            title="피부색"
            items={SKIN_COLORS}
            handleProfileState={handleProfileState}
          />
        </div>
        <div className="mb-4">
          <p className="text-foreground mb-2">헤어스타일</p>
          <div className="flex gap-2">
            <HairPreviewCanvas
              hairType="bald"
              hairColor={parseInt(profileState.hairColor, 16)}
              width={44}
              height={44}
              onClick={() => handleProfileState("hairType", "bald")}
            />
            <HairPreviewCanvas
              hairType="cap"
              hairColor={parseInt(profileState.hairColor, 16)}
              width={44}
              height={44}
              onClick={() =>
                setProfileState(
                  produce((draft) => {
                    draft.hairType = "cap";
                    // cap 헤어일 때는 악세사리를 headphones/glasses 중 하나로 강제
                    if (
                      draft.accessoryType !== "headphones" &&
                      draft.accessoryType !== "glasses"
                    ) {
                      draft.accessoryType = "headphones";
                    }
                  }),
                )
              }
            />
            <HairPreviewCanvas
              hairType="twinBuns"
              hairColor={parseInt(profileState.hairColor, 16)}
              width={44}
              height={44}
              onClick={() => handleProfileState("hairType", "twinBuns")}
            />
            <HairPreviewCanvas
              hairType="fluffy"
              hairColor={parseInt(profileState.hairColor, 16)}
              width={44}
              height={44}
              onClick={() => handleProfileState("hairType", "fluffy")}
            />
            <HairPreviewCanvas
              hairType="minimal"
              hairColor={parseInt(profileState.hairColor, 16)}
              width={44}
              height={44}
              onClick={() => handleProfileState("hairType", "minimal")}
            />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-foreground mb-2">악세서리</p>
          <div className="flex flex-wrap gap-2">
            <AccessoryPreviewCanvas
              accessoryType="none"
              width={44}
              height={44}
              className={cn(
                !isAccessoryAllowedForHair(profileState.hairType, "none") &&
                  "opacity-40 cursor-not-allowed",
              )}
              onClick={() => {
                if (!isAccessoryAllowedForHair(profileState.hairType, "none")) {
                  return;
                }
                handleProfileState("accessoryType", "none");
              }}
            />
            <AccessoryPreviewCanvas
              accessoryType="beanie"
              width={44}
              height={44}
              className={cn(
                !isAccessoryAllowedForHair(profileState.hairType, "beanie") &&
                  "opacity-40 cursor-not-allowed",
              )}
              onClick={() => {
                if (
                  !isAccessoryAllowedForHair(profileState.hairType, "beanie")
                ) {
                  return;
                }
                handleProfileState("accessoryType", "beanie");
              }}
            />
            <AccessoryPreviewCanvas
              accessoryType="headphones"
              width={44}
              height={44}
              onClick={() => handleProfileState("accessoryType", "headphones")}
            />
            <AccessoryPreviewCanvas
              accessoryType="wizardHat"
              width={44}
              height={44}
              className={cn(
                !isAccessoryAllowedForHair(
                  profileState.hairType,
                  "wizardHat",
                ) && "opacity-40 cursor-not-allowed",
              )}
              onClick={() => {
                if (
                  !isAccessoryAllowedForHair(profileState.hairType, "wizardHat")
                ) {
                  return;
                }
                handleProfileState("accessoryType", "wizardHat");
              }}
            />
            <AccessoryPreviewCanvas
              accessoryType="flower"
              width={44}
              height={44}
              className={cn(
                !isAccessoryAllowedForHair(profileState.hairType, "flower") &&
                  "opacity-40 cursor-not-allowed",
              )}
              onClick={() => {
                if (
                  !isAccessoryAllowedForHair(profileState.hairType, "flower")
                ) {
                  return;
                }
                handleProfileState("accessoryType", "flower");
              }}
            />
            <AccessoryPreviewCanvas
              accessoryType="crown"
              width={44}
              height={44}
              className={cn(
                !isAccessoryAllowedForHair(profileState.hairType, "crown") &&
                  "opacity-40 cursor-not-allowed",
              )}
              onClick={() => {
                if (
                  !isAccessoryAllowedForHair(profileState.hairType, "crown")
                ) {
                  return;
                }
                handleProfileState("accessoryType", "crown");
              }}
            />
            <AccessoryPreviewCanvas
              accessoryType="glasses"
              width={44}
              height={44}
              onClick={() => handleProfileState("accessoryType", "glasses")}
            />
          </div>
        </div>
        <div className="mb-4">
          <ColorPannel
            state={profileState}
            title="헤어색"
            items={HAIR_COLORS}
            handleProfileState={handleProfileState}
          />
        </div>
        <div className="mb-4">
          <ColorPannel
            state={profileState}
            title="배경색"
            items={BG_COLORS}
            handleProfileState={handleProfileState}
          />
        </div>
        <div ref={characterWrapperRef} className="mb-4">
          <CharacterCanvas
            hasAnimation={false}
            skinColor={parseInt(profileState.skinColor, 16)}
            bgColor={parseInt(profileState.bgColor, 16)}
            hairColor={parseInt(profileState.hairColor, 16)}
            accessoryType={profileState.accessoryType as AccessoryType}
            hairType={profileState.hairType as HairType}
            eyeColor={parseInt(profileState.eyeColor, 16)}
            isSweat={profileState.isSweat === "true" ? true : false}
            x={0}
            y={0}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 px-4 pb-4">
        <button
          onClick={async () => {
            const canvas = characterWrapperRef.current?.querySelector(
              "canvas",
            ) as HTMLCanvasElement | null;
            if (!canvas) {
              console.warn("[SETTING] save: canvas not found");
              return;
            }

            const dataUrl = canvas.toDataURL("image/png");
            console.log(dataUrl);
          }}
          className="bg-main text-foreground px-4 py-2 rounded-md"
        >
          <p>저장</p>
        </button>
      </div>
    </div>
  );
}
