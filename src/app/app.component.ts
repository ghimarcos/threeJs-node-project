import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer?: ElementRef;
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  renderer?: THREE.WebGLRenderer;
  cube?: THREE.Mesh;
  controls?: OrbitControls;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.createScene();
    this.createCube();
    this.animate();
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      window.removeEventListener('resize', this.onResize);
    });
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
    this.renderer = new THREE.WebGLRenderer();
    // render.setSize estou determinando o tamanho da tela para mostrar a cena
    this.renderer.setSize(window.innerWidth - 50, window.innerHeight - 30);
    this.rendererContainer?.nativeElement.appendChild(this.renderer.domElement);


    // Crie uma instância de OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Configurar os controles
    this.controls.dampingFactor = 0.1;
    this.controls.enableDamping = true; // Adicionar suavização aos movimentos do mouse
    this.controls.rotateSpeed = 0.5; // Ajuste a velocidade de rotação conforme necessário

    window.addEventListener('resize', this.onResize);
  }

  createCube() {
    const geometry = new THREE.BoxGeometry();

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


    this.cube = new THREE.Mesh(geometry, material);

    this.scene?.add(this.cube);

    if (this.camera) {
      this.camera.position.z = 5;
    }
  }

  onResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (this.camera) {
      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();

      this.renderer?.setSize(newWidth, newHeight);
    }
  }

  animate = () => {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.animate);
    });

    if (this.cube) {
      // Atualize os controles
      this.controls?.update();

      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;

      this.renderer?.render(this.scene!, this.camera!);
    }

  }
}
