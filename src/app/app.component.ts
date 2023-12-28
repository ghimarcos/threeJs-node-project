import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
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
  sphere?: THREE.Mesh;
  controls?: OrbitControls;
  objLoader = new OBJLoader();
  mtlLoader = new MTLLoader();
  copo: THREE.Object3D | undefined;
  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // this.createScene();
    // this.createCube();
    // this.createObj();
    this.teste();
    this.animate();
  }

  teste() {
    // Configuração da cena, câmera e renderizador
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer?.nativeElement.appendChild(this.renderer.domElement);
    // Defina a cor de fundo para preto
    this.renderer.setClearColor(0x45474B); // 0x000000 representa a cor preta em hexadecimal

    // Criar uma esfera
    // const sphereGeometry = new THREE.SphereGeometry(2, 32, 32); // Raio, segmentos horizontais, segmentos verticais
    // const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }); // Material Phong
    // this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // this.sphere.position.x = 4;
    // this.sphere.position.y = 0;
    // this.sphere.position.y = 0;
    // this.scene.add(this.sphere);
    this.createObj();



    // Configuração inicial da posição da câmera e ponto de foco
    // this.camera.position.set(0, 0, 10); // Ajuste as coordenadas conforme necessário
    // this.camera.lookAt(new THREE.Vector3(2, 1, 1)); // Ponto de foco - ajuste as coordenadas conforme necessário
    // this.camera.updateProjectionMatrix(); // Atualize a matriz de projeção da câmera

    // Posicionar a câmera
    // this.camera.position.z = 5;

    // cria os controles para mover o objeto com o mouse
    this.createControl();

    //criar as luzes
    this.createLights();

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      window.removeEventListener('resize', this.onResize);
    });
  }

  createScene() {
    // Cena
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 25


    // Renderizador
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // render.setSize estou determinando o tamanho da tela para mostrar a cena
    this.renderer.setSize(window.innerWidth - 50, window.innerHeight - 30);

    // Defina a cor de fundo para preto
    this.renderer.setClearColor(0x45474B); // 0x000000 representa a cor preta em hexadecimal

    this.rendererContainer?.nativeElement.appendChild(this.renderer.domElement);

    // cria os controles para mover o objeto com o mouse
    this.createControl();

    //criar as luzes
    this.createLights();

    if (this.controls) {
      this.controls.update();
    }

    this.renderer.render(this.scene!, this.camera!);
  }



  createControl() {
    // Crie uma instância de OrbitControls
    if (this.camera && this.renderer) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      // Configurar os controles
      this.controls.dampingFactor = 0.1;
      this.controls.enableDamping = true; // Adicionar suavização aos movimentos do mouse
      this.controls.rotateSpeed = 0.5; // Ajuste a velocidade de rotação conforme necessário
    }

    window.addEventListener('resize', this.onResize);
  }

  createCube() {
    // const geometry = new THREE.BoxGeometry();

    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


    // this.cube = new THREE.Mesh(geometry, material);

    // this.scene?.add(this.cube);

    // if (this.camera) {
    //   this.camera.position.z = 5;
    // }

    const planeGeometry = new THREE.PlaneGeometry(5, 5); // Tamanho do plano
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff }); // Material Phong (aceita luz)
    this.cube = new THREE.Mesh(planeGeometry, planeMaterial);
    this.scene?.add(this.cube);
  }

  createLights() {
    // const light1 = new THREE.PointLight(0xFFFFF, 1.4, 1000);
    // light1.position.set(-3, 3, -5);
    // this.scene?.add(light1);

    // const light2 = new THREE.PointLight(0xFFFFF, 1.4, 1000);
    // light2.position.set(1, 3, 5);
    // this.scene?.add(light2);

    // const light3 = new THREE.PointLight(0xFFFFF, 1.4, 1000);
    // light3.position.set(-11, 3, -5);
    // this.scene?.add(light3);

    // // Luz direcional 1
    // const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 1);
    // directionalLight1.position.set(-1, 1, -1); // Ajuste a posição conforme necessário
    // this.scene?.add(directionalLight1);

    // // Luz direcional 2
    // const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 1);
    // directionalLight2.position.set(1, 1, 1); // Ajuste a posição conforme necessário
    // this.scene?.add(directionalLight2);

    // // Luz direcional 3
    // const directionalLight3 = new THREE.DirectionalLight(0xFFFFFF, 1);
    // directionalLight3.position.set(-1, -1, -1); // Ajuste a posição conforme necessário
    // this.scene?.add(directionalLight3);

    // const upColor = 0xFFFF80;
    // const downColor = 0x4040FF;
    // // Luz ambiente
    // const ambientLight = new THREE.HemisphereLight(upColor, downColor, 1.0) // Cor da luz ambiente
    // this.scene?.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    // // Defina a posição da luz direcional (pode ser ajustado conforme necessário)
    // directionalLight.position.set(1, 1, 1).normalize();

    // // Adicione a luz direcional à cena
    // this.scene?.add(directionalLight);



    // const directionalLight = new THREE.PointLight(0xFFFFF, 1.4, 1000);
    // directionalLight.position.set(8, 266, 8).normalize();
    // // Configurar a rotação
    // directionalLight.rotation.x = 0;
    // directionalLight.rotation.y = 0;
    // directionalLight.scale.set(10, 10, 10);
    // this.scene?.add(directionalLight);

    // // Adicione um AxesHelper para visualizar a direção da luz
    // const axesHelper = new THREE.AxesHelper();
    // axesHelper.position.set(8, 266, 8).normalize();
    // // Configurar a rotação
    // axesHelper.rotation.x = 0;
    // axesHelper.rotation.y = 0;
    // axesHelper.scale.set(10, 10, 10); // Ajuste a escala conforme necessário
    // this.scene?.add(axesHelper);

    // Posição do objeto
    // const objectPosition = new THREE.Vector3(1, 1, 1);

    // // Configurar a luz point light
    // const pointLight = new THREE.PointLight(0xFFFFFF, 1.4, 1000);
    // pointLight.position.copy(objectPosition);
    // this.scene?.add(pointLight);

    // // Adicionar um AxesHelper para visualizar a direção da luz
    // const axesHelper = new THREE.AxesHelper();
    // axesHelper.position.copy(objectPosition);
    // this.scene?.add(axesHelper);

    // Adicionar uma luz direcional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene?.add(directionalLight);

    // Adicionar um AxesHelper para visualizar a direção da luz
    const axesHelper = new THREE.AxesHelper();
    // axesHelper.position.set(1, 1, 1).normalize();
    this.scene?.add(axesHelper);

    // Luz direcional
    // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    // directionalLight.position.set(2, 2, 2); // Ajuste a posição conforme necessário
    // this.scene?.add(directionalLight);
  }

  createObj() {
    // Carregue o arquivo MTL (material) primeiro
    this.mtlLoader.load('assets/objeto-teste/berco.mtl', (materials) => {
      console.log('os materiais : ', materials);
      materials.preload();

      // Após carregar o MTL, configure os materiais para o OBJLoader
      this.objLoader.setMaterials(materials);

      // Em seguida, carregue o arquivo OBJ e associe os materiais carregados
      this.objLoader.load('assets/objeto-teste/berco.obj', (object) => {
        // Ajuste a posição e a escala do objeto
        object.position.set(1, 1, 1); // Ajuste a posição conforme necessário
        object.scale.set(1, 1, 1); // Ajuste a escala conforme necessário

        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.flatShading = true;
          }
        });

        // Adicione o objeto à cena
        this.scene?.add(object);

        // Armazene o objeto para referência posterior, se necessário
        this.copo = object;

        // Ajuste a posição e o ponto de foco da câmera para focar no objeto
        this.camera?.position.set(0, 0, 10); // Ajuste as coordenadas conforme necessário
        this.camera?.lookAt(this.copo.position); // Ponto de foco no objeto
        this.camera?.updateProjectionMatrix(); // Atualize a matriz de projeção da câmera

        // Se precisar fazer alguma configuração adicional no objeto, faça aqui.

        // this.alterarTexturaObjeto();

        // if (this.camera) {
        //   this.camera.position.z = 5;
        // }
      });
    });
  }

  // createObj() {
  //   // Carregue o arquivo MTL (material) primeiro
  //   this.mtlLoader.load('assets/new-obj/indoor_plant_02.mtl', (materials) => {
  //     materials.preload();

  //     // Após carregar o MTL, configure os materiais para o OBJLoader
  //     this.objLoader.setMaterials(materials);

  //     // Em seguida, carregue o arquivo OBJ e associe os materiais carregados
  //     this.objLoader.load('assets/new-obj/indoor_plant_02.obj', (object) => {
  //       // Adicione o objeto à cena e faça outras configurações

  //       object.position.set(1, 1, 1); // Ajuste a posição conforme necessário

  //       this.copo = object;

  //       // Configure o flatShading para o material do objeto
  //       this.copo.traverse((child) => {
  //         if (child instanceof THREE.Mesh) {
  //           // Configure o flatShading para o material do objeto
  //           child.material.flatShading = true; // Use flatShading para obter um sombreamento suave
  //         }
  //       });
  //       // this.copo.position.z -= 6;
  //       // this.copo.position.x = 2;

  //       this.copo.scale.set(1, 1, 1); // Isso reduzirá o objeto para metade do tamanho

  //       this.scene?.add(this.copo);

  //       // this.alterarTexturaObjeto();

  //       // if (this.camera) {
  //       //   this.camera.position.z = 5;
  //       // }
  //     });
  //   });
  // }

  // createObj() {
  //   const material = new THREE.MeshBasicMaterial({ color: 0x4F4A45 }); // 0x0000ff representa a cor azul
  //   // Carregue apenas o arquivo OBJ
  //   this.objLoader.load('assets/objeto-teste/berco.obj', (object) => {
  //     // Adicione o objeto à cena e faça outras configurações


  //     // this.copo.position.z -= 6;
  //     // this.copo.position.x = 2;


  //     // Atribua o material ao objeto carregado
  //     object.traverse((child) => {
  //       if (child instanceof THREE.Mesh) {
  //         child.material = material;
  //       }
  //     });

  //     this.copo = object;

  //     this.copo.scale.set(0.05, 0.05, 0.05); // Isso reduzirá o objeto para metade do tamanho

  //     this.scene?.add(this.copo);

  //     // this.alterarTexturaObjeto();

  //     // if (this.camera) {
  //     //   this.camera.position.z = 5;
  //     // }
  //   });
  // }

  alterarTexturaObjeto() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/imagens/img.png', (texture) => {
      texture.needsUpdate = true;
      // Crie um material com a textura
      const material = new THREE.MeshBasicMaterial({ map: texture });

      if (this.copo) {
        // Acesse a malha (Mesh) dentro do objeto copo (se o copo tiver apenas uma malha)
        const copoMesh = this.copo!.children[0] as THREE.Mesh;


        // Atribua o novo material à malha
        copoMesh.material = material;

        // Renderize a cena novamente para ver as mudanças
        if (this.renderer) {
          this.renderer.render(this.scene!, this.camera!);
        }
      }

    });
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

    if (this.copo) {
      // Atualize os controles
      this.controls?.update();

      // this.copo!.rotation.x += 0.01;
      // this.copo!.rotation.y += 0.01;

      this.renderer?.render(this.scene!, this.camera!);
    }

    if (this.cube) {
      // Atualize os controles
      this.controls?.update();

      // this.copo!.rotation.x += 0.01;
      // this.copo!.rotation.y += 0.01;

      this.renderer?.render(this.scene!, this.camera!);
    }

    if (this.sphere) {
      // Atualize os controles
      this.controls?.update();

      // this.copo!.rotation.x += 0.01;
      // this.copo!.rotation.y += 0.01;

      this.renderer?.render(this.scene!, this.camera!);
    }
  }
}
