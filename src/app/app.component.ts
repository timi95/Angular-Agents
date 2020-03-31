import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from './turtle';
import * as p5 from 'p5';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit,OnDestroy {

  private p5;
  private WalkerDisplayType="";
  private walkerTypeList = [
    'redWalker',
    'blueWalker',
    'greenWalker',
    'purpleWalker'
  ] ;


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
