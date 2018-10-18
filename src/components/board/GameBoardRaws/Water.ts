import { RawItem, Direction } from "./RawItem";
import { Obstacle } from "./Obstacles/Obstacle";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Log } from "./Obstacles/Log";
import { Utils } from "../../../utilities/Utils";
import { Player } from "../../../utilities/Player";
import { GameBoard } from "../GameBoard";

export class Water extends RawItem{

    private LOG_FIRST_START_POS_Y = this.posY + 1;
    private LOG_SECOND_START_POS_Y = this.posY + RawItem.RAW_HEIGHT/2 + 1;
    private MOVING_DIRECTION:Direction;
    private carFirstSpeedInc:number;
    private carSecondSpeedInc:number;
    
    obstaclesFactory: ObstacleFactory;


    constructor(public posX: number, public posY: number){
        super("./images/lanes/water.png", posX, posY);
        this.obstaclesFactory = new ObstacleFactory();
        this.carFirstSpeedInc = Utils.randomIntFromInterval(1, 5);
        this.carSecondSpeedInc = Utils.randomIntFromInterval(1, 5);
        let timerId = setInterval(() => this.allObstacles.push(this.createLogs()), 1000 | 2000 );
        this.setType("water")
    }

    

    createLogs():Log{
        this.MOVING_DIRECTION = this.chooseMovingDirection();
        var newLog:Log = null; 
        let logY = this.getPosY();
     
        if(logY == this.LOG_FIRST_START_POS_Y){ 
         newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), logY, "./images/log.png") as Log
             newLog.speedInc = this.carFirstSpeedInc;
             newLog.DIRECTION = this.MOVING_DIRECTION;
         }
        else{
           newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), logY, "./images/log.png") as Log
             newLog.speedInc = this.carSecondSpeedInc;
             newLog.DIRECTION = this.MOVING_DIRECTION;
        }
         return newLog;
     }


    getPosX(): number{
        let x;
        if(this.MOVING_DIRECTION == Direction.Left){
            x = GameBoard.BOARD_WIDTH + 100;
        }else {
            x = -100;
        }
        return x
    }

    getPosY(): number{
        if(this.MOVING_DIRECTION == Direction.Left)
        return this.LOG_FIRST_START_POS_Y;
        else
        return this.LOG_SECOND_START_POS_Y;
    }

  
    chooseMovingDirection(){
        return Utils.getRandomBool()?Direction.Left:Direction.Right;
    }

    checkPlayerInWater(player:Player):any {
        return  Utils.isIntersecting(player.sprite, this.sprite);
    }
}
