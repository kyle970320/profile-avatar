import * as THREE from "three";
import type { AccessoryType } from "../type/character";

// 안경 추가
export const addGlasses = (head: THREE.Mesh) => {
  const glassesGroup = new THREE.Group();

  // 안경테 (왼쪽)
  const frameGeo = new THREE.TorusGeometry(0.32, 0.03, 8, 16);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.3,
    metalness: 0.6,
  });

  const leftFrame = new THREE.Mesh(frameGeo, frameMat);
  leftFrame.position.set(-0.31, 0.02, 0.75);
  leftFrame.castShadow = false;
  glassesGroup.add(leftFrame);

  // 안경테 (오른쪽)
  const rightFrame = new THREE.Mesh(frameGeo, frameMat);
  rightFrame.position.set(0.31, 0.02, 0.75);
  rightFrame.castShadow = false;
  glassesGroup.add(rightFrame);

  // 안경 브릿지 (중간 연결)
  const bridgeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
  const bridge = new THREE.Mesh(bridgeGeo, frameMat);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.02, 0.75);
  bridge.castShadow = false;
  glassesGroup.position.set(0, 0.02, 0.8);
  glassesGroup.add(bridge);

  // 렌즈 (왼쪽) - 투명하게
  const lensGeo = new THREE.CircleGeometry(0.38, 16);
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.75,
    roughness: 0.1,
    metalness: 0.9,
    side: THREE.DoubleSide,
  });

  const leftLens = new THREE.Mesh(lensGeo, lensMat);
  leftLens.position.set(-0.28, 0.02, 0.76);
  glassesGroup.add(leftLens);

  const rightLens = new THREE.Mesh(lensGeo, lensMat);
  rightLens.position.set(0.28, 0.02, 0.76);
  glassesGroup.add(rightLens);

  head.add(glassesGroup);
  return glassesGroup;
};

// 나비 넥타이 추가
export const addBowtie = (head: THREE.Mesh) => {
  const bowtieGroup = new THREE.Group();

  // 나비 넥타이 왼쪽
  const bowtieGeo = new THREE.ConeGeometry(0.15, 0.25, 4);
  const bowtieMat = new THREE.MeshStandardMaterial({
    color: 0xff4466,
    roughness: 0.6,
    metalness: 0.1,
  });

  const leftBow = new THREE.Mesh(bowtieGeo, bowtieMat);
  leftBow.position.set(-0.15, -0.65, 0.4);
  leftBow.rotation.z = Math.PI / 2;
  leftBow.castShadow = true;
  bowtieGroup.add(leftBow);

  // 나비 넥타이 오른쪽
  const rightBow = new THREE.Mesh(bowtieGeo, bowtieMat);
  rightBow.position.set(0.15, -0.65, 0.4);
  rightBow.rotation.z = -Math.PI / 2;
  rightBow.castShadow = true;
  bowtieGroup.add(rightBow);

  // 중간 매듭
  const knotGeo = new THREE.BoxGeometry(0.1, 0.15, 0.1);
  const knot = new THREE.Mesh(knotGeo, bowtieMat);
  knot.position.set(0, -0.65, 0.4);
  knot.castShadow = true;
  bowtieGroup.add(knot);

  head.add(bowtieGroup);
  return bowtieGroup;
};

