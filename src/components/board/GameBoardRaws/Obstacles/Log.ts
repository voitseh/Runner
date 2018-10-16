import { Obstacle } from "./Obstacle"
import { Player } from "../../../../utilities/Player";
import { Direction } from "../RawItem";
import { Setting } from "../../../../Settings";

export class Log extends Obstacle {

    DIRECTION: Direction;

    speedInc: number;

    obstacleType = "log"

    constructor(imgPath: string, public posX: number, public posY: number){
        super(imgPath , posX, posY)
    }

    update() {
        if(this.DIRECTION == Direction.Left){
           this.sprite.x -= Setting.GAME_SPEED_X / 60;
             this.addSpeedLeft(this.speedInc)
             if (this.sprite.x < -Obstacle.OBSTACLE_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }{
            this.sprite.x += Setting.GAME_SPEED_X / 60;
              this.addSpeedRight(this.speedInc)
             if (this.sprite.x > Setting.CANVAS_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }
    }

    addSpeedRight(speedInc: number) {
        this.sprite.x += speedInc;
    }
    addSpeedLeft(speedInc: number) {
        this.sprite.x -= speedInc;
      }

      checkCollisionWithPlayer(player:Player):boolean {
        return false;
    }
}