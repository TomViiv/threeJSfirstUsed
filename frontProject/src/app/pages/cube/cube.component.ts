import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
})
export class CubeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  //* Cube Properties
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  //@Input() public texture: string = '/assets/texture.jpg';

  //* Stage Properties
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties)

  private camera!: PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new TextureLoader();
  private geometry = new BoxGeometry(1, 1, 1);
  /*private material = new MeshBasicMaterial({
    map: this.loader.load(this.texture),
  });*/
  private material = new MeshPhongMaterial({
    color: 0xFF8001
  })

  private cube: Mesh = new Mesh(this.geometry, this.material);

  private renderer!: WebGLRenderer;

  private scene!: Scene;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene(): void {
    //* Scene
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);
    this.scene.add(this.cube);
    //* Camera
    let aspectRadio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRadio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Animate the cube
   *
   * @private
   * @memberof CubeComponent
   */
  private animateCube(): void {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Start the rendering loop
   *
   * @private
   * @memberof CubeComponent
   */
  private startRenderingLoop(): void {
    //* Renderer
    // Use canvas element in template
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit() : void {
    this.createScene();
    this.startRenderingLoop();
  }
}
