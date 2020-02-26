import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';


@Component({
  selector: 'app-walker-objectified',
  templateUrl: './walker-objectified.component.html',
  styleUrls: ['./walker-objectified.component.css'],
  styles: ['canvas { border-style: solid }']
})
export class WalkerObjectifiedComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) 
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D ;

  private x; private y; private width; private height;
  private squares = [];

  constructor(private ngZone: NgZone) {
    // ngZone.runOutsideAngular(() => this.animate());
    // this.animate();
    
 }

 ngAfterViewInit(){
  this.ctx = this.canvas.nativeElement.getContext('2d');
  console.log("this is ctx",this.ctx);

 }

  ngOnInit() {
    // this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    // this.ctx.fillStyle = 'red';  
    // this.ctx.fillRect(0, 0, 50, 50);
    // this.ctx.strokeRect(z * x, z * y, z, z);
    // for (let index = 0; index < 1; index++) {
    //   this.squares.push(new Square(this.ctx));
    // }
    // this.animate();
    // this.ngZone.runOutsideAngular(() => this.animate());
    
  }
  

  animate() {  
    // this.ctx.fillStyle = 'red';  
    // const square = new Square(this.ctx);  
    
    // square.draw(5, 1, 25);  
    // this.squares[index].move(1, 30);
    
    // this.ctx.clearRect(0, 0, this.width, this.height);
    // this.squares.forEach((square: Square) => {
    //   square.moveRight();
    // });
    // setInterval(() => {
     
    // }, 200);
    
    // const id = requestAnimationFrame(this.animate);
    // requestAnimationFrame(this.animate);
  }



}

export class Square {
 private color = 'blue';
  private x = 0;
  private y = 0;
  private z = 30;

  constructor(private ctx: CanvasRenderingContext2D) {}



  moveRight() {
    this.x++;
    this.ctx.clearRect(this.z * this.x, this.z * this.y, this.z, this.z);
    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }


}