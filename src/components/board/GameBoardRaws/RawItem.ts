import { Sprite, Container } from "pixi.js";
import { Obstacle } from "./Obstacles/Obstacle";
import { Setting } from "../../../Settings";

export class RawItem {

  private rawType: string;
  private readonly stage: Container;
  protected sprite: Sprite;
  public allObstacles: any[]

  constructor(private imgPath: string, public posX: number, public posY: number) {
    let texture = PIXI.loader.resources[imgPath].texture;
    let sprite = new PIXI.Sprite(texture);
    sprite.width = Setting.RAW_WIDTH;
    sprite.height = Setting.RAW_HEIGHT;
    sprite.position.x = posX;
    sprite.position.y = posY;
    this.sprite = sprite;
    let stage = new PIXI.Container();
    stage.addChild(sprite);
    stage.interactive = true;
    this.stage = stage;
    this.allObstacles = []
  }

  public getType(): string {
    return this.rawType;
  }

  public setType(rawType: string) {
    this.rawType = rawType;
  }

  public getStage(): Container {
    return this.stage;
  }

  public getPosition(): [number, number] {
    return [this.posX, this.posY]
  }
}
export enum Direction {
  Left,
  Right
}
