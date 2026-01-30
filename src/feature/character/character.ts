import * as THREE from "three";
import { setupHair } from "./hair";
import { setupEar } from "./ear";
import { setupEye } from "./eye";
import { setupAccessory } from "./accessory";
import { setupSweat } from "./sweet";
import type { CharacterProps } from "../type/character";

export const makeBlobProfile = ({
  height = 5,
  baseRadius = 1.8,
  topRadius = 0.35,
  bulge = 1.25,
  squashTop = 0.15,
  steps = 32,
} = {}) => {
  const pts: Array<THREE.Vector2> = [];

  const yMin = 0;
  const yMax = height;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = THREE.MathUtils.lerp(yMin, yMax, t);
    const belly = Math.sin(Math.PI * t);
    const taper = Math.pow(1 - t, 0.7);
    const topFlatten = 1 - squashTop * Math.pow(t, 6);

    const r =
      (topRadius +
        (baseRadius * taper + baseRadius * bulge * belly) * topFlatten) *
      0.5;

    pts.push(new THREE.Vector2(Math.max(r, 0.001), y));
  }

  return pts;
};

export const createCharacter = ({
  skinColor,
  hairColor,
  accessoryType,
  hairType,
  eyeColor,
  x,
  y,
  z = 0,
  isSweat,
}: CharacterProps) => {
  const group = new THREE.Group();

  const HEAD_RADIUS = 0.8;
  const headGeometry = new THREE.SphereGeometry(HEAD_RADIUS, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.37,
    metalness: 0.0,
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 0.5;
  head.castShadow = true;
  head.receiveShadow = true;
  group.add(head);

  const faceGroup = new THREE.Group();
  head.add(faceGroup);

  setupHair(head, hairType, hairColor);
  setupAccessory(accessoryType, head);
  setupEar(head, skinColor);

  if (isSweat) {
    setupSweat(head);
  }
  const {
    leftPupil,
    rightPupil,
    leftEyeWhite,
    rightEyeWhite,
    leftEyelid,
    rightEyelid,
  } = setupEye(faceGroup, eyeColor);

  group.position.set(x, y, z);
  group.scale.set(1.5, 1.5, 0.5);
  group.userData = {
    head: head,
    faceGroup: faceGroup,
    leftPupil: leftPupil,
    rightPupil: rightPupil,
    leftEyeWhite: leftEyeWhite,
    rightEyeWhite: rightEyeWhite,
    leftEyelid: leftEyelid,
    rightEyelid: rightEyelid,
    originalRotation: { x: 0, y: 0 },
    blinkTimer: 0,
    nextBlinkTime: 2000 + Math.random() * 4000,
    isBlinking: false,
    blinkProgress: 0,
    shakeTime: Math.random() * 1000,
    shakeIntensity: 0.04,
  };

  return group;
};
