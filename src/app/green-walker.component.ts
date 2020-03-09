import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener, Input } from '@angular/core';
import { Turtle } from './turtle';
import * as p5 from 'p5';
import { Square } from './square';


@Component({
  selector: 'green-walker',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  template:`
    <div>
        <canvas #canvas ></canvas>
        <button (click)="reset()">Reset</button> 
        <button (click)="stopAnimation()">Stop</button>
    </div>
  `,
  styles: [`
                canvas { 
                    border-style: solid;
                    height: 500px;
                    width: 500px;
                }
            `
    ]
})
export class GreenWalker implements OnInit,OnDestroy {
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


  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }


  // Animation sequence
  
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
      this.squares.push(new Square(this.ctx, this.width, this.height, 'green'));     
    }



    this.ngZone.runOutsideAngular(() => this.animate());
}
 
animate() {  
    // clear the screen before any drawing is done
    this.ctx.clearRect(0,0, this.width,this.height);

    // move each of the squares
    this.squares.forEach( sq => {
      // sq.moveRandomly();
    sq.generateTargetPoint();
    sq.generatePath()
    sq.moveAlongPath();
    })


    cancelAnimationFrame(this.animationFrameID);

    this.animationFrameID = requestAnimationFrame(()=> this.animate() );
    // console.log("frame ID: ",this.animationFrameID);
    
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
  

  
//









  
}
