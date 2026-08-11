import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#000000', 4, 12);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2.2, 3.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x2b3958, 0.15);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x5c7aaa, 0.3);
directionalLight.position.set(-2, 6, 5);
scene.add(directionalLight);

const flashlight = new THREE.SpotLight(0xffe8a3, 300);
flashlight.angle = Math.PI / 14;
flashlight.penumbra = 0.15;
flashlight.castShadow = true;
scene.add(flashlight);

const lightTarget = new THREE.Object3D();
scene.add(lightTarget);
flashlight.target = lightTarget;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const loader = new GLTFLoader();
loader.load(
    '/room.glb',
    (gltf) => {
        const room = gltf.scene;
        room.position.set(0, -2, 0);
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

    const basePitch = -0.35;
    const maxPitch = Math.PI / 6;
    const maxYaw = Math.PI / 4;

    camera.rotation.x = basePitch + mouse.y * maxPitch;
    camera.rotation.y = -mouse.x * maxYaw;

    flashlight.position.copy(camera.position);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        lightTarget.position.copy(intersects[0].point);
    } else {
        const fallbackPos = new THREE.Vector3();
        raycaster.ray.at(5, fallbackPos);
        lightTarget.position.copy(fallbackPos);
    }

    renderer.render(scene, camera);
}
animate();