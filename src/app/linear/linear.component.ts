import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.css']
})
export class LinearComponent implements OnInit {
  private p5;

  constructor() {
    this.createCanvas();
 }


 private createCanvas() {
   this.p5 = new p5(this.sketch);
 }
 
 private sketch(p: any) {
   let movingUP;
   let xDir = 2;
 
 
   p.setup = () => {
     p.createCanvas(p.windowWidth, 100).parent('linear-canvas');
     movingUP = p.width /2;
   };
 
 
   p.windowResized = () => {
     p.resizeCanvas(p.windowWidth, 100);
   }
 
   p.draw = () => {
    p.background(255);
     movingUP += xDir;
     p.ellipse(movingUP, (p.height)/2,80,80);
     if ( movingUP > p.width+40 || movingUP < -40 ) {
      //  movingUP = 0;
        xDir = (xDir)*-1;
     }
   };
 }  

  ngOnInit() {
  }

}
