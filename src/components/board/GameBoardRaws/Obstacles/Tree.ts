import {Obstacle} from "./Obstacle"
import { Player } from "../../../../utilities/Player";

export class Tree extends Obstacle {

   obstacleType = "tree"

    constructor(public posX: number, public posY: number){
        super("./images/obstacles/tree.png", posX, posY)
    }

    onCollisionWithPlayer(player: Player) {
        throw new Error("Method not implemented.");
    }
}
