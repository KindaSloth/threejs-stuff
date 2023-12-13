import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons';

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//     texture.needsUpdate = true;
// }

// image.src = '/sunglasses-cat.jpg';

const loadingManager =  new THREE.LoadingManager();

// loadingManager.onStart = () => {}
// loadingManager.onProgress = () => {}
// loadingManager.onLoad = () => {}
// loadingManager.onError = () => {}

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/2k_earth_nightmap.jpg');

// texture.repeat.x = 2;
// texture.repeat.y = 2;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const fov = 75;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 100);
camera.position.z = 50;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

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