import * as THREE from "three";
export const setupEar = (head: THREE.Mesh, color: number) => {
  // ========== 귀 추가 ==========
  const earGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  const earMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.95,
    metalness: 0.0,
  });

  // 왼쪽 귀
  const leftEar = new THREE.Mesh(earGeometry, earMaterial);
  leftEar.position.set(-0.75, 0.1, 0);
  leftEar.scale.set(0.8, 1.0, 0.6); // 약간 납작하게
  leftEar.castShadow = true;
  leftEar.receiveShadow = true;
  head.add(leftEar);

  // 오른쪽 귀
  const rightEar = new THREE.Mesh(earGeometry, earMaterial);
  rightEar.position.set(0.75, 0.1, 0);
  rightEar.scale.set(0.8, 1.0, 0.6);
  rightEar.castShadow = true;
  rightEar.receiveShadow = true;
  head.add(rightEar);
};
