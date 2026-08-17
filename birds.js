import * as THREE from 'three';

export class BirdsSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = null;

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 100;

        const canvas = document.getElementById('birds-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);

        // Bird data
        this.birds = [];
        this.birdCount = window.innerWidth <= 768 ? 8 : 15; // Menos pájaros, más lento
        this.mousePos = new THREE.Vector2();

        this.createBirds();
        this.setupEventListeners();
        this.animate();
    }

    createBirds() {
        for (let i = 0; i < this.birdCount; i++) {
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array([
                0, 0.5, 0,      // top
                -0.3, -0.5, 0,  // bottom left
                0.3, -0.5, 0    // bottom right
            ]);
            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

            const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const bird = new THREE.Mesh(geometry, material);

            bird.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 150,
                0
            );

            bird.velocity = new THREE.Vector2(
                (Math.random() - 0.5) * 0.5,  // Más lento
                (Math.random() - 0.5) * 0.5
            );

            bird.scale.set(15, 15, 1);
            this.scene.add(bird);
            this.birds.push(bird);
        }
    }

    updateBirds() {
        for (let bird of this.birds) {
            // Movimiento básico
            bird.position.x += bird.velocity.x;
            bird.position.y += bird.velocity.y;

            // Wrap around
            if (bird.position.x > 110) bird.position.x = -110;
            if (bird.position.x < -110) bird.position.x = 110;
            if (bird.position.y > 85) bird.position.y = -85;
            if (bird.position.y < -85) bird.position.y = 85;

            // Huir del mouse
            const dx = bird.position.x - this.mousePos.x;
            const dy = bird.position.y - this.mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 40) {
                bird.velocity.x += (dx / dist) * 0.1;
                bird.velocity.y += (dy / dist) * 0.1;
            }

            // Limitar velocidad
            const speed = bird.velocity.length();
            if (speed > 1) {
                bird.velocity.normalize().multiplyScalar(1);
            }
        }
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.updateBirds();
        this.renderer.render(this.scene, this.camera);
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mousePos.x = ((e.clientX - rect.left) / rect.width - 0.5) * 200;
            this.mousePos.y = ((0.5 - (e.clientY - rect.top) / rect.height) * 150);
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}
