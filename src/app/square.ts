import { element } from 'protractor';
// import { UUID } from 'angular2-uuid';
import { v4 as uuid } from 'uuid';
import { SubjectLocationService } from './subject-location.service';

export class Square {
    private color = 'red';
    private uuid: string;
    private x = 0;
    private y = 0;
    private z = 3;
  
    private square_width = 20;
    private square_height = 20;
  
    private max;
    private min;
    private max2;
    private min2;
    private intervalX;
    private intervalY;
  
    private path;
    private target;
    private difference: DifferencePoint;
    private rotationDegree = this.setRotationDegree();

    public lifeSpan:number;
    public pregancyPeriod:number;



    
    constructor(
      private ctx: CanvasRenderingContext2D, 
      private width?:number, 
      private height?:number,
      private color_input?:string,
      private subjectLocationService?: SubjectLocationService,
      private isMortal?:boolean) {
        this.uuid = uuid();
        setInterval( ()=> this.minMaxSetup(), 1000);
        setInterval( ()=> this.setRotationDegree(), 6000);
        
        this.pregancyPeriod = 0;

        this.lifeSpan = Math.floor(Math.random() * 10) + 1 ;
        if(this.isMortal )
        setInterval( ()=> this.decrementLifeSpan(), 1000);
        
        this.x = Math.floor(Math.random() * this.width-this.square_width) + 1 ;
        this.y = Math.floor(Math.random() * this.height-this.square_height) + 1 ;

        this.max = 1;
        this.min = -1;

        this.max2 = 1;
        this.min2 = -1;

        if(this.color_input != null)
        this.color = this.color_input;

        //   this.target = { targetX:this.width/2, targetY:this.height/2};
        this.target = this.generateTargetPoint();
        // console.log("this is the target: ",this.target);
        



        this.path = this.generatePath();
          // console.log("path initialised as: ", this.path);
        
        this.difference = this.startToEndDifference();

    }
    
    incrementPregnancy(): void {
      this.pregancyPeriod += 1;
    }

    setPregnancyToNill(): void {
      this.pregancyPeriod = 0;
    }

    decrementLifeSpan() {
      if(this.lifeSpan != 0){
        console.log(`current lifeSpan: ${this.lifeSpan}`);
        this.lifeSpan -= 1;
      }
    }

    public getLifeSpan():number {
      return this.lifeSpan;
    }

