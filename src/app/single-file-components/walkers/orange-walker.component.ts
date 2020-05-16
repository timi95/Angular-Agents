import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener, Input } from '@angular/core';
import { Turtle } from '../../turtle';
import * as p5 from 'p5';
import { Square } from '../../square';
import { SubjectLocationService } from '../../subject-location.service';


@Component({
  selector: 'orange-walker',
  styleUrls: [ '../../app.component.css' ],
  template:`
    <div>
        <canvas #canvas ></canvas>
        <br>
        <button (click)="reset()">Reset</button> 
        <button (click)="stopAnimation()">Stop</button>
    </div>
  `,
  styles: [`
                canvas { 
                    border-style: solid;
                    width: 80%;
                }
            `
    ]
})
export class OrangeWalker implements OnInit,OnDestroy {
    @ViewChild('canvas', { static: true }) 
    private canvas: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D ;
    private animationFrameID:number;

    private count;
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
  
  constructor(
  private ngZone: NgZone, 
  private subjectLocationService: SubjectLocationService) {
      
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
      this.squares.push(new Square(this.ctx, this.width, this.height, 'orange', this.subjectLocationService));     
    }

    this.ngZone.runOutsideAngular(() => { this.animate();}  );
  }
  
  
  setNull():void {
    
  }
  
  
  animate() {  
    // clear the screen before any drawing is done
    this.ctx.clearRect(0,0, this.width,this.height);
    
    // move each of the squares
    this.squares.forEach( sq => {
      // sq.moveRandomly();
      sq.testingSwervingMotions();
    });
    

    cancelAnimationFrame(this.animationFrameID);

    this.animationFrameID = requestAnimationFrame(()=> this.animate() );
    // console.log("frame ID: ",this.animationFrameID);
    
    if(this.squares && this.squares.length) {//if the array is not empty
      for (let index = 0; index < this.squares.length; index++) {
        // delete this.squares[index];
        if(this.squares[index].lifeSpan < 1) { //check if the lifeSpan is 0
          console.log("deletion commensed");
          
          this.squares.splice(index,1); //delete
        }
      }
    }

    for (let square of this.squares) {
        // limit population to a maximum of 10
        if ( this.squares.length > 10 ){
          this.squares.pop();
        }        
        if (square.pregancyPeriod >= 10) {
            // add new square
            this.squares.push(new Square(this.ctx, this.width, this.height, 'orange', this.subjectLocationService));     
            // set pregnancy counter back to zero
            square.setPregnancyToNill();
        }
    }


}

 
reset() {
    this.squares = [];

    for (let index = 0; index < 3; index++) {
      this.squares.push(new Square(this.ctx, this.width, this.height, 'orange', this.subjectLocationService));     
    }

    this.squares.forEach( sq => {
      sq.resetPositions();
      sq.setColour("orange");
    });
    this.ngZone.runOutsideAngular(() => this.animate());
    // this.animationFrameID = requestAnimationFrame(()=> this.animate() );
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationFrameID);
  }
  

  
//









  
}
