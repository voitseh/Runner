import { Player } from "../../../../utilities/Player";
import { Utils } from "../../../../utilities/Utils";
import { Obstacle } from "./Obstacle";
import { Container, Sprite } from "pixi.js";
import { Setting } from "../../../../Settings";

export class StartBoard {

    protected stage: Container;
    protected sprite: Sprite;

    constructor(posX: number = 250, posY: number = 375) {
        let texture = PIXI.loader.resources["./images/start_end.png"].texture;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = Setting.STARTBOARD_WADTH;
        sprite.height = Setting.STARTBOARD_HEIGHT;
        sprite.position.x = posX;
        sprite.position.y = posY;
        this.sprite = sprite;
        let stage = new PIXI.Container();
        stage.addChild(sprite);
        this.stage = stage;
    }

    public getStage(): Container {
        return this.stage;
    }

    public checkPlayerIntersection(player: Player): any {
        return Utils.isIntersecting(player.sprite, this.sprite);
    }
}
