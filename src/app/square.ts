import { element } from 'protractor';

export class Square {
    private color = 'red';
    private x = 0;
    private y = 0;
    private z = 3;
  
    private square_width = 10;
    private square_height = 10;
  
    private max;
    private min;
    private max2;
    private min2;
    private intervalX;
    private intervalY;
  

    
    constructor(
    private ctx: CanvasRenderingContext2D, 
    private width?:number, 
    private height?:number,
    private color_input?:string) {

      setInterval( ()=> this.minMaxSetup(), 1000);
      
      this.max = 1;
      this.min = -1;
      
      this.max2 = 1;
      this.min2 = -1;
    
      if(this.color_input != null)
      this.color = this.color_input;
    }
    

    generateTargetPoint():TargetPoint {
        let point:TargetPoint; 
        
        point.targetX = Math.random() * (this.square_width ) + 1 ;
        point.targetY = Math.random() * (this.square_height ) + 1 ;

        return point;
    }

    // this is incorrect
    startToEndDifference():DifferencePoint {
        let targetPoint:TargetPoint = this.generateTargetPoint();
        let difference:DifferencePoint;


        difference.diffX = (this.x - targetPoint.targetX);
        difference.diffY = (this.y -  targetPoint.targetY);

        return difference;
    }

    magnitudeOfPoint(diffX, diffY):number {
        let magnitude = Math.sqrt( Math.pow(diffX,2) + Math.pow(diffY,2) );// root ( a^2 + b^2 ) = c
        return magnitude;
    }
    

    genratePath():Path {
        // generate path with arrays of length magnitude
        let path: Path;
   
        
        // let targetPoint:TargetPoint = this.generateTargetPoint();
        let difference:DifferencePoint = this.startToEndDifference();
        let magnitude:number = this.magnitudeOfPoint(difference.diffX, difference.diffY);

        // generate Array of size magnitude
        path.pathX = new Array(Math.ceil(magnitude));
        // assign differential value to each element in the array
        path.pathX.forEach(element => {
            element = difference.diffX;
        });

        // generate Array of size magnitude
        path.pathY = new Array(Math.ceil(magnitude));
        // assign differential value to each element in the array
        path.pathY.forEach(element => {
            element = difference.diffY;
        })

        // each array contains values diffX/magnitude and diffY/magnitude respectively
        return path;
    }


    minMaxSetup() {
      this.intervalX = Math.random() * (this.max2 - this.min2) + this.min2;
      this.intervalY = Math.random() * (this.max - this.min) + this.min;
    }
  
    moveRight() {
      this.x+=2;
      this.draw();
    }
  
    moveRandomly() {
  
      this.x += this.intervalX;
      this.y += this.intervalY;
  
  
      if (this.x < 0) {
        this.x = 0;
      }
  
      if (this.y < 0) {
        this.y = 0;
      }
  
  
      if (this.x > this.width-this.square_width) {
        this.x = this.width-this.square_width;
      }
  
      if (this.y > this.height-this.square_height) {
        this.y = this.height-this.square_height;
      }
  
      this.draw();
    }
    
    draw() {
      this.ctx.fillStyle = this.color //`rgba(${this.x},${this.y},${this.z},1)`;
      this.ctx.fillRect(this.x, this.y, this.square_width, this.square_height);
      console.log('x: ',this.x, 'y: ',this.y);
      
    }
  
    resetPositions(){
      this.x = 0;
      this.y = 0;
    }
  
  }


export interface TargetPoint {
    targetX:number;
    targetY:number;
}

export interface DifferencePoint {
    diffX:number;
    diffY:number;
}

export interface Path {
    pathX:number[];
    pathY:number[];
}