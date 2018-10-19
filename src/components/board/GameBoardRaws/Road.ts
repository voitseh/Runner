import { RawItem, Direction } from "./RawItem";
import { Obstacle } from "./Obstacles/Obstacle";
import { Utils } from "../../../utilities/Utils";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Car } from "./Obstacles/Car";
import { GameBoard } from "../GameBoard";
import { Setting } from "../../../Settings";

export class Road extends RawItem {

    private readonly CAR_FIRST_START_POS_Y = this.posY + 2;
    private readonly CAR_SECOND_START_POS_Y = this.posY + Setting.RAW_HEIGHT / 2 + 2;
    private MOVING_DIRECTION: Direction;
    private carFirstSpeedInc: number;
    private carSecondSpeedInc: number;
   
    public obstaclesFactory: ObstacleFactory;

    constructor(public posX: number, public posY: number) {
        super("./images/lanes/road.png", posX, posY);
        this.obstaclesFactory = new ObstacleFactory();
        this.MOVING_DIRECTION = this.chooseMovingDirection();
        this.carFirstSpeedInc = Utils.randomIntFromInterval(1, 5);
        this.carSecondSpeedInc = Utils.randomIntFromInterval(1, 5);
        // let timerId = setInterval(() => this.allObstacles.push(this.createCars()), 1000 | 2000 );
        this.setType("road");
    }

    public startCarsMoving() {
        let timerId = setInterval(() => this.allObstacles.push(this.createCars()), 1000 | 2000);
    }

    public createCars(): Car {
        let newCar = this.obstaclesFactory.createObstacle("car", this.getPosX(), this.getPosY(), this.getAddress(this.MOVING_DIRECTION)) as Car
        newCar.DIRECTION = this.MOVING_DIRECTION;
        if (newCar.posY == this.CAR_FIRST_START_POS_Y)
            newCar.speedInc = this.carFirstSpeedInc;
        else
            newCar.speedInc = this.carSecondSpeedInc;

        return newCar;
    }

    private getPosX(): number {
        let x;
        if (this.MOVING_DIRECTION == Direction.Left)
            x = Utils.randomIntFromInterval(Setting.BOARD_WIDTH - Setting.OBSTACLE_WIDTH, Setting.BOARD_WIDTH * 2);
        else if (this.MOVING_DIRECTION == Direction.Right)
            x = Utils.randomIntFromInterval(-Setting.BOARD_WIDTH, 0);
        return x;
    }

    private getPosY(): number {
        return Utils.getRandomBool() ? this.CAR_FIRST_START_POS_Y : this.CAR_SECOND_START_POS_Y;
    }

    private getAddress(direction: Direction) {
        if (direction == Direction.Right) {
            return Utils.getRandomBool() ? Setting.CAR_ADDRESSES[0] : Setting.CAR_ADDRESSES[2];
        }

        if (direction == Direction.Left) {
            return Utils.getRandomBool() ? Setting.CAR_ADDRESSES[1] : Setting.CAR_ADDRESSES[3];
        }
    }

    private chooseMovingDirection() {
        return Utils.getRandomBool() ? Direction.Left : Direction.Right;
    }

}

