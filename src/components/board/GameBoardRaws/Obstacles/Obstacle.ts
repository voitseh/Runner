import {Sprite, Container} from 'pixi.js';
import {Player} from '../../../../utilities/Player'

export abstract class Obstacle { 

  readonly obstacleType: string;

  public static OBSTACLE_WIDTH = 15;

  public static readonly OBSTACLE_HEIGHT = 15;

  protected  stage: Container;

  protected sprite: Sprite;

  constructor(private imgPath: string, public posX: number, public posY: number) {
    this.setSprite(imgPath, posX, posY)
  }

  protected setSprite(imgPath: string, posX: number, posY: number){
    let texture = PIXI.loader.resources[imgPath].texture;
    let sprite = new PIXI.Sprite(texture);
    if(this.obstacleType == "log")
    sprite.width = 40;
    else
    sprite.width = Obstacle.OBSTACLE_WIDTH;
    sprite.height = Obstacle.OBSTACLE_HEIGHT;
    sprite.position.x = posX;
    sprite.position.y = posY;
    this.sprite = sprite;
    let stage = new PIXI.Container();
    stage.addChild(sprite);
    this.stage = stage;
  }

  

  getType(): string{
    return this.obstacleType;
  }

  getStage(): Container{
    return this.stage;
  }

  setPosition(posX: number, posY: number){
    this.posX = posX;
    this.posY = posY;
  }

  getPosition():[number, number]{
    return [this.posX, this.posY]
  }

  abstract checkCollisionWithPlayer(player:Player):boolean

}

