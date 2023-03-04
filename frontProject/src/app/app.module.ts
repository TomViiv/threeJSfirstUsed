import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeJsPageComponent } from './pages/three-js-page/three-js-page.component';
import { CubeComponent } from './pages/cube/cube.component';
import { CanvasBoxComponent } from './pages/canvas-box/canvas-box.component';
import { SplinePageComponent } from './pages/spline-page/spline-page.component';
import { PodiumComponent } from './pages/spline-page/podium/podium.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeJsPageComponent,
    CubeComponent,
    CanvasBoxComponent,
    SplinePageComponent,
    PodiumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
