import * as THREE from 'three';
import { Simulator } from '../simulator.js';

export class Table {
    constructor() {
        this.sim = new Simulator();
        this.scene = this.sim.scene;

        this.group = new THREE.Group();

        // piano
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(2.74, 0.02, 1.525),
            new THREE.MeshPhongMaterial({ color: 0x006633 })
        );
        top.position.y = 0.76;
        this.group.add(top);

        // ruota di 90° per allinearlo in profondità
        this.group.rotation.y = Math.PI / 2;

        // rete
        const net = new THREE.Mesh(
            new THREE.BoxGeometry(0.01, 0.15, 1.525),
            new THREE.MeshPhongMaterial({ color: 0x2222ff })
        );
        net.position.set(0, 0.76 + 0.075, 0);
        this.group.add(net);

        // linee bianche sopra il piano
        const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const lineThickness = 0.02;
        const lineH = 0.021;

        const lines = [
            new THREE.BoxGeometry(2.74, lineH, lineThickness),
            new THREE.BoxGeometry(2.74, lineH, lineThickness),
            new THREE.BoxGeometry(lineThickness, lineH, 1.525),
            new THREE.BoxGeometry(lineThickness, lineH, 1.525)
        ];
        const lineMeshes = lines.map(g => new THREE.Mesh(g, edgeMat));

        lineMeshes[0].position.set(0, 0.76 + 0.001, 1.525 / 2);
        lineMeshes[1].position.set(0, 0.76 + 0.001, -1.525 / 2);
        lineMeshes[2].position.set(2.74 / 2, 0.76 + 0.001, 0);
        lineMeshes[3].position.set(-2.74 / 2, 0.76 + 0.001, 0);
        lineMeshes.forEach(l => this.group.add(l));
    }
}
