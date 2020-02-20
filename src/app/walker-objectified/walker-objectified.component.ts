import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from '../turtle';
import * as p5 from 'p5';


@Component({
  selector: 'app-walker-objectified',
  templateUrl: './walker-objectified.component.html',
  styleUrls: ['./walker-objectified.component.css']
})
export class WalkerObjectifiedComponent implements OnInit {

  private p5:p5;
  private bug1; // Declare objects
  private bug2;
  private bug3;
  private bug4;

  constructor() {
    this.createCanvas();
 }


 private createCanvas() {
   this.p5 = new p5(this.sketch);

   this.bug1 = new Jitter(this.p5);
   this.bug2 = new Jitter(this.p5);
   this.bug3 = new Jitter(this.p5);
   this.bug4 = new Jitter(this.p5);

 }
 
 private sketch(p: any) {
 
 
   p.setup = () => {
     p.createCanvas(p.windowWidth, p.windowHeight).parent('walker-objects-canvas');
   };
 
 
   p.windowResized = () => {
     p.resizeCanvas(p.windowWidth, p.windowHeight);
   }
 
   p.draw = () => {

    p.background(250);
    p.bug1.move();
    p.bug1.display();
    p.bug2.move();
    p.bug2.display();
    p.bug3.move();
    p.bug3.display();
    p.bug4.move();
    p.bug4.display();

   };
 }  
  ngOnInit() {
  }

}

class Jitter {
  private x;
  private y;
  private p5:p5;
  private diameter;
  private speed;

  constructor(p?:p5) {
    this.p5 = p;
    this.x = p.random(p.width/2);
    this.y = p.random(p.height/2);
    this.diameter = p.random(10, 30);
    this.speed = 1;
    console.log("Jitter created !");
    
  }

  move() {
    // this.x += p5.random(-this.speed, this.speed);
    // this.y += p5.random(-this.speed, this.speed);
  }

  display() {
    this.p5.ellipse(this.x, this.y, 80, 80);
  }
}