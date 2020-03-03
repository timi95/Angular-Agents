import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener, Input } from '@angular/core';
import { Turtle } from './turtle';
import * as p5 from 'p5';
import { Square } from './square';


@Component({
  selector: 'blue-walker',
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
export class BlueWalker implements OnInit,OnDestroy {
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


  
//









  
}
