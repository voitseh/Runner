import { Obstacle } from "./Obstacle";
import { Road } from "../Road";
import { Player } from "../../../../utilities/Player";
import { Direction } from "../RawItem";
import { Utils } from "../../../../utilities/Utils";
import { Game } from "../../../../Game";
import { GameBoard } from "../../GameBoard";

export class Car extends Obstacle{

    obstacleType = "car";

    constructor(imgPath: string, public posX: number, public posY: number){
        super(imgPath , posX, posY);
    }

    update() {
        if(this.DIRECTION == Direction.Left){
           this.sprite.x -= Game.GAME_SPEED_X / 60;
             this.addSpeedLeft(this.speedInc);
             if (this.sprite.x < -Obstacle.OBSTACLE_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }else if(this.DIRECTION == Direction.Right){
            this.sprite.x += Game.GAME_SPEED_X / 60;
              this.addSpeedRight(this.speedInc);
             if (this.sprite.x > GameBoard.BOARD_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }
    }
    addSpeedRight(speedInc: number) {
        this.sprite.x += speedInc;
    }
    addSpeedLeft(speedInc: number) {
        this.sprite.x -= speedInc;
      }

      checkCollisionWithPlayer(player:Player):any {
        return Utils.isIntersecting(player.sprite, this.sprite);
      }
}
