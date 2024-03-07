import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 70, 100000);
camera.position.set(11.6, 12.12, 276.91);
camera.quaternion.setFromEuler(new THREE.Euler(-0.07, 0.05, 0));

// scene
const scene = new THREE.Scene();

// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/Z65Y76qitjZa8ReK/scene.splinecode',
  (splineScene) => {
    scene.add(splineScene);
  }
);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('#202125');
renderer.setClearAlpha(1);

scene.fog = new THREE.Fog('#202125', 0, 4500);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}

// Initialize WebSocket connection
const socket = new WebSocket('ws://localhost:3000'); // Use your server's address

socket.onopen = function(event) {
    console.log("Connected to WebSocket server");
};

socket.onerror = function(error) {
    console.error("WebSocket error:", error);
};

socket.onmessage = function(event) {
  console.log("WebSocket message received:", event.data);
  const imageUrl = event.data; // Assuming the message is just the URL
  updateTexture(imageUrl); // Call a function to update the texture
};
function updateTexture(imageUrl) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imageUrl, function(texture) {
      // Assuming you have direct access to a mesh or material
      // For example, if you have a mesh named 'targetMesh'
      const targetMesh = scene.getObjectByName('T_Shirt'); // Adjust with your actual mesh name
      if (targetMesh) {
          targetMesh.material.map = texture;
          targetMesh.material.needsUpdate = true;
      }
  });
}
