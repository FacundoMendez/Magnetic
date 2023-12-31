import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

 
const canvas = document.querySelector('.webGlScene');

 
const size = {
  width: window.innerWidth,
  height: window.innerHeight
};

 
const scene = new THREE.Scene();

 
const camera = new THREE.PerspectiveCamera(74, size.width / size.height, 1, 1000);
camera.position.z = -9.8;  
camera.position.y = 4.8;
scene.add(camera);

 
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


 
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');  
gltfLoader.setDRACOLoader(dracoLoader);

let mobileNode
let mobileNode2

/* const material = new THREE.MeshNormalMaterial({
  color: 0xffffff,
  roughness: 0.5, // Ajusta según tus necesidades
  metalness: 0.5, // Ajusta según tus necesidades
}); */

gltfLoader.load('./model/magnetic.glb', (gltf) => {
  const magnetic = gltf.scene;
  magnetic.rotation.y = Math.PI;
  magnetic.scale.set(0.9, 0.9, 0.9);
  magnetic.castShadow = true;  

  mobileNode = magnetic.getObjectByName('mobileCel20');
  mobileNode2 = magnetic.getObjectByName('cel2');

  magnetic.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    /*   child.material = material */
    }
  });

 
  scene.add(magnetic);
});

 
 
const floorGeometry = new THREE.PlaneGeometry(18, 10);  
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 }); 
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;  
floor.position.y = 0;  
floor.receiveShadow = true; 
scene.add(floor);

 
const directionalLight = new THREE.DirectionalLight(0xFFF8EE, 33 );
directionalLight.position.set(2, 1, -5);  
directionalLight.castShadow = true;  
scene.add(directionalLight);


const directionalLight7 = new THREE.DirectionalLight(0xFFF8EE, 10);
directionalLight7.position.set( -4,12, 14);  
directionalLight7.castShadow = true;  
scene.add(directionalLight7);

const directionalLight3 = new THREE.DirectionalLight(0xFFF8EE, 30);
directionalLight3.position.set(0, 30, 27);  
directionalLight3.castShadow = false;  
scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0x10F010, 5);
directionalLight4.position.set(-5, .4, 14);  
directionalLight4.castShadow = true;  
scene.add(directionalLight4);


const directionalLight5 = new THREE.DirectionalLight(0xFFF8EE, 10);
directionalLight5.position.set(5, .1, 10); 
directionalLight5.castShadow = true;  
scene.add(directionalLight5);




const ambientLight = new THREE.AmbientLight(0xFFF8EE, 20); 
scene.add(ambientLight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const clock = new THREE.Clock()

function animate() {
  controls.update();

  const elapsedTime = clock.getElapsedTime()

  directionalLight4.position.x = Math.cos(elapsedTime) * 3;
  directionalLight4.position.y = Math.sin(elapsedTime)* 2  ;

  if(mobileNode && mobileNode2){
    mobileNode.rotation.x = Math.cos(elapsedTime) * .01;
    mobileNode.rotation.y = Math.sin(elapsedTime) * .07;

  }

  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;  


animate();