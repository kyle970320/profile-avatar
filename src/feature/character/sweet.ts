import * as THREE from "three";

export const setupSweat = (parent: THREE.Object3D) => {
  const sweatGroup = new THREE.Group();

  const geometry = new THREE.CapsuleGeometry(0.06, 0.12, 12);
  const material = new THREE.MeshStandardMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.85,
    roughness: 0.1,
    metalness: 0.0,
  });

  for (let i = 0; i < 3; i++) {
    const drop = new THREE.Mesh(geometry, material);
    if (i === 0) {
      drop.position.set(
        0.7, // 좌우 랜덤
        0.6, // 이마 쪽
        0.82, // 얼굴 표면 살짝 앞
      );
    } else if (i === 1) {
      drop.position.set(
        -0.65, // 좌우 랜덤
        0.5, // 이마 쪽
        0.82, // 얼굴 표면 살짝 앞
      );
    } else {
      drop.position.set(
        -0.5, // 좌우 랜덤
        0.8, // 이마 쪽
        0.82, // 얼굴 표면 살짝 앞
      );
    }

    drop.userData = {
      speed: 0.002 + Math.random() * 0.002,
      startY: drop.position.y,
    };

    sweatGroup.add(drop);
  }

  parent.add(sweatGroup);
  return sweatGroup;
};
