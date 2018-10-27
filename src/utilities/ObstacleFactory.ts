import { Tree } from '../components/board/GameBoardRaws/Obstacles/Tree';
import { Car } from '../components/board/GameBoardRaws/Obstacles/Car';
import { Log } from '../components/board/GameBoardRaws/Obstacles/Log';
import {Obstacle} from '../components/board/GameBoardRaws/Obstacles/Obstacle';

export class ObstacleFactory {

  public createObstacle(obstacleType: string, posX: number, posY: number, obstacleAddress: string = null): Tree | Car | Log {
    if (obstacleType == "tree") {
      return new Tree(posX, posY);
      } else if (obstacleType == "car") {
      return new Car(obstacleAddress, posX, posY);
    } else if (obstacleType == "log") {
      return new Log(obstacleAddress, posX, posY);
      
    } else {
      throw new Error('There is no such obstacle type.');
    }
  } 
}

// webstorm
class Single{
  private static _instance: Single;
  static getInstance(){
    if(Single._instance == undefined)
      Single._instance = new Single(new qwe());
    
   
     return Single._instance 
  }
  constructor(a:qwe){}
}

class qwe{}
let ttt = new Single(new qwe())