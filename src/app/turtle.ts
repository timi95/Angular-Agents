import { Nouns } from "./nouns";
import { Adjectives } from "./adjectives";
import { RGBA_colour } from "./rgba-colour";

// Agent behaviour is  sense - plan - act cycle
export class Turtle {
  private myName:string;
  private xcoordinate:number;
  private ycoordinate:number;
  private angle:number;
  private ctx:any;
  private fillColor:any;

  private colour:RGBA_colour;

  private centreCoordinate:number[];
  private bodyArea:number;

 constructor() { 
    this.myName = this.generateName();
    console.log(`A new Turtle ${this.myName} was born !`); 
    // this.draw();
  }

  // ********  Low level functions  ***************
  generateName(): string {
    let nameArray:string[] = new Nouns().getNouns();
    let adjectiveArray:string[] = new Adjectives().getAdjectives();
    let randomSeed:number = Math.floor(Math.random()*adjectiveArray.length);
    let randomSeed2:number = Math.floor(Math.random()*nameArray.length);

    return `${adjectiveArray[randomSeed]} ${nameArray[randomSeed2]}`;
  }

  public draw(x?:number, y?:number){
    console.log(`Turtle ${this.myName} has been drawn !`);
    
  }

  checkPosition(){
  }
  // rotate orientation delta degrees counterclockwise
  turnLeft( delta:number) {
  }
  // rotate orientation delta degrees clockwise
  turnRight( delta:number) {
  }

  line(oldx:number, oldy:number, x:number, y:number){
  }
  // move forward the given amount, with the pen down
  goForward(step:number) {
  }


  // ************** Turtle behaviours *******************

  // A random walk for this turtle
  wander(){
    console.log(`${this.myName} the turtle is wandering`);
    
  }
  follow( myPosition:number[], followingPosition:number[] ){
    console.log(`${this.myName} the turtle is following: ${followingPosition}`);
    
  }

}
