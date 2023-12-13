import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons';
import GUI from 'lil-gui';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const gui = new GUI();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const redCubeMesh = new THREE.Mesh(geometry, material);

scene.add(redCubeMesh);

const fov = 75;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 100);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

gui.add(redCubeMesh.position, 'x').min(-3).max(3).step(0.01);
gui.add(redCubeMesh.position, 'y').min(-3).max(3).step(0.01);
gui.add(redCubeMesh.position, 'z').min(-3).max(3).step(0.01);
gui.add(material, 'wireframe');
gui.addColor(material, 'color');

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(width, height);

const tick = () => {
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();