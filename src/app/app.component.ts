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
  
  constructor() {
    // setTimeout(this.animate, 1000);
    // let turtle = new Turtle();
  }

//

  ngOnInit(){
    this.running = true;
    this.turtle = new Turtle();
    this.animate(this.turtle);
    // this.ngZone.runOutsideAngular(() => this.animate(this.turtle));
  }
  animate(turtle?: Turtle): any {
    // Check that we're still running.
    if (!this.running) {
      return;
    }
    
    let i = 0;
    requestAnimationFrame(()=> {
      this.animate;
      i+=1;
      console.log(i);
      
    } )
  }
  ngOnDestroy() {
    this.running = false;
  }
}
