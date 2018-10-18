import {Obstacle} from "./Obstacle"
import { Player } from "../../../../utilities/Player";
import { Utils } from "../../../../utilities/Utils";

export class Tree extends Obstacle {

   obstacleType = "tree"
  

    constructor(public posX: number, public posY: number){
        super("./images/obstacles/tree.png", posX, posY)
    }

    checkCollisionWithPlayer(player:Player):any {
        return  Utils.isIntersecting(player.sprite, this.sprite)
    
    
    }
}
