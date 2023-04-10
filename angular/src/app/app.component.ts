import { Component } from '@angular/core';
import { Scene } from './scene.component';
import { NgtCanvas } from 'angular-three';

@Component({
  selector: 'my-app',
  standalone: true,
  template: `<ngt-canvas [sceneGraph]="Scene" />`,
  imports: [NgtCanvas],
})
export class AppComponent {
  readonly Scene = Scene;
}
