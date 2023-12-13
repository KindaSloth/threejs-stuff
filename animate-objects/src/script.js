import * as THREE from 'three';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const redCubeMesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 'red' }));

scene.add(redCubeMesh);

const greenSphereMesh = new THREE.Mesh(new THREE.CircleGeometry(), new THREE.MeshBasicMaterial({ color: 'green' }));

scene.add(greenSphereMesh);

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

// let time = Date.now();
const clock = new THREE.Clock();

const tick = () => {
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;
    const elapsedTime = clock.getElapsedTime();

    redCubeMesh.rotation.y = elapsedTime;

    greenSphereMesh.position.y = Math.sin(elapsedTime * Math.PI);
    greenSphereMesh.position.x = Math.cos(elapsedTime * Math.PI);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();