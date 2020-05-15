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
  public WalkerDisplayType="";
  public walkerTypeList = [
    'redWalker',
    'blueWalker',
    'greenWalker',
    'purpleWalker',
    'orangeWalker'
  ] ;


  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }


  changeWalkerDisplayType(e) {
    console.log("type of event",e.type);
    
    console.log("Type change fired!");
    
    this.WalkerDisplayType = e.target.value;
    console.log("changed type to: ",this.WalkerDisplayType);
    
    
  }

  // Animation sequence
  
  constructor() {
  }


  
//









  
}
