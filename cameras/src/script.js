import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const redCubeMesh = new THREE.Mesh(geometry, material);

scene.add(redCubeMesh);

const fov = 75;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(width, height);

// const clock = new THREE.Clock();

// const cursor = {
//     x: 0,
//     y: 0,
// };

// window.addEventListener('mousemove', (event) => {
//     // dividing by width to get cursor from 0 to 1, and decreasing 0.5, to get cursor from -0.5 to +0.5
//     cursor.x = event.clientX / width - 0.5;
//     // same idea of cursor x, but now inverting the signal of the number 
//     // since in THREEJS the y axis is considered to go up unlike mousemove event listener
//     cursor.y = - (event.clientY / height - 0.5);
// });

const tick = () => {
    // const elapsedTime = clock.getElapsedTime();

    // camera.position.x = cursor.x * 3;
    // camera.position.y = cursor.y * 3;
    // camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(redCubeMesh.position);

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();