import { useEffect, useRef } from "react";
import * as THREE from "three";

import { createCharacter } from "@/feature/character/character";
import { setupLight } from "@/feature/character/light";
import type { CharacterProps } from "@/feature/type/character";
interface Props extends CharacterProps {
  bgColor: number;
  width?: number;
  height?: number;
  hasAnimation?: boolean;
}
export const useGetCharacter = ({
  bgColor,
  hairColor,
  accessoryType,
  hairType,
  eyeColor,
  skinColor,
  isSweat = false,
  width = 160,
  height = 160,
  hasAnimation = true,
}: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasWidth = width;
  const canvasHeight = height;

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();

    const world = new THREE.Group();
    world.position.y = 1.1;
    scene.add(world);

    const camera = new THREE.PerspectiveCamera(
      10,
      canvasWidth / canvasHeight,
      0.5,
      100,
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    setupLight(world);

    const character = createCharacter({
      skinColor,
      hairColor,
      accessoryType,
      hairType,
      isSweat,
      eyeColor,
      x: 0,
      y: -2,
      z: 0,
    });
    world.add(character);

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (hasAnimation) {
        const now = performance.now();
        const deltaTime =
          now - (animate as unknown as { lastTime: number }).lastTime || 16;
        (animate as unknown as { lastTime: number }).lastTime = now;

        /** 👀 Blink */
        character.userData.blinkTimer += deltaTime;
        if (character.userData.blinkTimer >= character.userData.nextBlinkTime) {
          character.userData.isBlinking = true;
          character.userData.blinkProgress = 0;
          character.userData.blinkTimer = 0;
          character.userData.nextBlinkTime = 6000 + Math.random() * 5000;
        }

        if (character.userData.isBlinking) {
          character.userData.blinkProgress += deltaTime * 0.01;
          const blinkDuration = 850;
          let phase = (character.userData.blinkProgress * 1000) / blinkDuration;

          if (phase > 2) {
            character.userData.isBlinking = false;
            phase = 0;
          }

          const eyelidScale = phase <= 1 ? phase : 2 - phase;
          character.userData.leftEyelid.scale.y = 0.01 + eyelidScale * 1.19;
          character.userData.rightEyelid.scale.y = 0.01 + eyelidScale * 1.19;
        }

        const coldShake = 0.01;
        character.userData.shakeTime += deltaTime * coldShake;
        const shake =
          Math.sin(character.userData.shakeTime) *
          character.userData.shakeIntensity;

        character.position.x = shake * 0.6;
        character.position.y = -2 + Math.abs(shake) * 0.4;
        character.rotation.z = shake * 0.15;
        character.rotation.x = shake * 0.05;
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      renderer.forceContextLoss();
      currentMount.removeChild(renderer.domElement);
    };
  }, [
    bgColor,
    hairColor,
    accessoryType,
    hairType,
    eyeColor,
    skinColor,
    isSweat,
    canvasWidth,
    canvasHeight,
    hasAnimation,
  ]);

  return {
    mountRef,
  };
};
