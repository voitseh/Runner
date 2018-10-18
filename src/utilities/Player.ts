import { Setting } from "../Settings";
import { Obstacle } from "../components/board/GameBoardRaws/Obstacles/Obstacle";
import { Container } from "pixi.js";
import { RawItem } from "../components/board/GameBoardRaws/RawItem";
import { GameBoard } from "../components/board/GameBoard";

const FORWARD_FRAME_LIST = [
    "./images/player/forward1.png",
    "./images/player/forward2.png",
    "./images/player/forward3.png",
  ];

  const BACK_FRAME_LIST = [
    "./images/player/back1.png",
    "./images/player/back2.png",
    "./images/player/back3.png",
  ];

  const LEFT_FRAME_LIST = [
    "./images/player/left1.png",
    "./images/player/left2.png",
    "./images/player/left3.png",
  ];

  const RIGHT_FRAME_LIST = [
    "./images/player/right1.png",
    "./images/player/right2.png",
    "./images/player/right3.png",
  ];

  const DIE_FRAME_LIST = [
    "./images/player/die1.png",
    "./images/player/die2.png",
    "./images/player/die3.png",
    "./images/player/die4.png",
  ];


export class Player{
    private PLAYER_WIDTH = 20;
    private PLAYER_HEIGHT = 30;
    private speed: number = 7;
    public sprite = new PIXI.Sprite();
    private stage:Container;
  
    private textureCounterForward: number = 0;
    private updateTextureForward = () => { 
      this.sprite.texture = PIXI.loader.resources[FORWARD_FRAME_LIST[this.textureCounterForward++]].texture;
      if (this.textureCounterForward === FORWARD_FRAME_LIST.length) this.textureCounterForward = 0;
    }
  
    private textureCounterBack: number = 0;
    private updateTextureBack = () => {
      this.sprite.texture = PIXI.loader.resources[BACK_FRAME_LIST[this.textureCounterBack++]].texture;
      if (this.textureCounterBack === BACK_FRAME_LIST.length) this.textureCounterBack = 0;
    }

    private textureCounterLeft: number = 0;
    private updateTextureLeft = () => { 
      this.sprite.texture = PIXI.loader.resources[LEFT_FRAME_LIST[this.textureCounterLeft++]].texture;
      if (this.textureCounterLeft === LEFT_FRAME_LIST.length) this.textureCounterLeft = 0;
    }

    private textureCounterRight: number = 0;
    private updateTextureRight = () => {
      this.sprite.texture = PIXI.loader.resources[RIGHT_FRAME_LIST[this.textureCounterRight++]].texture;
      if (this.textureCounterRight === RIGHT_FRAME_LIST.length) this.textureCounterRight = 0;
    }

    private textureCounterDie: number = 0;
    public updateTextureDie = () => {
      this.sprite.texture = PIXI.loader.resources[DIE_FRAME_LIST[this.textureCounterDie++]].texture;
      if (this.textureCounterDie === DIE_FRAME_LIST.length) this.textureCounterDie = 0;
    }

    updateSpriteForward = () => {
      if (!(this.sprite.y < -this.sprite.height / 2)) this.sprite.y -= this.speed;
    }

    updateSpriteBack = () => {
      if (!(this.sprite.y > Setting.CANVAS_HEIGHT - this.sprite.height))  this.sprite.y += this.speed;
    }

    updateSpriteLeft = () => { 
      if (!(this.sprite.x < this.sprite.width/2 ))  this.sprite.x -= this.speed;
    }

    updateSpriteRight = () => {
      if (!(this.sprite.x > Setting.CANVAS_WIDTH - this.sprite.width - 5))  this.sprite.x += this.speed;
    }
  
    reset() {
      this.sprite.x = Setting.CANVAS_WIDTH / 2;
      this.sprite.y = Setting.CANVAS_HEIGHT - this.PLAYER_HEIGHT - 2;
      // this.isDied = false;
    }
    
    constructor(private gameBoard: GameBoard) {
      let texture = PIXI.loader.resources["./images/player/forward1.png"].texture;
      this.sprite = new PIXI.Sprite(texture);
      this.sprite.width = this.PLAYER_WIDTH;
      this.sprite.height = this.PLAYER_HEIGHT;      
      let stage = new PIXI.Container();
      stage.addChild(this.sprite);
      stage.interactive = true;
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
  onKeyClick(updateTexture:void, updateSprite:void){
    updateTexture;
    updateSprite;
    this.gameBoard.checkPlayerInWaterArea();
  }


    public getStage():Container{
      return this.stage;
    }
}