import * as THREE from "three";
import {
  FontLoader,
  OrbitControls,
  TextGeometry,
} from "three/examples/jsm/Addons";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const fontLoader = new FontLoader();

const matcap = textureLoader.load('mapcat.png');

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("3D Text", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();

  const textMesh = new THREE.Mesh(
    textGeometry,
    new THREE.MeshMatcapMaterial({ matcap })
  );

  scene.add(textMesh);
});

const envTexture = textureLoader.load("/env.jpg");
envTexture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = envTexture;
scene.environment = envTexture;

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

const fov = 90;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
camera.position.z = 3;

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
};

tick();