// 왕관 추가
export const addCrown = (head: THREE.Mesh) => {
  const crownGroup = new THREE.Group();

  // ✅ 레퍼런스 느낌: 선명한 금색 + 약간의 코팅(하이라이트)
  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd505, // 따뜻한 금색
    metalness: 1.0,
    roughness: 0.22,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15,
    reflectivity: 0.8,
  });

  // ✅ 보라/남색 베이스 밴드
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0xffd505, // 보라/남색
    metalness: 0.15,
    roughness: 0.6,
  });

  // ===== 1) 왕관 베이스(미니) =====
  const baseGeo = new THREE.CylinderGeometry(0.28, 0.3, 0.09, 6);
  const base = new THREE.Mesh(baseGeo, goldMat);
  base.position.set(0, 0.95, 0.05); // 머리 위, 살짝 앞
  base.castShadow = true;
  crownGroup.add(base);

  // ===== 2) 보라 밴드(아래쪽 얇은 링) =====
  const bandGeo = new THREE.CylinderGeometry(0.285, 0.335, 0.135, 12);
  const band = new THREE.Mesh(bandGeo, bandMat);
  band.position.set(0, 0.91, 0.05);
  band.castShadow = true;
  crownGroup.add(band);

  // ===== 3) 스파이크 + 구슬 =====
  const spikeCount = 5; // 레퍼런스처럼 5개가 예쁨
  const spikeGeo = new THREE.ConeGeometry(0.055, 0.16, 4);
  const tipGeo = new THREE.SphereGeometry(0.04, 10, 10);

  for (let i = 0; i < spikeCount; i++) {
    const a = (i / spikeCount) * Math.PI * 2;

    const spike = new THREE.Mesh(spikeGeo, goldMat);
    spike.position.set(
      Math.sin(a) * 0.265,
      1.03,
      Math.cos(a) * 0.265 + 0.05, // 살짝 앞쪽으로
    );
    spike.castShadow = true;
    crownGroup.add(spike);

    const tip = new THREE.Mesh(tipGeo, goldMat);
    tip.position.set(Math.sin(a) * 0.265, 1.11, Math.cos(a) * 0.265 + 0.05);
    tip.castShadow = true;
    crownGroup.add(tip);
  }

  // ===== 4) 아주 살짝만 "귀엽게" 올리기 (눕히지 않음) =====
  crownGroup.rotation.y = 0.0; // ✅ 똑바로
  crownGroup.rotation.z = 0.02; // 거의 안 느껴지는 수준의 포인트

  head.add(crownGroup);
  return crownGroup;
};
// 꽃 악세사리
export const addFlower = (head: THREE.Mesh) => {
  const flowerGroup = new THREE.Group();

  // 꽃잎들
  const petalGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xff69b4,
    roughness: 0.6,
    metalness: 0.0,
  });

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const petal = new THREE.Mesh(petalGeo, petalMat);
    petal.position.set(
      Math.sin(angle) * 0.15 + 0.5,
      0.7,
      Math.cos(angle) * 0.15 + 0.3,
    );
    petal.scale.set(1, 0.5, 0.5);
    petal.castShadow = true;
    flowerGroup.add(petal);
  }

  // 꽃 중심
  const centerGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const centerMat = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    roughness: 0.4,
    metalness: 0.0,
  });
  const center = new THREE.Mesh(centerGeo, centerMat);
  center.position.set(0.5, 0.7, 0.3);
  center.castShadow = true;
  flowerGroup.add(center);

  flowerGroup.position.x = -0.3;
  flowerGroup.position.y = 0.4;
  flowerGroup.rotation.z = -0.8;

  head.add(flowerGroup);
  return flowerGroup;
};

// 야구 모자 추가
export const addCap = (head: THREE.Mesh) => {
  const capGroup = new THREE.Group();

  // 모자 윗부분 (돔)
  const domeGeo = new THREE.SphereGeometry(
    0.55,
    16,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2,
  );
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x1a75ff,
    roughness: 0.7,
    metalness: 0.1,
  });

  const dome = new THREE.Mesh(domeGeo, capMat);
  dome.position.set(0, 0.8, 0);
  dome.castShadow = true;
  dome.receiveShadow = true;
  capGroup.add(dome);

  // 챙 (visor)
  const visorGeo = new THREE.CylinderGeometry(
    0.6,
    0.65,
    0.05,
    16,
    1,
    false,
    0,
    Math.PI,
  );
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x0d4fb3,
    roughness: 0.6,
    metalness: 0.1,
  });

  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.8, 0.05);
  visor.rotation.y = -Math.PI / 2;
  visor.castShadow = true;
  capGroup.add(visor);

  // 모자 버튼 (위 중앙)
  const buttonGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x0d4fb3,
    roughness: 0.5,
  });

  const button = new THREE.Mesh(buttonGeo, buttonMat);
  button.position.set(0, 1.34, 0.2);
  button.castShadow = false;
  capGroup.add(button);

  capGroup.position.set(0, -0.18, 0);
  head.add(capGroup);
  return capGroup;
};

