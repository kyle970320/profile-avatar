import { useEffect, useRef } from "react";
import * as THREE from "three";

import { setupAccessory } from "@/feature/character/accessory";
import { setupLight } from "@/feature/character/light";
import { useTheme } from "@/contexts/ThemeContext";
import type { AccessoryType } from "@/feature/type/character";

interface Props {
  accessoryType: AccessoryType;
  width?: number;
  height?: number;
}

/**
 * 악세사리 미리보기용 캐릭터 생성 (얼굴형 + 악세사리만)
 */
const createAccessoryPreview = ({
  accessoryType,
}: {
  accessoryType: AccessoryType;
}) => {
  const group = new THREE.Group();

  // 기본 얼굴형 (머리)
  const HEAD_RADIUS = 0.8;
  const headGeometry = new THREE.SphereGeometry(HEAD_RADIUS, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({
    color: 0xfddbbe,
    roughness: 0.37,
    metalness: 0.0,
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 0.5;
  group.add(head);

  // 악세사리만 추가 (눈, 귀, 헤어 등은 제외)
  setupAccessory(accessoryType, head);

  group.position.set(0, -2, 0);
  group.scale.set(1.5, 1.5, 0.5);

  return group;
};

export const useGetAccessoryPreview = ({
  accessoryType,
  width = 80,
  height = 80,
}: Props) => {
  const { theme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();

    const world = new THREE.Group();
    world.position.x = 0;
    world.position.y = 0.6;
    scene.add(world);

    const camera = new THREE.PerspectiveCamera(10, width / height, 0.5, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(theme === "dark" ? 0xdddddd : 0xffffff, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    setupLight(world);

    const character = createAccessoryPreview({
      accessoryType,
    });
    world.add(character);

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      renderer.forceContextLoss();
      currentMount.removeChild(renderer.domElement);
    };
  }, [accessoryType, width, height, theme]);

  return {
    mountRef,
  };
};
