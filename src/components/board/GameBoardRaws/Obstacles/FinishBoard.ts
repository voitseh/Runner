import { Player } from "../../../../utilities/Player";
import { Utils } from "../../../../utilities/Utils";
import { StartBoard } from "../Obstacles/StartBoard";
import { Container, Sprite } from "pixi.js";

export class FinishBoard extends StartBoard {

    protected POS_Y = 0;

    constructor() {
        super(250, 0);
        this.POS_Y = 0;
    }
}
