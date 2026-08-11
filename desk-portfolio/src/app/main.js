import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 0); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const controls = new PointerLockControls(camera, document.body);

document.body.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => console.log('Pointer Locked'));
controls.addEventListener('unlock', () => console.log('Pointer Unlocked'));

const loader = new GLTFLoader();
loader.load(
    '/room.glb',
    (gltf) => {
        const room = gltf.scene;
        room.position.set(0, 0, 0); 
        scene.add(room);
    },
    undefined,
    (error) => {
        console.error('An error happened while loading the model:', error);
    }
);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
