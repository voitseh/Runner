import { RawItem, Direction } from "./RawItem";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Log } from "./Obstacles/Log";
import { Utils } from "../../../utilities/Utils";
import { Player } from "../../../utilities/Player";
import { GameBoard } from "../GameBoard";
import { Setting } from "../../../Settings";

export class Water extends RawItem {

    private logUpperStartPosY = this.posY + 1;
    private logLowerStartPosY = this.posY + Setting.RAW_HEIGHT / 2 + 1;
    private movingDirection: Direction;
    private carFirstSpeedInc: number;
    private carSecondSpeedInc: number;
    private obstaclesFactory: ObstacleFactory;

    constructor(public posX: number, public posY: number) {
        super("./images/lanes/water.png", posX, posY);
        this.obstaclesFactory = new ObstacleFactory();
        this.carFirstSpeedInc = Utils.randomIntFromInterval(1, 3);
        this.carSecondSpeedInc = Utils.randomIntFromInterval(1, 3);
        // let timerId = setInterval(() => this.allObstacles.push(this.createLogs()), 1000 | 2000 );
        this.setType("water")
    }

    public startLogsMoving() {
        let timerId = setInterval(() => this.allObstacles.push(this.createLogs()), 1000 | 2000);
    }

    public createLogs(): Log {
        this.movingDirection = this.chooseMovingDirection();
        var newLog: Log = null;
        let logY = this.getPosY();

        if (logY == this.logUpperStartPosY) {
            newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), logY, "./images/log.png") as Log
            newLog.speedInc = this.carFirstSpeedInc;
            newLog.DIRECTION = this.movingDirection;
        }
        else {
            newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), logY, "./images/log.png") as Log
            newLog.speedInc = this.carSecondSpeedInc;
            newLog.DIRECTION = this.movingDirection;
        }
        return newLog;
    }


    public getPosX(): number {
        let x;
        if (this.movingDirection == Direction.Left) {
            x = Setting.BOARD_WIDTH + 100;
        } else {
            x = -100;
        }
        return x
    }

    public getPosY(): number {
        if (this.movingDirection == Direction.Left)
            return this.logUpperStartPosY;
        else
            return this.logLowerStartPosY;
    }

    public chooseMovingDirection() {
        return Utils.getRandomBool() ? Direction.Left : Direction.Right;
    }

    public checkPlayerInWater(player: Player): any {
        return Utils.isIntersecting(player.sprite, this.sprite);
    }
}
