export type AccessoryType =
  | "beanie"
  | "headphones"
  | "wizardHat"
  | "flower"
  | "crown"
  | "bowtie"
  | "glasses"
  | "none";
export type HairType =
  | "bald"
  | "cap"
  | "twinBuns"
  | "fluffy"
  | "minimal"
  | "none";
export interface CharacterProps {
  hairColor: number;
  accessoryType: AccessoryType;
  hairType: HairType;
  eyeColor: number;
  skinColor: number;
  x: number;
  y: number;
  z?: number;
  isSweat?: boolean;
}
