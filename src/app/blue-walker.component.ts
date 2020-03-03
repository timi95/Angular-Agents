import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from './turtle';
import * as p5 from 'p5';


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



  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }


  // Animation sequence
  
  constructor() {
  }


  
//









  
}
