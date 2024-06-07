import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {sizes} from './utilities/sizes.js';
import {generateTexture} from './utilities/generateTexture.js';
import {generateGeometry} from './utilities/generateGeometry.js';
import {geometries} from './utilities/geometries.js';
import {textures} from './utilities/textures.js';
import {getUserAxisData} from './utilities/getUserAxisData.js';
import gsap from 'gsap';

const canvas = document.querySelector('canvas.webgl');
const shapeGeneratorBtn = document.querySelector('#shapeGeneratorBtn');
const explodeBtn = document.querySelector('#explodeBtn');
shapeGeneratorBtn.addEventListener('click', generateShape);
explodeBtn.addEventListener('click', explodeShapes);

const scene = new THREE.Scene();

const geometry = generateGeometry(geometries);
const material = new THREE.MeshBasicMaterial({map: generateTexture(textures)});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
let meshes = [mesh];

function generateShape() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  const shapeSize = getUserAxisData();
  meshes = [];

  for (let x = 1; x <= shapeSize.xValue; x++) {
    for (let y = 1; y <= shapeSize.yValue; y++) {
      for (let z = 1; z <= shapeSize.zValue; z++) {
        const map = generateTexture(textures);
        const mesh = new THREE.Mesh(generateGeometry(geometries),
            new THREE.MeshBasicMaterial({map}));

        mesh.position.set((x - shapeSize.xValue / 2 - 0.5) * 1.2,
            (y - shapeSize.yValue / 2 - 0.5) * 1.2,
            (z - shapeSize.zValue / 2 - 0.5) * 1.2);

        scene.add(mesh);
        meshes.push(mesh);

        camera.position.x = shapeSize.xValue + 2;
        camera.position.y = shapeSize.yValue + 2;
        camera.position.z = shapeSize.zValue + 2;
        camera.updateProjectionMatrix();
      }
    }
  }
}

function explodeShapes() {
  meshes.forEach(mesh => {
    const newPosition = mesh.position.clone();
    if (mesh.position.length() === 0) {
      newPosition.add(new THREE.Vector3(2, 2, 2));
    } else {
      const randomDirection = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
      ).normalize().multiplyScalar(10);

      newPosition.add(randomDirection);
    }

    gsap.to(mesh.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 1,
      ease: "sine.out",
    });

  });
}

window.addEventListener('resize', () => {
// Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
// Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
// Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1,
    100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
// Update controls
  controls.update();
// Render
  renderer.render(scene, camera);
// Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();