import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from './turtle';
import * as p5 from 'p5';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit,OnDestroy {

  private p5;


  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }


  // Animation sequence
  
  constructor() {
     this.createCanvas();
  }


  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }
  
  private sketch(p: any) {
    let movingUP;
  
  
    p.setup = () => {
      p.createCanvas(p.windowWidth, 100).parent('experiment-canvas');
    };
  
  
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, 100);
    }
  
    p.draw = () => {

    };
  }  
  
//









  
}
