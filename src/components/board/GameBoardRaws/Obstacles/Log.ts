import { Obstacle } from "./Obstacle"
import { Player } from "../../../../utilities/Player";
import { Utils } from "../../../../utilities/Utils";
import { GameBoard } from "../../GameBoard";
import { Game } from "../../../../Game";
import { Setting, Direction } from "../../../../Settings";

export class Log extends Obstacle {

    public obstacleType = "log"

    constructor(imgPath: string, public posX: number, public posY: number) {
        super(imgPath, posX, posY);
        this.sprite.height = 20;
        this.sprite.width = 80;
    }

    public update() {
        if (this.DIRECTION == Direction.Left) {
            this.updateLeftDirectedLog();
        } else {
           this.updateRightDirectedLog();
        }
    }

    private updateLeftDirectedLog(){
        this.sprite.x -= Setting.GAME_SPEED_X / 80;
        this.addSpeedLeft(this.speedInc)
        if (this.sprite.x < 0)
            this.stage.parent.removeChild(this.stage);
    }

    private updateRightDirectedLog(){
        this.sprite.x += Setting.GAME_SPEED_X / 80;
        this.addSpeedRight(this.speedInc)
        if (this.sprite.x > Setting.BOARD_WIDTH)
            this.stage.parent.removeChild(this.stage);
    }

    public addSpeedRight(speedInc: number) {
        this.sprite.x += speedInc / 2;
    }
    public addSpeedLeft(speedInc: number) {
        this.sprite.x -= speedInc / 2;
    }

    public checkCollisionWithPlayer(player: Player): any {
        return Utils.isIntersecting(player.sprite, this.sprite)
    }

}