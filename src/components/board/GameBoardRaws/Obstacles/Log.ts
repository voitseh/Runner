import { Obstacle } from "./Obstacle"
import { Player } from "../../../../utilities/Player";
import { Direction } from "../RawItem";
import { Utils } from "../../../../utilities/Utils";
import { Sprite } from "pixi.js";
import { GameBoard } from "../../GameBoard";
import { Game } from "../../../../Game";

export class Log extends Obstacle {

    obstacleType = "log"

    constructor(imgPath: string, public posX: number, public posY: number){
        super(imgPath , posX, posY);
        this.sprite.height = 17;
        this.sprite.width = 80;
    }

    update() {
        if(this.DIRECTION == Direction.Left){ 
           this.sprite.x -= Game.GAME_SPEED_X / 60;
           this.addSpeedLeft(this.speedInc)
             if (this.sprite.x < 0)
                this.stage.parent.removeChild(this.stage);
        }else
        {
            this.sprite.x += Game.GAME_SPEED_X / 60;
              this.addSpeedRight(this.speedInc)
             if (this.sprite.x > GameBoard.BOARD_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }
    }

    addSpeedRight(speedInc: number) {
        this.sprite.x += speedInc/2;
    }
    addSpeedLeft(speedInc: number) {
        this.sprite.x -= speedInc/2;
      }

    //   checkIntersectPlayerWaterLog(rectangle:Sprite):any {
    //     return Utils.isIntersecting(rectangle, this.sprite)}

      checkCollisionWithPlayer(player:Player):any {
        return Utils.isIntersecting(player.sprite, this.sprite)
    
    }
        
    }