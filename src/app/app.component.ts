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
  name = 'Angular';
  running:boolean;
  @ViewChild('myCanvas', { static: true })
  canvasRef: ElementRef;
  turtle:Turtle ;

  // Animation sequence
  
  constructor() {
    // setTimeout(this.animate, 1000);
    // let turtle = new Turtle();
    this.createCanvas();
    
  }

//
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

  ngOnInit(){
    this.running = true;
    this.turtle = new Turtle();
    // this.animate(this.turtle);
    // this.ngZone.runOutsideAngular(() => this.animate(this.turtle));
    
  }





  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }
  
  private sketch(p: any) {
    let a;
    p.setup = () => {
      p.createCanvas(700, 600);
      a = p.height /2;
    };
  
    p.draw = () => {
      // if (p.mouseIsPressed) {
      //   p.fill(0);
      // } else {
      //   p.fill(255);
      // }
      // p.ellipse(p.mouseX, p.mouseY, 80, 80);
      a -=1;
      p.ellipse((p.width)/2,a,80,80);
      if ( a < -50 ) {
        a = p.height
      }
    };
  }  


  
}
