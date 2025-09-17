// src/domain/animation.js
import { settings } from '../../config/settings.js';
import * as THREE from '../libs/three.module.js';

export function start3DAnimation() {
    const canvas = document.getElementById('bg3d');
    if (!canvas) {
        document.body.insertAdjacentHTML('beforeend', '<div style="color:red;position:fixed;top:10px;left:10px;z-index:9999;">No se encontró el canvas #bg3d</div>');
        return;
    }
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 80;
    // Esferas animadas
    const spheres = [];
    for (let i = 0; i < settings.sphereCount; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 2 + 1.5, 24, 24);
        const color = settings.colors[i % settings.colors.length];
        const material = new THREE.MeshPhongMaterial({ color, shininess: 60, transparent: true, opacity: 0.4 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = (Math.random()-0.5)*120;
        sphere.position.y = (Math.random()-0.5)*70;
        sphere.position.z = (Math.random()-0.5)*100;
        sphere.userData = {
            dx: (Math.random()-0.5)*0.08,
            dy: (Math.random()-0.5)*0.08,
            dz: (Math.random()-0.5)*0.08
        };
        spheres.push(sphere);
        scene.add(sphere);
    }
    // Luz ambiental y direccional - más suave para glassmorphism
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(0, 40, 80);
    scene.add(directionalLight);
    // Animación de esferas y color
    let colorPhase = 0;
    function animate() {
        requestAnimationFrame(animate);
        colorPhase += 0.01;
        spheres.forEach((sphere, i) => {
            sphere.position.x += sphere.userData.dx;
            sphere.position.y += sphere.userData.dy;
            sphere.position.z += sphere.userData.dz;
            // Rebote en los límites
            if (sphere.position.x > 80 || sphere.position.x < -80) sphere.userData.dx *= -1;
            if (sphere.position.y > 50 || sphere.position.y < -50) sphere.userData.dy *= -1;
            if (sphere.position.z > 70 || sphere.position.z < -70) sphere.userData.dz *= -1;
            // Cambio de color animado - colores sutiles para glassmorphism
            const hue = (colorPhase + i*0.1) % 1;
            sphere.material.color.setHSL(hue, 0.3, 0.8);
        });
        scene.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    console.log('Animación 3D inicializada');
    animate();
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}
