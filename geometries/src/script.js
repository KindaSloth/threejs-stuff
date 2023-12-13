import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
// const redCubeMesh = new THREE.Mesh(geometry, material);

// scene.add(redCubeMesh);

const vertices = new Float32Array([
    // First Triangle
    -0.4, 0.4, 0,
    -0.4, -0.4, 0,
    0.4, -0.4, 0,

    // Second Triangle
    -0.4, 0.4, 0,
    0.4, 0.4, 0,
    0.4, -0.4, 0,
]);

const positionsAttribute = new THREE.BufferAttribute(vertices, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionsAttribute);
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
const square = new THREE.Mesh(geometry, material);

scene.add(square);

const fov = 90;
let width = window.innerWidth;
let height = window.innerHeight;
const aspectRatio = width / height;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspectRatio = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    
    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen();
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen();
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen();
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen();
        }
    }
});

const tick = () => {
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();