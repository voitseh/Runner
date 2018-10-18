import {Road} from '../components/board/GameBoardRaws/Road';
import {Water} from '../components/board/GameBoardRaws/Water';
import {Grass} from '../components/board/GameBoardRaws/Grass';
import {RawItem} from '../components/board/GameBoardRaws/RawItem';

export class BoardRawFactory {

    public createBoardRaw(rawType: string, posX: number, posY: number): RawItem {
      if (rawType == "road") {
        const road = new Road(posX, posY);
        return road;
      } else if (rawType == "water") {
        const water = new Water(posX, posY);
        return water;
      } 
      else if (rawType == "grass") {
        const grass = new Grass(posX, posY);
        return grass;
      }else {
        throw new Error('There is no such raw type.');
      }
    }
  }