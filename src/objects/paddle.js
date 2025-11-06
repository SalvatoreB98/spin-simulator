import * as THREE from 'three';
import { Simulator } from '../simulator.js';

export class Paddle {
    constructor() {
        this.sim = new Simulator();
        this.renderer = this.sim.renderer;

        this.group = new THREE.Group();

        // === Geometria ===
        const head = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.075, 0.005, 32),
            new THREE.MeshPhongMaterial({ color: 0xdd3333 })
        );
        const head2 = new THREE.Mesh(
            new THREE.CylinderGeometry(0.075, 0.075, 0.005, 32),
            new THREE.MeshPhongMaterial({ color: 'black' })
        );
        head.rotation.x = Math.PI / 2;
        head2.rotation.x = Math.PI / 2;
        head2.position.set(0, 0, 0.002);

        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.01, 0.01, 0.1, 16),
            new THREE.MeshPhongMaterial({ color: 0x333333 })
        );
        handle.position.set(0, -0.1, 0);

        this.group.add(head, head2, handle);
        this.group.position.set(0, 1, 1.65);

        // === Stato e sensibilità ===
        this.isDragging = false;
        this.prevMouse = { x: 0, y: 0 };
        this.dragSensitivity = 0.01;
        this.rotationSpeed = 0.07;
        this.keys = {};

        // === Eventi mouse per rotazione X/Y ===
        const dom = this.renderer.domElement;

        dom.addEventListener('mousedown', e => {
            this.isDragging = true;
            this.prevMouse.x = e.clientX;
            this.prevMouse.y = e.clientY;
        });

        dom.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        dom.addEventListener('mousemove', e => {
            if (!this.isDragging) return;

            const dx = e.clientX - this.prevMouse.x;
            const dy = e.clientY - this.prevMouse.y;
            this.prevMouse.x = e.clientX;
            this.prevMouse.y = e.clientY;

            // Ruota in base al drag (asse X/Y)
            this.group.rotation.y += dx * this.dragSensitivity;
            this.group.rotation.x += dy * this.dragSensitivity;

            // Limita rotazioni estreme sull'asse X (non ribaltarti)
            this.group.rotation.x = THREE.MathUtils.clamp(this.group.rotation.x, -Math.PI / 2, Math.PI / 2);
        });

        if (this.sim.input) {
            this.attachInput(this.sim.input);
        }
    }

    attachInput(inputHandler) {
        this.input = inputHandler;
        this.keys = inputHandler.keys;
    }

    update() {
        if (!this.input) return;

        // === Solo asse Z controllato da tastiera ===
        if (this.keys['a']) this.group.rotation.z += this.rotationSpeed;
        if (this.keys['d']) this.group.rotation.z -= this.rotationSpeed;

        // Clamp opzionale (per non ribaltarla)
        this.group.rotation.z = THREE.MathUtils.clamp(this.group.rotation.z, -Math.PI / 2, Math.PI / 2);
    }
}
