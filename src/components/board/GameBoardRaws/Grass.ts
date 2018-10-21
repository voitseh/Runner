import { RawItem } from "./RawItem";
import { Utils } from "../../../utilities/Utils";
import { Obstacle } from "./Obstacles/Obstacle";
import { ObstacleFactory } from "../../../utilities/ObstacleFactory";
import { Setting } from "../../../Settings";

export class Grass extends RawItem{
   
    private treeMinPosY:any;
    private treeMaxPosY:any;

    constructor(public posX: number, public posY: number){
        super("grass.png", posX, posY);
        this.setType("grass");
    }

    public createTrees() { 
        this.treeMinPosY = this.getPosition()[1] +  Setting.OBSTACLE_HEIGHT;
        this.treeMaxPosY =  this.getPosition()[1] + Setting.RAW_HEIGHT - Setting.OBSTACLE_HEIGHT;
        const obstaclesFactory = new ObstacleFactory();
        let treesCount: number = this.getRandomTreeCount(Setting.TREE_MIN_COUNT, Setting.TREE_MAX_COUNT);
        
        for (let index = 1; index <= treesCount; index++) {
            let treePosX =  this.getTreePosX((index*100 - 80), (index*100-20));
            let treePosY =  this.getTreePosY(this.treeMinPosY, this.treeMaxPosY);
            this.allObstacles.push(obstaclesFactory.createObstacle("tree", treePosX, treePosY));
        }
    }

    private getRandomTreeCount(min: number, max:number): number{
      return  Utils.randomIntFromInterval(min, max);
    }

    private getTreePosX(minX: number, maxX:number): number{
        return  Utils.randomIntFromInterval(minX, maxX);
    }

    private getTreePosY(minY: number, maxY:number): number{
        return  Utils.randomIntFromInterval(minY, maxY);
    }
}