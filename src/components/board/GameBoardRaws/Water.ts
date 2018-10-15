import { RawItem } from "./RawItem";
import { Obstacle } from "./Obstacles/Obstacle";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Log } from "./Obstacles/Log";
import { Utils } from "../../../utilities/Utils";
import { Setting } from "../../../Settings";

export class Water extends RawItem{

    private LOG_FIRST_START_POS_Y = this.posY + 2;
    private LOG_SECOND_START_POS_Y = this.posY + RawItem.RAW_HEIGHT/2 + 2;
    private MOVING_DIRECTION:Direction;
    private carFirstSpeedInc:number;
    private carSecondSpeedInc:number;
    
    obstaclesFactory: ObstacleFactory;

    constructor(public posX: number, public posY: number){
        super("./images/lanes/water.png", posX, posY);
        this.obstaclesFactory = new ObstacleFactory();
        this.MOVING_DIRECTION = this.chooseMovingDirection();
        this.carFirstSpeedInc = Utils.randomIntFromInterval(1, 5);
        this.carSecondSpeedInc = Utils.randomIntFromInterval(1, 5);
        let timerId = setInterval(() => this.allObstacles.push(this.createLogs()), 1000 | 2000 | 3000);
        this.setType("water")
    }

    

    createLogs():Log{
        var newLog:Log = null; 
        let logY = this.getPosY();
     
        if(logY == this.LOG_FIRST_START_POS_Y){ console.log("rrr")
         newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), logY, "./images/log.png") as Log
             newLog.speedInc = this.carFirstSpeedInc;
             newLog.DIRECTION = this.MOVING_DIRECTION;
         }
        else{console.log("hhh")
           newLog = this.obstaclesFactory.createObstacle("log", this.getPosX(), logY, "./images/log.png") as Log
             newLog.speedInc = this.carSecondSpeedInc;
             newLog.DIRECTION = this.MOVING_DIRECTION;
        }
         return newLog;
     }


    getPosX(): number{
        let x;
        if(this.MOVING_DIRECTION == Direction.Left){
            x = Setting.CANVAS_WIDTH-40;
        }else {
            x = 0;
        }
        return x
    }

    getPosY(): number{
        return Utils.getRandomBool()?this.LOG_FIRST_START_POS_Y:this.LOG_SECOND_START_POS_Y;
    }

  
    chooseMovingDirection(){
        return Utils.getRandomBool()?Direction.Left:Direction.Right;
    }
}
export enum Direction {
    Left,
    Right
}
