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
  
    private path;
    private target;
    private difference: DifferencePoint;

    
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

        //   this.target = { targetX:this.width/2, targetY:this.height/2};
        this.target = this.generateTargetPoint();
        console.log("this is the target: ",this.target);
        



        this.path = this.generatePath();
          console.log("path initialised as: ", this.path);
        
        this.difference = this.startToEndDifference();

    }
    

    generateTargetPoint():TargetPoint {
        console.log("generate target ran !");
        
        let target:TargetPoint = { targetX:0, targetY: 0}; 
        
        target.targetX = Math.floor(Math.random() * this.width-this.square_width) + 1 ;
        target.targetY = Math.floor(Math.random() * this.height-this.square_height) + 1 ;

        // target.targetX = 50;
        // target.targetY = 40 ;

        // console.log("generated Target: ",target);
        
        return target;
    }

    // this is incorrect
    startToEndDifference():DifferencePoint {
        let targetPoint:TargetPoint = this.target;
        let difference:DifferencePoint = { diffX:0, diffY: 0}; 


        difference.diffX = (targetPoint.targetX - this.x);
        difference.diffY = (targetPoint.targetY - this.y);

        return difference;
    }

    magnitudeOfPoint(diffX, diffY):number {
        let magnitude = Math.sqrt( Math.pow(diffX,2) + Math.pow(diffY,2) );// root ( a^2 + b^2 ) = c
        return Math.sqrt(magnitude);
    }
    

    generatePath():Path {
        // generate path with arrays of length magnitude
        let path: Path = { pathX:[], pathY:[] };
   
        
        // let targetPoint:TargetPoint = this.generateTargetPoint();
        let difference:DifferencePoint = this.startToEndDifference();
        let magnitude:number = this.magnitudeOfPoint(difference.diffX, difference.diffY);

        // generate Array of size magnitude
        // console.log(Math.ceil(magnitude));
        
        // path.pathX = new Array(Math.ceil(magnitude));
        for (let index = 0; index < Math.ceil(magnitude); index++) {
            path.pathX.push( (difference.diffX/magnitude) );
        }

        for (let index = 0; index < Math.ceil(magnitude); index++) {
            path.pathY.push(difference.diffY/magnitude);
        }

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
    //   console.log('x: ',this.x, 'y: ',this.y);
      
    }


    moveAlongPath() {
        
        if ( this.x != this.target.targetX || this.y != this.target.targetY ) {
            if ( this.x < this.target.targetX ) {
                this.x += this.path.pathX[0];
            } 

            if ( this.y < this.target.targetY ) {
                this.y += this.path.pathY[0];
            } 

        } 

        // if ( this.y != this.target.targetY ) {
        //     this.y += this.path.pathY[0];
        // }



        // if ( this.path.pathX.length > 0 ) {
        //     this.x += this.path.pathX[0];
        //     this.path.pathX.splice(this.path.pathX.length,1);
        // }

        // if ( this.path.pathy.length > 0 ) {
        //     this.y += this.path.pathY[0];
        //     this.path.pathY.splice(this.path.pathY.length,1);
        // }


        // if ( this.x == this.target.targetX && this.y == this.target.targetY ) {
        //     this.target = this.generateTargetPoint();
        //     this.path = this.generatePath();
        // }



//   boundary checks
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
        // console.log('x: ',this.x, 'y: ',this.y);
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