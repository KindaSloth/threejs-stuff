import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loadingManager =  new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/normal-texture.jpeg');

const box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x9966CB) }));
const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, flatShading: true }));
const torus = new THREE.Mesh(new THREE.TorusGeometry( 7, 3, 16, 100 ), new THREE.MeshMatcapMaterial({ matcap: texture }));
const cylinder = new THREE.Mesh(new THREE.CylinderGeometry( 5, 5, 20, 32 ), new THREE.MeshStandardMaterial({ metalness: 0.7, roughness: 0.2 }));
const capsule = new THREE.Mesh(new THREE.CapsuleGeometry( 5, 5, 20, 32 ), new THREE.MeshPhysicalMaterial({ metalness: 0.7, roughness: 0.2, sheen: 1, clearcoat: 0.7, clearcoatRoughness: 0.2 }));

box.position.y = 25;
torus.position.y = 25;
cylinder.position.y = -25;
capsule.position.y = -25;

box.position.x = -45;
torus.position.x = 45;
cylinder.position.x = -45;
capsule.position.x = 45;

// NOTE: environment will already do lightning
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = -45;
// pointLight.position.y = -10;
// pointLight.position.z = 60;
// scene.add(pointLight);

const envTexture = textureLoader.load('/env.jpg');

envTexture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = envTexture;
scene.environment = envTexture;

scene.add(box);
scene.add(sphere);
scene.add(torus);
scene.add(cylinder);
scene.add(capsule);

const fov = 90;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
camera.position.z = 70;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(width, height);

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    box.rotation.y = elapsedTime / 2;
    box.rotation.x = elapsedTime / 2;

    sphere.rotation.y = elapsedTime / 2;
    sphere.rotation.x = elapsedTime / 2;

    torus.rotation.y = elapsedTime / 2;
    torus.rotation.x = elapsedTime / 2;

    cylinder.rotation.y = elapsedTime / 2;
    cylinder.rotation.x = elapsedTime / 2;

    capsule.rotation.y = elapsedTime / 2;
    capsule.rotation.x = elapsedTime / 2;

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();