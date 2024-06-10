import * as THREE from 'three';
import loadingManager from './loadingManager.js';

const textureLoader = new THREE.TextureLoader(loadingManager);
export const textures = [
  textureLoader.load('/textures/fire.jpg'),
  textureLoader.load('/textures/water.jpg'),
  textureLoader.load('/textures/forest.jpg'),
]