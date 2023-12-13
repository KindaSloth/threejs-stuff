const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const redCubeMesh = new THREE.Mesh(geometry, material);

scene.add(redCubeMesh);

const fov = 90;
const width = 800;
const height = 600;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
camera.position.z = 3;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(width, height);

renderer.render(scene, camera);