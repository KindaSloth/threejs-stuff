import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons';

const canvas = document.querySelector('.webgl');

let camera, scene, renderer, sphereGeometry, planeGeometry, sphereMaterial, planeMaterial, sphereMesh, planeMesh;

let numCollisions = 0;

init();
render();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.x = 1000;
    camera.position.y = 10;
    camera.position.z = 1000;
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    scene.add(camera);

    const pointLight = new THREE.DirectionalLight(0xbbbbbb);
    pointLight.position.set(100, 100, 500);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);

    sphereGeometry = new THREE.SphereGeometry(200, 64, 64);
    sphereMaterial = new THREE.MeshPhongMaterial({
        color: 'darkgreen',
        opacity: 0.3,
        transparent: true,
        side: THREE.DoubleSide
    });

    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    planeMaterial = new THREE.MeshPhongMaterial({
        color: 'blue',
        side: THREE.DoubleSide
    });

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.z = 0;
    planeMesh.position.y = 0;

    const positionAttribute = planeGeometry.getAttribute('position');

    for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
        const localVertex = new THREE.Vector3();
        localVertex.fromBufferAttribute(positionAttribute, vertexIndex);
        localVertex.z = 201;
        const directionVector = new THREE.Vector3();
        directionVector.subVectors(sphereMesh.position, localVertex);
        directionVector.normalize();

        const ray = new THREE.Raycaster(localVertex, directionVector);
        const collisionResults = ray.intersectObject(sphereMesh);
        numCollisions += collisionResults.length;

        if (collisionResults.length > 0) {
            positionAttribute.setZ(vertexIndex, collisionResults[0].point.z + 5);
        }
    }

    console.log('Number of collisions: ' + numCollisions);

    positionAttribute.needsUpdate = true;

    scene.add(planeMesh);

    // const axes = new THREE.AxesHelper(500);
    // scene.add(axes);

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