// 비니 모자 추가
export const addBeanie = (head: THREE.Mesh) => {
  const beanieGroup = new THREE.Group();

  // 비니 본체
  const beanieGeo = new THREE.SphereGeometry(
    0.58,
    16,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI / 1.3,
  );
  const beanieMat = new THREE.MeshStandardMaterial({
    color: 0xff6b35,
    roughness: 0.9,
    metalness: 0.0,
  });

  const beanie = new THREE.Mesh(beanieGeo, beanieMat);
  beanie.position.set(0, 0.6, 0);
  beanie.castShadow = true;
  beanie.receiveShadow = true;
  beanieGroup.add(beanie);

  // 비니 접힌 부분 (테두리)
  const foldGeo = new THREE.TorusGeometry(0.58, 0.08, 8, 16);
  const foldMat = new THREE.MeshStandardMaterial({
    color: 0xe85d24,
    roughness: 0.9,
  });

  const fold = new THREE.Mesh(foldGeo, foldMat);
  fold.position.set(0, 0.6, 0);
  fold.rotation.x = Math.PI / 2;
  fold.castShadow = true;
  beanieGroup.add(fold);

  // 폼폼 (꼭대기)
  const pompomGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const pompomMat = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    roughness: 1.0,
  });

  const pompom = new THREE.Mesh(pompomGeo, pompomMat);
  pompom.position.set(0, 1.15, 0);
  pompom.castShadow = true;
  beanieGroup.add(pompom);

  head.add(beanieGroup);
  return beanieGroup;
};

// 헤드폰 추가 🎧
export const addHeadphones = (head: THREE.Mesh) => {
  const headphonesGroup = new THREE.Group();

  // 헤드밴드
  const bandGeo = new THREE.TorusGeometry(0.9, 0.05, 8, 24, Math.PI);
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0xbbbbbb,
    roughness: 0.4,
    metalness: 0.6,
  });

  const band = new THREE.Mesh(bandGeo, bandMat);
  band.position.set(0, 0.1, 0);
  band.castShadow = true;
  headphonesGroup.add(band);

  // 이어컵(토러스 기반)
  const cupGeo = new THREE.TorusGeometry(0.12, 0.22, 16, 100);
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0xbbbbbb,
    roughness: 0.3,
    metalness: 0.7,
  });

  const leftCup = new THREE.Mesh(cupGeo, cupMat);
  leftCup.position.set(-0.9, 0, 0);
  leftCup.rotation.y = Math.PI / 2;
  leftCup.castShadow = true;
  headphonesGroup.add(leftCup);

  const rightCup = new THREE.Mesh(cupGeo, cupMat);
  rightCup.position.set(0.9, 0, 0);
  rightCup.rotation.y = Math.PI / 2;
  rightCup.castShadow = true;
  headphonesGroup.add(rightCup);

  head.add(headphonesGroup);
  return headphonesGroup;
};

// 마녀/마법사 모자 추가 🎩
export const addWizardHat = (head: THREE.Mesh) => {
  const hatGroup = new THREE.Group();

  // 모자 원뿔 부분
  const coneGeo = new THREE.ConeGeometry(0.4, 1.2, 16);
  const hatMat = new THREE.MeshStandardMaterial({
    color: 0x4b0082,
    roughness: 0.7,
    metalness: 0.1,
  });

  const cone = new THREE.Mesh(coneGeo, hatMat);
  cone.position.set(0, 1.4, 0);
  cone.castShadow = true;
  cone.receiveShadow = true;
  hatGroup.add(cone);

  // 모자 챙
  const brimGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.05, 16);
  const brim = new THREE.Mesh(brimGeo, hatMat);
  brim.position.set(0, 0.8, 0);
  brim.castShadow = true;
  hatGroup.add(brim);

  // 별 장식들
  const starShape = new THREE.Shape();
  const outerRadius = 0.1;
  const innerRadius = 0.04;

  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  const starGeo = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.02,
    bevelEnabled: false,
  });
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    roughness: 0.3,
    metalness: 0.8,
  });

  for (let i = 0; i < 3; i++) {
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(
      Math.sin(i * 2) * 0.3,
      1.2 + i * 0.2,
      Math.cos(i * 2) * 0.3,
    );
    star.rotation.z = i * 0.5;
    star.castShadow = true;
    hatGroup.add(star);
  }

  head.add(hatGroup);
  return hatGroup;
};

// 특정 캐릭터 인덱스에 맞는 악세사리 배정
export const setupAccessory = (
  accessoryType: AccessoryType,
  head: THREE.Mesh,
) => {
  switch (accessoryType) {
    case "beanie":
      return addBeanie(head);
    case "headphones":
      return addHeadphones(head);
    case "wizardHat":
      return addWizardHat(head);
    case "flower":
      return addFlower(head);
    case "crown":
      return addCrown(head);
    case "bowtie":
      return addBowtie(head);
    case "glasses":
      return addGlasses(head);
    case "none":
      return null;
    default:
      return null;
  }
};
