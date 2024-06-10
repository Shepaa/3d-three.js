import * as THREE from 'three';
import loadingManager from './loadingManager.js';

const textureLoader = new THREE.TextureLoader(loadingManager);
export const textures = [
  textureLoader.load('/textures/fire.webp'),
  textureLoader.load('/textures/water.webp'),
  textureLoader.load('/textures/forest.webp'),
]