import * as THREE from 'three';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const redCubeMesh = new THREE.Mesh(geometry, material);

redCubeMesh.position.set(0, - 0.5, 1);
redCubeMesh.scale.set(1, 0.5, 0.5);

redCubeMesh.rotation.reorder('YZX');
redCubeMesh.rotateY(Math.PI / 2);
redCubeMesh.rotateZ(Math.PI / 2);

scene.add(redCubeMesh);

const group = new THREE.Group();

const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
);

const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
);

const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'blue' })
);

group.add(box1);
group.add(box2);
group.add(box3);

box1.position.x = -2;
box3.position.x = 2

group.position.y = -3;

scene.add(group);

// Axes helper
const axesHelper = new THREE.AxesHelper();
axesHelper.position.y = 0.5;
scene.add(axesHelper);

const fov = 90;
const width = 800;
const height = 600;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
camera.position.z = 3;
camera.lookAt(redCubeMesh.position);

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(width, height);

renderer.render(scene, camera);