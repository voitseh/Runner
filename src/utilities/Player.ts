import { Obstacle } from "../components/board/GameBoardRaws/Obstacles/Obstacle";
import { Container } from "pixi.js";
import { RawItem } from "../components/board/GameBoardRaws/RawItem";
import { GameBoard } from "../components/board/GameBoard";
import { Setting } from "../Settings";

export class Player {

  private speed: number = 5;
  public sprite = new PIXI.Sprite();
  private stage: Container;

  public static livesCount = 5;

  private textureCounterForward: number = 0;
  private updateTextureForward = () => {
    this.sprite.texture = PIXI.loader.resources[Setting.FORWARD_FRAME_LIST[this.textureCounterForward++]].texture;
    if (this.textureCounterForward === Setting.FORWARD_FRAME_LIST.length) this.textureCounterForward = 0;
  }

  private textureCounterBack: number = 0;
  private updateTextureBack = () => {
    this.sprite.texture = PIXI.loader.resources[Setting.BACK_FRAME_LIST[this.textureCounterBack++]].texture;
    if (this.textureCounterBack === Setting.BACK_FRAME_LIST.length) this.textureCounterBack = 0;
  }

  private textureCounterLeft: number = 0;
  private updateTextureLeft = () => {
    this.sprite.texture = PIXI.loader.resources[Setting.LEFT_FRAME_LIST[this.textureCounterLeft++]].texture;
    if (this.textureCounterLeft === Setting.LEFT_FRAME_LIST.length) this.textureCounterLeft = 0;
  }

  private textureCounterRight: number = 0;
  private updateTextureRight = () => {
    this.sprite.texture = PIXI.loader.resources[Setting.RIGHT_FRAME_LIST[this.textureCounterRight++]].texture;
    if (this.textureCounterRight === Setting.RIGHT_FRAME_LIST.length) this.textureCounterRight = 0;
  }

  private textureCounterDie: number = 0;
  public updateTextureDie = () => {
    this.sprite.texture = PIXI.loader.resources[Setting.DIE_FRAME_LIST[this.textureCounterDie++]].texture;
    if (this.textureCounterDie === Setting.DIE_FRAME_LIST.length) this.textureCounterDie = 0;
  }

  private updateSpriteForward = () => {
    if (!(this.sprite.y < -this.sprite.height / 2)) this.sprite.y -= this.speed;
  }

  private updateSpriteBack = () => {
    if (!(this.sprite.y > Setting.BOARD_HEIGHT - this.sprite.height)) this.sprite.y += this.speed;
  }

  private updateSpriteLeft = () => {
    if (!(this.sprite.x < this.sprite.width / 2)) this.sprite.x -= this.speed;
  }

  private updateSpriteRight = () => {
    if (!(this.sprite.x > Setting.BOARD_WIDTH - this.sprite.width - 5)) this.sprite.x += this.speed;
  }

  public reset() { console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
    this.sprite.x = Setting.BOARD_WIDTH / 2;
    this.sprite.y = Setting.BOARD_HEIGHT - Setting.PLAYER_HEIGHT - 2;
  }

  constructor(private gameBoard: GameBoard) {
    let texture = PIXI.loader.resources["./images/player/forward1.png"].texture;
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.width = Setting.PLAYER_WIDTH;
    this.sprite.height = Setting.PLAYER_HEIGHT;
    let stage = new PIXI.Container();
    stage.addChild(this.sprite);
    this.stage = stage;

    this.reset();

    document.addEventListener('keydown', e => {

      switch (e.keyCode) {
        case 65: case 37:  //left
          this.onKeyClick(this.updateTextureLeft(), this.updateSpriteLeft());
          break;
        case 38: case 87:  //forward
          this.onKeyClick(this.updateTextureForward(), this.updateSpriteForward());
          break;
        case 39: case 68: //right
          this.onKeyClick(this.updateTextureRight(), this.updateSpriteRight());
          break;
        case 40: case 83: //down
          this.onKeyClick(this.updateTextureBack(), this.updateSpriteBack());
          break;
        default:
          break;
      }
    });
  }
  private onKeyClick(updateTexture: void, updateSprite: void) {
    updateTexture;
    updateSprite;
    this.gameBoard.checkPlayerInWaterArea();
  }

  public getStage(): Container {
    return this.stage;
  }
}