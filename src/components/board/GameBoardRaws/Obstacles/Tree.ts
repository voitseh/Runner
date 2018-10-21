import { Obstacle } from "./Obstacle"
import { Player } from "../../../../utilities/Player";
import { Utils } from "../../../../utilities/Utils";

export class Tree extends Obstacle {

    public obstacleType = "tree"

    constructor(public posX: number, public posY: number) {
        super("tree.png", posX, posY)
    }

    public checkCollisionWithPlayer(player: Player): any {
        return Utils.isIntersecting(player.sprite, this.sprite)
    }
}
