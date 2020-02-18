import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';


@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css']
})
export class CirclesComponent implements OnInit {
  private p5;
  name = 'Angular';
  running:boolean;
  @ViewChild('myCanvas', { static: true })
  canvasRef: ElementRef;
  turtle:Turtle ;
  innerWidth:number;
  innerHeight:number;


  constructor() { 
    this.createCanvas();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  animate(turtle?: Turtle): any {
    // Check that we're still running.
    if (!this.running) {
      return;
    }
    
    let i = 0;
    requestAnimationFrame(()=> {
      this.animate;
      i+=1;
      console.log(i);
      
    } )
  }


ngOnDestroy() {
  this.running = false;
}

ngOnInit() {
  this.running = true;
  this.turtle = new Turtle();
  // this.animate(this.turtle);
  // this.ngZone.runOutsideAngular(() => this.animate(this.turtle));
  
}



private createCanvas() {
  this.p5 = new p5(this.sketch);
}

private sketch(p: any) {
  let movingUP;


  p.setup = () => {
    p.createCanvas(p.windowWidth, 100).parent('circle-canvas');
    movingUP = p.height /2;
  };


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, 100);
  }

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
    // movingUP -=2;
    // p.ellipse((p.width)/2, movingUP,80,80);
    // if ( movingUP < -50 ) {
    //   movingUP = p.height
    // }
  };
}  




}
