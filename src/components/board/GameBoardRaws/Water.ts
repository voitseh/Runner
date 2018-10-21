import { RawItem } from "./RawItem";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Log } from "./Obstacles/Log";
import { Utils } from "../../../utilities/Utils";
import { Player } from "../../../utilities/Player";
import { GameBoard } from "../GameBoard";
import { Setting, Direction } from "../../../Settings";

export class Water extends RawItem {

    private logUpperStartPosY = this.posY + 1;
    private logLowerStartPosY = this.posY + Setting.RAW_HEIGHT / 2 + 1;
    private movingDirection: Direction;
    private carFirstSpeedInc: number;
    private carSecondSpeedInc: number;
    private obstaclesFactory: ObstacleFactory;
    private newLog: Log = null;

    constructor(public posX: number, public posY: number) {
        super("water.png", posX, posY);
        this.obstaclesFactory = new ObstacleFactory();
        this.carFirstSpeedInc = Utils.randomIntFromInterval(1, 3);
        this.carSecondSpeedInc = Utils.randomIntFromInterval(1, 3);
        this.setType("water")
    }

    public startLogsMoving() {
        let timerId = setInterval(() => this.allObstacles.push(this.createLogs()), 1000 | 2000);
    }

    public createLogs(): Log {
        this.movingDirection = this.chooseMovingDirection();
        let logY = this.getPosY();

        if (logY == this.logUpperStartPosY)
           this.createUpperLogs(logY);
        else 
           this.createLowerLogs(logY);
        return this.newLog;
    }

    private createUpperLogs(posY: number){
        this.newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), posY, "log.png") as Log
        this.newLog.speedInc = this.carFirstSpeedInc;
        this.newLog.DIRECTION = this.movingDirection;
    }

    private createLowerLogs(posY: number){
        this.newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), posY, "log.png") as Log
        this.newLog.speedInc = this.carSecondSpeedInc;
        this.newLog.DIRECTION = this.movingDirection;
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
