import { Obstacle } from "./Obstacle";
import { Player } from "../../../../utilities/Player";
import { Direction } from "../RawItem";
import { Utils } from "../../../../utilities/Utils";
import { Game } from "../../../../Game";
import { GameBoard } from "../../GameBoard";
import { Setting } from "../../../../Settings";

export class Car extends Obstacle {

    public obstacleType = "car";

    constructor(imgPath: string, public posX: number, public posY: number) {
        super(imgPath, posX, posY);
    }

    public update() {
        if (this.DIRECTION == Direction.Left) {
            this.sprite.x -= Setting.GAME_SPEED_X / 60;
            this.addSpeedLeft(this.speedInc);
            if (this.sprite.x < -Setting.OBSTACLE_WIDTH)
                this.stage.parent.removeChild(this.stage);
        } else if (this.DIRECTION == Direction.Right) {
            this.sprite.x += Setting.GAME_SPEED_X / 60;
            this.addSpeedRight(this.speedInc);
            if (this.sprite.x > Setting.BOARD_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }
    }
    public addSpeedRight(speedInc: number) {
        this.sprite.x += speedInc;
    }
    public addSpeedLeft(speedInc: number) {
        this.sprite.x -= speedInc;
    }

    public checkCollisionWithPlayer(player: Player): any {
        return Utils.isIntersecting(player.sprite, this.sprite);
    }
}
