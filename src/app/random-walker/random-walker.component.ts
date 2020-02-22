import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-random-walker',
  templateUrl: './random-walker.component.html',
  styleUrls: ['./random-walker.component.css']
})
export class RandomWalkerComponent implements OnInit {
  private p5;

  

  constructor() {
    this.createCanvas();
 }

 private createCanvas() {
  this.p5 = new p5(this.sketch);
}

private sketch(p: any) {
  let x;
  let y;
  let gameOn;
  let max;
  let min;
  let max2;
  let min2;
  let intervalX;
  let intervalY;


  function minMaxSetup() {
    intervalX = Math.random() * (max2 - min2) + min2;
    intervalY = Math.random() * (max - min) + min;
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, 400).parent('walker-canvas');

    x = p.width /2 ;
    y = p.height /2;
    gameOn = true;

    max = 3;
    min = -3;

    max2 = 3;
    min2 = -3;

    intervalX = Math.random() * (max2 - min2) + min2;
    intervalY = Math.random() * (max - min) + min;
    setInterval(minMaxSetup, 1000);
  };


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, 400);
  }

  p.draw = () => {



  // console.log(`width: ${p.width}, height:${p.height}`);
  // console.log(`X: ${x}, Y:${y}`);

  p.background(220);

  if( gameOn ){
    x += intervalX;
    y += intervalY;
  }


  //   x boundary check
  if( x > p.width ){
    console.log(" x > width ");
    x = 0; 
  }

  if( x < 0 ){
    console.log(" x < 0 ");
    x = p.width;
  }
    

  // y boundary check
  if( y > p.height )
    y = 0;
  if( y < 0 )
    y = p.height;



  p.ellipse(x,y,80,80);


   
  };
}  

 ngOnInit() {
 }

}
