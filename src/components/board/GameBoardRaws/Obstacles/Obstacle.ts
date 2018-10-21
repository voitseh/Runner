import { Sprite, Container } from 'pixi.js';
import { Player } from '../../../../utilities/Player'
import { Setting, Direction } from '../../../../Settings';

export abstract class Obstacle {

  DIRECTION: Direction;

  public readonly obstacleType: string;
  public speedInc: number;
  protected stage: Container;
  protected sprite: Sprite;

  constructor(private imgPath: string, public posX: number, public posY: number) {
    this.setSprite(imgPath, posX, posY);
  }

  protected setSprite(imgPath: string, posX: number, posY: number) {
    let sprite =  PIXI.Sprite.fromFrame(imgPath);
    sprite.width = Setting.OBSTACLE_WIDTH;
    sprite.height = Setting.OBSTACLE_HEIGHT;
    sprite.position.x = posX;
    sprite.position.y = posY;
    this.sprite = sprite;
    let stage = new PIXI.Container();
    stage.addChild(sprite);
    this.stage = stage;
  }

  public getType(): string {
    return this.obstacleType;
  }

  public getStage(): Container {
    return this.stage;
  }

  public setPosition(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  public getPosition(): [number, number] {
    return [this.posX, this.posY]
  }

  abstract checkCollisionWithPlayer(player: Player): boolean

}

