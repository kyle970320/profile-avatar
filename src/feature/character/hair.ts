import * as THREE from "three";
import type { HairType } from "../type/character";

const HEAD_RADIUS = 0.8;
function hairBald(head: THREE.Mesh, hairColor: number) {
  return { head, hairColor };
}
function hairCap(head: THREE.Mesh, hairColor: number) {
  const geo = new THREE.SphereGeometry(
    HEAD_RADIUS * 1.12,
    32,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.6,
  );

  const mat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.85,
    metalness: 0.0,
  });

  const cap = new THREE.Mesh(geo, mat);
  cap.position.set(0, 0.3, -0.22);
  cap.castShadow = true;
  cap.receiveShadow = true;

  head.add(cap);
}

function hairTwinBuns(head: THREE.Mesh, hairColor: number) {
  const mat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.9,
  });

  const bunGeo = new THREE.SphereGeometry(0.22, 16, 16);

  const left = new THREE.Mesh(bunGeo, mat);
  left.position.set(-0.45, 0.72, -0.05);
  left.castShadow = true;

  const right = new THREE.Mesh(bunGeo, mat);
  right.position.set(0.45, 0.72, -0.05);
  right.castShadow = true;

  head.add(left);
  head.add(right);
}

function hairFluffy(head: THREE.Mesh, hairColor: number) {
  const mat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 1.0,
  });

  const puffGeo = new THREE.SphereGeometry(0.22, 16, 16);
  const group = new THREE.Group();

  [
    [-0.25, 0.65, -0.05],
    [0.0, 0.78, -0.18],
    [0.28, 0.62, -0.05],
    [-0.05, 0.55, 0.08],
  ].forEach(([x, y, z]) => {
    const p = new THREE.Mesh(puffGeo, mat);
    p.position.set(x, y, z);
    p.castShadow = true;
    group.add(p);
  });

  group.position.set(0, 0.15, -0.25);
  head.add(group);
}

function hairMinimal(head: THREE.Mesh, hairColor: number) {
  const pinGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const pinMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.4,
  });

  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.set(0.28, 0.82, 0.25);
  pin.castShadow = true;

  head.add(pin);
}

export const setupHair = (
  head: THREE.Mesh,
  hairType: HairType,
  hairColor: number,
) => {
  switch (hairType) {
    case "bald":
      hairBald(head, hairColor);
      break;
    case "cap":
      hairCap(head, hairColor);
      break;
    case "twinBuns":
      hairTwinBuns(head, hairColor);
      break;
    case "fluffy":
      hairFluffy(head, hairColor);
      break;
    case "minimal":
      hairMinimal(head, hairColor);
      break;
    case "none":
      break;
    default:
      break;
  }
};
