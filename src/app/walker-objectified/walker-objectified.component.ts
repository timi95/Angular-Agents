import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener, Input } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';


@Component({
  selector: 'app-walker-objectified',
  templateUrl: './walker-objectified.component.html',
  styleUrls: ['./walker-objectified.component.css'],
  styles: ['']
})
export class WalkerObjectifiedComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) 
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D ;
  private animationFrameID:number;

  private count = 0;
  private x; private y; 
  // setting a width and height for the canvas
  @Input() public width; 
  @Input() public height;
  
  private squares:Square[] = [];

  constructor(private ngZone: NgZone) {

  }

  ngAfterViewInit(){

    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    // set canvas width and height
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;

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



    this.animationFrameID = requestAnimationFrame(()=> this.animate() );
    console.log("frame ID: ",this.animationFrameID);
    
  }
  
  reset() {
    this.squares.forEach( sq =>{
      sq.resetPositions();
    });
    this.ngZone.runOutsideAngular(() => this.animate());
    // this.animationFrameID = requestAnimationFrame(()=> this.animate() );
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationFrameID);
  }
  
  ngOnInit() {

  }


}

export class Square {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 3;

  private square_width = 10;
  private square_height = 10;

  private max;
  private min;
  private max2;
  private min2;
  private intervalX;
  private intervalY;


  
  constructor(private ctx: CanvasRenderingContext2D, private width?:number, private height?:number) {
    setInterval( ()=> this.minMaxSetup(), 1000);
    
    this.max = 1;
    this.min = -1;
    
    this.max2 = 1;
    this.min2 = -1;

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


    if (this.x > this.width-this.square_width) {
      this.x = this.width-this.square_width;
    }

    if (this.y > this.height-this.square_height) {
      this.y = this.height-this.square_height;
    }

    this.draw();
  }
  
  draw() {
    this.ctx.fillStyle = 'red' //`rgba(${this.x},${this.y},${this.z},1)`;
    this.ctx.fillRect(this.x, this.y, this.square_width, this.square_height);
    console.log('x: ',this.x, 'y: ',this.y);
    
  }

  resetPositions(){
    this.x = 0;
    this.y = 0;
  }

}