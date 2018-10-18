import { RawItem, Direction } from "./RawItem";
import { Obstacle } from "./Obstacles/Obstacle";
import { Utils } from "../../../utilities/Utils";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Car } from "./Obstacles/Car";
import { GameBoard } from "../GameBoard";


const carAddresses = [
    "./images/obstacles/car_red_right.png",
    "./images/obstacles/car_red_left.png",
    "./images/obstacles/car_white_right.png",
    "./images/obstacles/car_white_left.png"
];
export class Road extends RawItem {

    private readonly CAR_FIRST_START_POS_Y = this.posY + 2;
    private readonly CAR_SECOND_START_POS_Y = this.posY + RawItem.RAW_HEIGHT/2 + 2;
    private carFirstSpeedInc:number;
    private carSecondSpeedInc:number;
    private MOVING_DIRECTION:Direction;
    
    obstaclesFactory: ObstacleFactory;
   
    constructor(public posX: number, public posY: number){
        super("./images/lanes/road.png", posX, posY);
        this.obstaclesFactory = new ObstacleFactory();
        this.MOVING_DIRECTION = this.chooseMovingDirection();
        this.carFirstSpeedInc = Utils.randomIntFromInterval(1, 5);
        this.carSecondSpeedInc = Utils.randomIntFromInterval(1, 5);
        let timerId = setInterval(() => this.allObstacles.push(this.createCars()), 1000 | 2000 );
        this.setType("road")
    }
    
   
    createCars():Car{
       let newCar = this.obstaclesFactory.createObstacle("car", this.getPosX(), this.getPosY(), this.getAddress(this.MOVING_DIRECTION)) as Car
        newCar.DIRECTION = this.MOVING_DIRECTION;
        if(newCar.posY == this.CAR_FIRST_START_POS_Y)
            newCar.speedInc = this.carFirstSpeedInc;
        else
            newCar.speedInc = this.carSecondSpeedInc;
    
        return newCar;
    }

    getPosX(): number{
        let x;
        if(this.MOVING_DIRECTION == Direction.Left)
            x = Utils.randomIntFromInterval(GameBoard.BOARD_WIDTH-Obstacle.OBSTACLE_WIDTH, GameBoard.BOARD_WIDTH*2 );
        else if(this.MOVING_DIRECTION == Direction.Right)
            x = Utils.randomIntFromInterval(-GameBoard.BOARD_WIDTH, 0);
        return x;
    }

    getPosY(): number{
        return Utils.getRandomBool()?this.CAR_FIRST_START_POS_Y:this.CAR_SECOND_START_POS_Y;
    }

    getAddress(direction: Direction){
        if(direction == Direction.Right){
            return Utils.getRandomBool()?carAddresses[0]:carAddresses[2];
        }
        
        if(direction == Direction.Left){ 
          return Utils.getRandomBool()?carAddresses[1]:carAddresses[3];
        }
    }

    chooseMovingDirection(){
        return Utils.getRandomBool()?Direction.Left:Direction.Right;
    }
    
}

