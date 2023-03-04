import { Component, OnInit } from '@angular/core';
import SplineLoader from '@splinetool/loader';
import { AmbientLight, Clock, Mesh, MeshToonMaterial, PerspectiveCamera, PointLight, Scene, TorusGeometry, WebGLRenderer } from 'three';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  scene = new Scene();

  loader = new SplineLoader();

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box2');

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    this.scene.add(pointLight);

    this.loader.load(
      'https://prod.spline.design/7UrxarE0xA2joEsv/scene.splinecode',
      (splineScene) => {
        this.scene.add(splineScene);
      },
      null,
      (error) => {
        console.error('An error happened', error);
      }
    )

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    );
    camera.position.z = 30;
    this.scene.add(camera);

    if (!canvas) {
      return;
    }

    const renderer = new WebGLRenderer({
      canvas: canvas,
    });
    renderer.setClearColor(0xe232222, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(this.scene, camera);
    });
  }

  ngOnInit(): void {
    this.createThreeJsBox();

  }

}
