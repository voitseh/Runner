import { Tree } from '../components/board/GameBoardRaws/Obstacles/Tree';
import { Car } from '../components/board/GameBoardRaws/Obstacles/Car';
import { Log } from '../components/board/GameBoardRaws/Obstacles/Log';
import { Obstacle } from '../components/board/GameBoardRaws/Obstacles/Obstacle';

export class ObstacleFactory {

  public createObstacle(obstacleType: string, posX: number, posY: number, obstacleAddress: string = null): Obstacle {
    if (obstacleType == "tree") {
      const tree = new Tree(posX, posY);
      return tree;
    } else if (obstacleType == "car") {
      const car = new Car(obstacleAddress, posX, posY);
      return car;
    } else if (obstacleType == "log") {
      const log = new Log(obstacleAddress, posX, posY);
      return log;
    } else {
      throw new Error('There is no such obstacle type.');
    }
  }
}