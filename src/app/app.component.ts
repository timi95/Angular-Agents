import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, HostBinding, HostListener } from '@angular/core';
import { Turtle } from './turtle';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit,OnDestroy {
  name = 'Angular';
  running:boolean;
  @ViewChild('myCanvas', { static: true })
  canvasRef: ElementRef;
  turtle:Turtle ;

  // Animation sequence
  
  constructor(private ngZone: NgZone) {
    // setTimeout(this.animate, 1000);
    // let turtle = new Turtle();
  }



  ngOnInit(){
    this.running = true;
    this.turtle = new Turtle();
    // this.animate(this.turtle);
    // this.ngZone.runOutsideAngular(() => this.animate(this.turtle));
  }
  ngOnDestroy() {
    this.running = false;
  }
}
