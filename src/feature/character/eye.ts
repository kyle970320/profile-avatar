import * as THREE from "three";

const HEAD_RADIUS = 0.8;
const EYE_SURFACE_OFFSET = 0.02;

export const setupEye = (faceGroup: THREE.Group, eyeColor: number) => {
  const eyeWhiteGeometry = new THREE.SphereGeometry(0.28, 16, 16);
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.1,
  });
  const leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);

  {
    const v = new THREE.Vector3(-0.28, 0.02, 0.8);
    v.normalize().multiplyScalar(HEAD_RADIUS + EYE_SURFACE_OFFSET);
    leftEyeWhite.position.copy(v);
  }

  leftEyeWhite.scale.set(1.2, 1.2, 0.2);
  leftEyeWhite.castShadow = true;
  leftEyeWhite.receiveShadow = true;
  faceGroup.add(leftEyeWhite);

  const rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);

  {
    const v = new THREE.Vector3(0.28, 0.02, 0.8);
    v.normalize().multiplyScalar(HEAD_RADIUS + EYE_SURFACE_OFFSET);
    rightEyeWhite.position.copy(v);
  }

  rightEyeWhite.scale.set(1.2, 1.2, 0.2);
  rightEyeWhite.castShadow = true;
  rightEyeWhite.receiveShadow = true;

  faceGroup.add(rightEyeWhite);

  const pupilGeometry = new THREE.SphereGeometry(0.22, 16, 16);
  const pupilMaterial = new THREE.MeshStandardMaterial({
    color: eyeColor,
    roughness: 0.15,
    metalness: 0.0,
  });

  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(-0.0, 0.01, 0.28);
  leftPupil.scale.set(1.0, 1.0, 0.35);
  leftPupil.rotation.z = Math.PI / 2;
  leftEyeWhite.add(leftPupil);

  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.0, 0.01, 0.28);
  rightPupil.scale.set(1.0, 1.0, 0.35);
  rightPupil.rotation.z = Math.PI / 2;
  rightEyeWhite.add(rightPupil);

  const eyeBrowGeometry = new THREE.CapsuleGeometry(0.07, 0.25, 4, 8, 1);
  const eyeBrowMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 1.1,
    metalness: 0.1,
  });

  const leftEyeBrow = new THREE.Mesh(eyeBrowGeometry, eyeBrowMaterial);
  leftEyeBrow.position.set(-0.24, 0.5, 0.7);
  leftEyeBrow.rotation.x = Math.PI / 2;
  leftEyeBrow.rotation.y = -0.1;
  leftEyeBrow.rotation.z = Math.PI / 2;
  leftEyeBrow.castShadow = true;
  leftEyeBrow.receiveShadow = true;
  faceGroup.add(leftEyeBrow);

  const rightEyeBrow = new THREE.Mesh(eyeBrowGeometry, eyeBrowMaterial);
  rightEyeBrow.position.set(0.24, 0.5, 0.7);
  rightEyeBrow.rotation.x = Math.PI / 2;
  rightEyeBrow.rotation.y = 0.1;
  rightEyeBrow.rotation.z = Math.PI / 2;
  rightEyeBrow.castShadow = true;
  rightEyeBrow.receiveShadow = true;
  faceGroup.add(rightEyeBrow);

  // ✨ 눈꺼풀 추가 (깜빡임용)
  const eyelidGeometry = new THREE.SphereGeometry(
    0.29,
    16,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2,
  );
  const eyelidMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000, // 머리 색상과 동일하게 설정하려면 faceGroup의 부모에서 가져와야 함
    roughness: 0.4,
    metalness: 0.0,
  });

  const leftEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
  leftEyelid.position.copy(leftEyeWhite.position);
  leftEyelid.scale.set(1.2, 1.2, 0.2);
  leftEyelid.rotation.x = Math.PI; // 위에서 아래로
  faceGroup.add(leftEyelid);

  const rightEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
  rightEyelid.position.copy(rightEyeWhite.position);
  rightEyelid.scale.set(1.2, 1.2, 0.2);
  rightEyelid.rotation.x = Math.PI;
  faceGroup.add(rightEyelid);

  // 초기에는 눈꺼풀 숨김
  leftEyelid.scale.y = 0.01;
  rightEyelid.scale.y = 0.01;

  return {
    leftPupil,
    rightPupil,
    leftEyeWhite,
    rightEyeWhite,
    leftEyelid,
    rightEyelid,
  };
};
