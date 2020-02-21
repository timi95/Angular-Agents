import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';


@Component({
  selector: 'app-walker-objectified',
  templateUrl: './walker-objectified.component.html',
  styleUrls: ['./walker-objectified.component.css']
})
export class WalkerObjectifiedComponent implements OnInit {
  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;


  constructor() {

 }


  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  

  animate(): void {}

}
