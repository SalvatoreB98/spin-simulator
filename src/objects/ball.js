import * as THREE from 'three';
import { Simulator } from '../simulator.js';

export class Ball {
  constructor(color = 0xff3333) {
    this.sim = new Simulator();
    this.scene = this.sim.scene;

    this.mesh = new THREE.Group();

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );

    const stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0015, 0.0015, 0.05, 8),
      new THREE.MeshBasicMaterial({ color })
    );
    stripe.rotation.x = Math.PI / 2;
    sphere.add(stripe);

    this.mesh.add(sphere);
    this.mesh.position.set(0, 0.9, 0);

    this.spin = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3(0, 0, 0);
    this.state = 'waiting';
  }
}
