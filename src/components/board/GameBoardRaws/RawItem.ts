import { Sprite, Container } from "pixi.js";
import { Obstacle } from "./Obstacles/Obstacle";

export class RawItem {

  public static readonly RAW_WIDTH = 600;

  public static readonly RAW_HEIGHT = 40;

  private rawType: string;
  
  private readonly stage: Container;

  protected sprite: Sprite;

  public allObstacles: any[]

  constructor(private imgPath: string, public posX: number, public posY: number) {
    let texture = PIXI.loader.resources[imgPath].texture;
    let sprite = new PIXI.Sprite(texture);
    sprite.width = RawItem.RAW_WIDTH;
    sprite.height = RawItem.RAW_HEIGHT;
    sprite.position.x = posX;
    sprite.position.y = posY;
    this.sprite = sprite;
    let stage = new PIXI.Container();
    stage.addChild(sprite);
    stage.interactive = true;
    this.stage = stage;
    this.allObstacles = []
  }

  getType(): string{
      return this.rawType;
  }

  setType(rawType:string){
    this.rawType = rawType;
  }

  getStage(): Container{  
    return this.stage;
  }

  getPosition():[number, number]{
    return [this.posX, this.posY]
  }

  
  
} 
export enum Direction {
  Left,
  Right
}
