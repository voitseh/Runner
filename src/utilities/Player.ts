import { Container } from "pixi.js";
import { GameBoard } from "../components/board/GameBoard";
import { Setting} from "../Settings";

export class Player {

  private speed: number = 5;
  private stage: Container;
  private textureCounter: number = 0;
  public sprite = new PIXI.Sprite();
  public livesCount = 5;

  constructor(private gameBoard: GameBoard) {
    this.sprite =  PIXI.Sprite.fromFrame(Setting.FORWARD_FRAME_LIST[0]);
    this.sprite.x = Setting.BOARD_WIDTH / 2;
    this.sprite.y = Setting.BOARD_HEIGHT - Setting.PLAYER_HEIGHT - 2;
    this.sprite.width = Setting.PLAYER_WIDTH;
    this.sprite.height = Setting.PLAYER_HEIGHT;
    let stage = new PIXI.Container();
    stage.addChild(this.sprite);
    this.stage = stage;

    this.reset();
    this.listenForClick();
  }

  private listenForClick(){
    document.addEventListener('keydown', e => {

      switch (e.keyCode) {
        case 65: case 37:  //left
          this.onKeyClick(this.updateTextureLeft.bind(this), this.updateSpriteLeft.bind(this));
          break;
        case 38: case 87:  //forward
          this.onKeyClick(this.updateTextureForward.bind(this), this.updateSpriteForward.bind(this));
          break;
        case 39: case 68: //right
          this.onKeyClick(this.updateTextureRight.bind(this), this.updateSpriteRight.bind(this));
          break;
        case 40: case 83: //down
          this.onKeyClick(this.updateTextureBack.bind(this), this.updateSpriteBack.bind(this));
          break;
        default:
          break;
      }
    });
  }

  private onKeyClick(updateTexture: () => void, updateSprite: () => void) {
    updateTexture();
    updateSprite();
    this.gameBoard.checkCollisionAfterStep();
  }

  
  private updateTexture(frameList: string[]){
    this.sprite.texture = PIXI.Sprite.fromFrame(frameList[this.textureCounter++]).texture;
    if (this.textureCounter === frameList.length) this.textureCounter = 0;
  }

  private updateTextureForward = () => this.updateTexture(Setting.FORWARD_FRAME_LIST);


  private updateTextureBack = () => this.updateTexture(Setting.BACK_FRAME_LIST);


  private updateTextureLeft = () => this.updateTexture(Setting.LEFT_FRAME_LIST);


  private updateTextureRight = () => this.updateTexture(Setting.RIGHT_FRAME_LIST);


  public updateTextureDie = () => this.updateTexture(Setting.DIE_FRAME_LIST);

 
  private updateSpriteForward = () => {
    if (!(this.sprite.y < -this.sprite.height / 2)) this.sprite.y -= this.speed;
  };

  private updateSpriteBack = () => {
    if (!(this.sprite.y > Setting.BOARD_HEIGHT - this.sprite.height)) this.sprite.y += this.speed;
  };

  private updateSpriteLeft = () => {
    if (!(this.sprite.x < this.sprite.width / 2)) this.sprite.x -= this.speed;
  };

  private updateSpriteRight = () => {
    if (!(this.sprite.x > Setting.BOARD_WIDTH - this.sprite.width - 5)) this.sprite.x += this.speed;
  };

  public setLivesCount(livesCount: number){
    this.livesCount = livesCount;
  }

  public getLivesCount(){
    return this.livesCount;
  }

  public reset() {  
    this.sprite.x = Setting.BOARD_WIDTH / 2;
    this.sprite.y = Setting.BOARD_HEIGHT - Setting.PLAYER_HEIGHT - 2;
    this.updateTextureForward();
  }

  public getStage(): Container {
    return this.stage;
  }
}