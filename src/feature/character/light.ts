import * as THREE from "three";

export const setupLight = (world: THREE.Group) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  world.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(8, 14, 10);
  mainLight.castShadow = true;

  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;

  const d = 25;
  mainLight.shadow.camera.left = -d;
  mainLight.shadow.camera.right = d;
  mainLight.shadow.camera.top = d;
  mainLight.shadow.camera.bottom = -d;
  mainLight.shadow.camera.near = 1;
  mainLight.shadow.camera.far = 60;

  mainLight.shadow.bias = -0.0002;
  mainLight.shadow.normalBias = 0.02;

  world.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x9090ff, 0.9);
  fillLight.position.set(-5, 5, -5);
  world.add(fillLight);

  const backLight = new THREE.DirectionalLight(0xff90ff, 0.9);
  backLight.position.set(0, 5, -10);
  world.add(backLight);
};
