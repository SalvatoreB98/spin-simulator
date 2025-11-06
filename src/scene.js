import * as THREE from 'three';

export class SceneManager {
    constructor(containerId = 'container') {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x001a00);

        this.camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.05, 1000);
        this.camera.position.set(0, 1.4, 2.5 );
        this.camera.lookAt(0, 0.8, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(innerWidth, innerHeight);
        document.getElementById(containerId).appendChild(this.renderer.domElement);

        this.addLights();
        window.addEventListener('resize', () => this.onResize());
    }

    addLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        const spot = new THREE.SpotLight(0xffffff, 1.2, 20, Math.PI / 5, 0.3);
        spot.position.set(0, 5, 3);
        this.scene.add(ambient, spot);
    }

    onResize() {
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(innerWidth, innerHeight);
    }
}
