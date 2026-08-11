import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#0a0d14', 6, 18);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2.2, 3.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x4a5878, 0.35);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x7a97c2, 0.55);
directionalLight.position.set(-2, 6, 5);
scene.add(directionalLight);

const flashlight = new THREE.SpotLight(0xffe8a3, 0);
flashlight.angle = Math.PI / 8;
flashlight.penumbra = 1.0;
flashlight.castShadow = true;
scene.add(flashlight);

const lightTarget = new THREE.Object3D();
scene.add(lightTarget);
flashlight.target = lightTarget;

let tableTorch = null;
let torchGlow = null;
let hasTorch = false;

const loader = new GLTFLoader();

loader.load('/FlashLight.glb', (gltf) => {
    tableTorch = gltf.scene;
    tableTorch.scale.set(0.35, 0.35, 0.35);
    tableTorch.position.set(0, -0.65, 2.0);
    tableTorch.rotation.set(0, Math.PI / 4, 0);
    scene.add(tableTorch);

    torchGlow = new THREE.PointLight(0xffe8a3, 15, 2.0);
    torchGlow.position.copy(tableTorch.position);
    scene.add(torchGlow);
});

loader.load('/room.glb', (gltf) => {
    const room = gltf.scene;
    room.position.set(0, -2, 0);
    scene.add(room);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const promptUI = document.createElement('div');
promptUI.style.position = 'absolute';
promptUI.style.bottom = '24px';
promptUI.style.left = '24px';
promptUI.style.color = 'rgba(255, 255, 255, 0.5)';
promptUI.style.fontSize = '12px';
promptUI.style.letterSpacing = '0.1em';
promptUI.style.textTransform = 'uppercase';
promptUI.style.fontFamily = 'sans-serif';
promptUI.innerText = 'Click the torch on the desk to pick it up';
document.body.appendChild(promptUI);

const inventoryUI = document.createElement('div');
inventoryUI.style.position = 'absolute';
inventoryUI.style.bottom = '24px';
inventoryUI.style.right = '24px';
inventoryUI.style.padding = '8px 16px';
inventoryUI.style.borderRadius = '8px';
inventoryUI.style.border = '1px solid rgba(255, 255, 255, 0.1)';
inventoryUI.style.background = 'rgba(0, 0, 0, 0.4)';
inventoryUI.style.color = 'rgba(255, 255, 255, 0.3)';
inventoryUI.style.fontSize = '12px';
inventoryUI.style.fontFamily = 'monospace';
inventoryUI.style.textTransform = 'uppercase';
inventoryUI.innerText = 'Slot Empty';
document.body.appendChild(inventoryUI);

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
    if (hasTorch || !tableTorch) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(tableTorch, true);

    if (intersects.length > 0) {
        hasTorch = true;
        scene.remove(tableTorch);
        scene.remove(torchGlow);

        flashlight.intensity = 350;

        promptUI.innerText = 'Move mouse to inspect desk';
        inventoryUI.style.background = 'rgba(255, 255, 255, 0.1)';
        inventoryUI.style.borderColor = 'rgba(234, 179, 8, 0.5)';
        inventoryUI.style.color = '#fef08a';
        inventoryUI.innerText = 'Flashlight Equipped';
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    if (torchGlow && !hasTorch) {
        torchGlow.intensity = 15 + Math.sin(elapsedTime * 4) * 6;
    }

    const basePitch = -0.35;
    const maxPitch = Math.PI / 6;
    const maxYaw = Math.PI / 4;

    camera.rotation.x = basePitch + mouse.y * maxPitch;
    camera.rotation.y = -mouse.x * maxYaw;

    if (hasTorch) {
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
    }

    renderer.render(scene, camera);
}
animate();