    generateTargetPoint():TargetPoint {
        // console.log("generate target ran !");
        
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
        let difference:DifferencePoint = { diffX:0, diffY: 0 }; 


        // difference.diffX = (targetPoint.targetX - this.x);
        // difference.diffY = (targetPoint.targetY - this.y);
        if (this.x > targetPoint.targetX ) {

          difference.diffX = -Math.abs(targetPoint.targetX - this.x);
          // console.log("negative diffX: ",difference.diffX);
        } else {
          difference.diffX = (targetPoint.targetX - this.x);
        }
        
        if ( this.y > targetPoint.targetY ) {
          difference.diffY = -Math.abs(targetPoint.targetY - this.y);
          // console.log("negative diffY: ",difference.diffY);
        } else {
          difference.diffY = (targetPoint.targetY - this.y);
        }
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

    randomNumber(minimum, maximum){
      return Math.round( Math.random() * (maximum - minimum) + minimum);
    }
    
    
    draw() {
      this.ctx.fillStyle = this.color //`rgba(${this.x},${this.y},${this.z},1)`;
      this.ctx.fillRect(this.x, this.y, this.square_width, this.square_height);
      if (this.color_input == 'orange')
      this.ctx.strokeRect(this.x, this.y, this.square_width, this.square_height)
      //   console.log('x: ',this.x, 'y: ',this.y);
      
    }
    
    
    moveAlongPath() {
      // follow path if the target is not reached
      if ( this.x != this.target.targetX || this.y != this.target.targetY ) {
        
        
          this.x += this.path.pathX[0]/5;
          this.y += this.path.pathY[0]/5;
          
          if( Math.abs(this.x - this.target.targetX) < 3 
          || Math.abs(this.y - this.target.targetY) < 3 ) {
            // console.log("Retargeting, and recalculating path!");
            // console.log(`x: ${this.x} , targetX:${this.target.targetX}`);
            
            
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
          }

        } 


        // change path if the target is reached
        if ( this.x == this.target.targetX 
          || this.y == this.target.targetY 
          ) {
            // console.log("Retargeting, and recalculating path!");
            // console.log(`x: ${this.x} , targetX:${this.target.targetX}`);
            
            
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();

        }



//   boundary checks
        if (this.x < 0) {
            this.x = 0;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }
    
    
        if (this.x > this.width-this.square_width) {
            this.x = this.width-this.square_width;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }
    
        if (this.y > this.height-this.square_height) {
            this.y = this.height-this.square_height;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }

        // this.drawWithCollision();

        if ( this.subjectLocationService ) {
          this.subjectLocationNegotiation();
        }
        this.draw();
        // console.log('x: ',this.x, 'y: ',this.y);
    }

    
    testingSwervingMotions() {
 
      // follow path if the target is not reached
      if ( this.x != this.target.targetX || this.y != this.target.targetY ) {
        
        
        this.x += this.path.pathX[0]/5;
        this.y += this.path.pathY[0]/5;
        
        if( Math.abs(this.x - this.target.targetX) < 3 
        || Math.abs(this.y - this.target.targetY) < 3 ) {
          
          this.target = this.generateTargetPoint();
          this.path = this.generatePath();
        }
        
        // Much better swerving when swerving towards the target point !
        this.rotate(this.target.targetX, this.target.targetY, this.x, this.y,  this.rotationDegree);

        } 


        // change path if the target is reached //
        if ( this.x == this.target.targetX 
          || this.y == this.target.targetY 
          ) {

            this.target = this.generateTargetPoint();
            this.path = this.generatePath();

        }


//.............
        // boundary checks
        if (this.x < 0) {
            this.x = 0;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }
    
    
        if (this.x > this.width-this.square_width) {
            this.x = this.width-this.square_width;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }
    
        if (this.y > this.height-this.square_height) {
            this.y = this.height-this.square_height;
            this.target = this.generateTargetPoint();
            this.path = this.generatePath();
        }

        if ( this.subjectLocationService ) {
          this.subjectLocationNegotiation();
        }
        this.draw();
        // this.rotate((this.ctx.canvas.width/2), (this.ctx.canvas.height/2), this.x, this.y, 1);


        // console.log('x: ',this.x, 'y: ',this.y);
    }



  
    resetPositions(){
      this.x = 0;
      this.y = 0;
    }


    getSubjectLocation():SubjectLocation {

      return {
        id: this.uuid,
        x: this.x,
        y: this.y
      };
    }

    subjectLocationNegotiation() {
      //step 1: push this location into a BehaviorSubject
      this.subjectLocationService.publishLocation(this.getSubjectLocation());
      
      //step 2: subscribe to rxSubject value stream
      this.subjectLocationService.getSubjectLocations().subscribe( subjectLocation => {
        
        //step 3: consider SubjectLocation objects from stream that are not this objects particular SubjectLocation
        if ( subjectLocation.id != this.uuid ) {
          //step 4: set the color of this object according to how close the other SubjectLocations are to this objects location
          if ( this.inRange(subjectLocation.x, this.getSubjectLocation().x, this.getSubjectLocation().x+this.square_width) 
            && this.inRange(subjectLocation.y, this.getSubjectLocation().y, this.getSubjectLocation().y+this.square_height) ) {
              this.setColour("red");

              // count up to birth
              // setInterval( ()=> this.incrementPregnancy(), 1000);
              
            } else {
              this.setColour(this.color_input);
            }

        }  });//subscription end

        if( this.color == 'red')
        this.incrementPregnancy();

    }




    inRange(value: number, rangeStart: number, rangeEnd: number):boolean {
      if ( Math.abs(value) >= rangeStart && Math.abs(value) <= rangeEnd )
      { return true; }
      else 
      { return false; }

    }



    getX(){
      return this.x;
    }
    getY() {
      return this.y;
    }

    getZ() {
      return this.z;
    }


    getSquareWidth() {
      return this.square_width;
    }

    getSquareHeight() {
      return this.square_height;
    }

    setColour( setColour) {
      this.color = setColour ;
    }
  
    rotate(axisX:number, axisY:number, x:number, y:number, rotationAngleInDegrees:number ) {
      /**
       * The first two parameters are the X and Y coordinates of the central point 
       * (the origin around which the second point will be rotated). 
       * The next two parameters are the coordinates of the point that we'll be rotating. 
       * The last parameter is the angle, in degrees.
       * 
       * As an example, we'll take the point (2, 1) and rotate it around the point (1, 1) 
       * by 90 degrees clockwise.
       * 
       //rotate(1, 1, 2, 1, 90);
       // > [1, 0]
       */

      

      let radians = (Math.PI / 180) * rotationAngleInDegrees;
      let cos = Math.cos(radians);
      let sin = Math.sin(radians);
      let nx = (cos * (x - axisX)) + (sin * (y - axisY)) + axisX;
      let ny = (cos * (y - axisY)) - (sin * (x - axisX)) + axisY;
      // return {x:nx, y:ny};

      this.x = nx;
      this.y = ny;
    }

    setRotationDegree() {
      return Math.floor(Math.random()*2) == 1 ? 1 : -1;   
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

// for use when pushing various locations into a Behaviour subject
export interface SubjectLocation {
  id:string;
  x:number;
  y:number;
}


