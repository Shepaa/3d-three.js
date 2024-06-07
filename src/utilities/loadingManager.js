import * as THREE from 'three';

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('loading started');
};
loadingManager.onLoad = () => {
  console.log('loading finished');
};
loadingManager.onProgress = () => {
  console.log('loading progressing');
};
loadingManager.onError = (url) => {
  console.error(`There was an error loading ${url}`);
};

export default loadingManager;