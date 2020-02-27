import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener, Input } from '@angular/core';
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

  private count = 0;
  private x; private y; 
  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;
  
  private squares:Square[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(){
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // push squares into the squares array
    for (let index = 0; index < 3; index++) {
      this.squares.push(new Square(this.ctx, this.width, this.height));     
    }

    this.ngZone.runOutsideAngular(() => this.animate());
 }
 
 
  animate() {  
    // clear the screen before any drawing is done
    this.ctx.clearRect(0,0, this.width,this.height);

    // move each of the squares
    this.squares.forEach( sq => {
      sq.moveRandomly();
    })



    window.requestAnimationFrame(()=> this.animate() );
  }
  
  reset() {
    this.squares.forEach( sq =>{
      sq.resetPositions();
    })
  }
  
  ngOnInit() {
    
  }


}

export class Square {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 3;


  private max;
  private min;
  private max2;
  private min2;
  private intervalX;
  private intervalY;


  
  constructor(private ctx: CanvasRenderingContext2D, private width?:number, private height?:number) {
    this.max = 3;
    this.min = -3;
    
    this.max2 = 3;
    this.min2 = -3;
    setInterval( ()=> this.minMaxSetup(), 1000);
  }
  
  
  minMaxSetup() {
    this.intervalX = Math.random() * (this.max2 - this.min2) + this.min2;
    this.intervalY = Math.random() * (this.max - this.min) + this.min;
  }

  moveRight() {
    this.x+=2;
    this.draw();
  }

  moveRandomly() {
    this.x += this.intervalX;
    this.y += this.intervalY;


    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }


    if (this.x > this.width-40) {
      this.x = this.width-40;
    }

    if (this.y > this.height-40) {
      this.y = this.height-40;
    }

    this.draw();
  }
  
  draw() {
    this.ctx.fillStyle = 'red' //`rgba(${this.x},${this.y},${this.z},1)`;
    this.ctx.fillRect(this.x, this.y, 40, 40);
    console.log('x: ',this.x, 'y: ',this.y);
    
  }

  resetPositions(){
    this.x = 0;
    this.y = 0;
  }

}