import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    inject,
    Input,
  } from '@angular/core';
  import { extend, NgtArgs, NgtBeforeRenderEvent, NgtStore } from 'angular-three';
  import * as THREE from 'three';
  import { OrbitControls } from 'three-stdlib';
  
  extend(THREE);
  extend({ OrbitControls });
  
  @Component({
    selector: 'demo-cube',
    standalone: true,
    template: `
      <ngt-mesh 
        (beforeRender)="onBeforeRender($any($event))"
        (click)="active = !active"
        (pointerover)="hovered = true"
        (pointerout)="hovered = false"
        [scale]="active ? 1.5 : 1"
        [position]="position"
        >
        <ngt-box-geometry />
        <ngt-mesh-standard-material [color]="hovered ? 'darkred' : 'red'" />
      </ngt-mesh>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class Cube {
    @Input() position = [0, 0, 0];
  
    active = false;
    hovered = false;
  
    onBeforeRender(event: NgtBeforeRenderEvent<THREE.Mesh>) {
      event.object.rotation.x += 0.01;
    }
  }
  
  @Component({
    standalone: true,
    template: `
      <ngt-ambient-light [intensity]="0.5" />
      <ngt-spot-light [position]="10" [angle]="0.15" [penumbra]="1" />
      <ngt-point-light [position]="-10" />
  
      <demo-cube [position]="[1.5, 0, 0]" />
      <demo-cube [position]="[-1.5, 0, 0]" />
  
      <ngt-orbit-controls *args="[camera, glDom]" [enableDamping]="true" (beforeRender)="$any($event).object.update()" />
    `,
    imports: [Cube, NgtArgs],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class Scene {
    readonly store = inject(NgtStore);
  
    // stackblitz issue
    readonly camera = (this.store as any).get('camera');
    readonly glDom = (this.store as any).get('gl', 'domElement');
  }
  