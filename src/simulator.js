import { SceneManager } from './scene.js';
import { InputHandler } from './input.js';
import { Table } from './objects/table.js';
import { Paddle } from './objects/paddle.js';
import { Ball } from './objects/ball.js';
import { GUI } from 'lil-gui';
import * as THREE from 'three';

export class Simulator {
    static instance = null;

    constructor() {
        if (Simulator.instance) return Simulator.instance;
        Simulator.instance = this;

        this.sceneManager = new SceneManager('container');
        this.scene = this.sceneManager.scene;
        this.camera = this.sceneManager.camera;
        this.renderer = this.sceneManager.renderer;


        this.table = new Table();
        this.paddle = new Paddle(this.renderer);
        this.ball = new Ball();

        this.input = new InputHandler();

        this.input.onLaunch = () => {
            if (this.ball.state === 'waiting') {
                this.ball.vel.set(0, 0.02, 0.15);
                this.ball.state = 'moving';
            }
        };
        this.paddle.attachInput(this.input);
        this.scene.add(this.table.group, this.paddle.group, this.ball.mesh);

        this.gui = new GUI();
        this.setupGUI();

        this.animate();
    }

    setupGUI() {
        const cam = this.gui.addFolder('Camera');
        cam.add(this.camera.position, 'y', 0, 4, 0.05);
        cam.add(this.camera.position, 'z', 4, 12, 0.05);
        cam.open();

        const paddle = this.gui.addFolder('Paddle');
        paddle.add(this.paddle.group.position, 'z', 1, 3, 0.05);
        paddle.add(this.paddle.group.position, 'y', 0.5, 2, 0.05);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.paddle.update();

        // Pallina (spin)
        if (this.ball.state === 'waiting') {
            this.ball.mesh.rotation.x += 0.02;
            this.ball.mesh.rotation.y += 0.03;
        }

        this.renderer.render(this.scene, this.camera);
    }
}
