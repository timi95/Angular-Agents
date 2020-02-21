import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';


@Component({
  selector: 'app-walker-objectified',
  templateUrl: './walker-objectified.component.html',
  styleUrls: ['./walker-objectified.component.css'],
  styles: ['canvas { border-style: solid }']
})
export class WalkerObjectifiedComponent implements OnInit {
  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private x; private y; private width; private height;

  constructor() {
 }


  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    // this.ctx.fillStyle = 'red';  
    // this.ctx.fillRect(0, 0, 50, 50);
    // this.ctx.strokeRect(z * x, z * y, z, z);
    this.animate();
  }
  

  animate() {  
    this.ctx.fillStyle = 'red';  
    const square = new Square(this.ctx);  
    // square.draw(5, 1, 25);  
    square.move(1, 30);
  }

}

export class Square {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
    this.ctx.strokeRect(z * x, z * y, z, z);
  }

  move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);      
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        // clearInterval(i);
        x = 0;
      }
    }, 200);    
  }

}