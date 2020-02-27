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

    // push one square into the squares array
    this.squares.push(new Square(this.ctx));

    this.ngZone.runOutsideAngular(() => this.animate());
 }
 
 
  animate() {  
    // clear the screen before any drawing is done
    this.ctx.clearRect(0,0, this.width,this.height);
    this.squares[0].moveRight();

    console.log(this.squares);


    window.requestAnimationFrame(()=> this.animate() );
  }
  
  
  ngOnInit() {
    
  }


}

export class Square {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 3;

  constructor(private ctx: CanvasRenderingContext2D) {}



  moveRight() {
    this.x+=2;
    if(this.x > 400)
      this.x = 0;
    this.draw();
  }
  
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 40, 40);
  }


}