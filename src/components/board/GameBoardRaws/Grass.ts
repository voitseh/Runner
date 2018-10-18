import { RawItem } from "./RawItem";
import { Utils } from "../../../utilities/Utils";
import { Obstacle } from "./Obstacles/Obstacle";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";

export class Grass extends RawItem{
   
    private TREE_MIN_COUNT = 3;
    private TREE_MAX_COUNT = 6;
    private TREE_MIN_POS_Y:any;
    private TREE_MAX_POS_Y:any;

    constructor(public posX: number, public posY: number){
        super("./images/lanes/grass.png", posX, posY);
       
        this.TREE_MIN_POS_Y = this.getPosition()[1] +  Obstacle.OBSTACLE_HEIGHT;
        this.TREE_MAX_POS_Y =  this.getPosition()[1] + RawItem.RAW_HEIGHT - Obstacle.OBSTACLE_HEIGHT;

        this.buildGrassSprites();

        this.setType("grass");
    }

    private buildGrassSprites() {
       this.setObstacles()
    }

    setObstacles() {
        const obstaclesFactory = new ObstacleFactory();
        let treesCount: number = this.getRandomTreeCount(this.TREE_MIN_COUNT, this.TREE_MAX_COUNT);
        
        for (let index = 1; index <= treesCount; index++) {
            let treePosX =  this.getTreePosX((index*100 - 80), (index*100-20));
            let treePosY =  this.getTreePosY(this.TREE_MIN_POS_Y, this.TREE_MAX_POS_Y);
            this.allObstacles.push(obstaclesFactory.createObstacle("tree", treePosX, treePosY));
            
        }
    }

    getRandomTreeCount(min: number, max:number): number{
      return  Utils.randomIntFromInterval(min, max)
    }

    getTreePosX(minX: number, maxX:number): number{
        return  Utils.randomIntFromInterval(minX, maxX)
    }

    getTreePosY(minY: number, maxY:number): number{
        return  Utils.randomIntFromInterval(minY, maxY)
      }
}