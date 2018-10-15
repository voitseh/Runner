import 'pixi.js';

import Texture = PIXI.Texture;
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import {RenderableElement} from "../../utilities/RenderableElement";
import {RawItem} from "./GameBoardRaws/RawItem";
import {BoardRawFactory} from "../../utilities/BoardRawFactory";
import {UpdateableElement} from "../../utilities/UpdateableElement";
import { Utils } from '../../utilities/Utils';


export class GameBoard implements RenderableElement, UpdateableElement{

    private RAW_TYPES: string[] = ["road", "water", "grass"];
    private raw_type_index = -1;
    private RAW_LIST_INITIAL: string[] = ["road", "water", "grass", "road", "water", "grass", "road", "water", "grass", "road", "water"]
    private RAW_POS_Y_LIST: number[] = [0, 39, 79, 119, 159, 199, 239, 279, 319, 359, 399];
     
    private allRaws: RawItem[] = [];
    
    // private player: Player;

    constructor(){
        this.buildBoardRawsSprites();
    }
    private buildBoardRawsSprites() {
        const boardrawFactory = new BoardRawFactory();
        this.RAW_POS_Y_LIST.forEach((posY, i) => {this.allRaws.push(boardrawFactory.createBoardRaw(this.RAW_LIST_INITIAL[i],0,posY))})
       
     this.changeRawTypeOnClick(boardrawFactory);
    }

    changeRawTypeOnClick(rawFactory:BoardRawFactory){
        this.raw_type_index++;
        let clickedRawCoordY:number = null;
        let curRawType: [number, RawItem];
        this.allRaws.forEach((element, i) => {
        element.getStage().on('mousedown', () => { this.replaceRaw(element, i, rawFactory)});
        });
        this.raw_type_index = -1;
    }
    
    replaceRaw(element: RawItem, index: number, rawFactory:BoardRawFactory ){
        if(this.raw_type_index < 2)
            this.raw_type_index++;
        else
        this.raw_type_index= 0;
    
        this.allRaws[index] = rawFactory.createBoardRaw(this.RAW_TYPES[this.raw_type_index], 0, element.getPosition()[1]);
        this.allRaws[index].getStage().on('mousedown', () => { this.replaceRaw( this.allRaws[index], index, rawFactory)});
    }

    public startNewGame(): void {
        
       
    }

    public update(): void {
        this.allRaws.map(element => element.allObstacles)
        .forEach(obstacles => obstacles.forEach((obstacle:any)=>{if(obstacle.obstacleType == "car" || obstacle.obstacleType ==  "log")obstacle.update()}))
    }

    public getStage(): PIXI.Container {
        let stage = new PIXI.Container();
        this.allRaws.forEach(
            (rawItem, i) => stage.addChild(rawItem.getStage())
        )
      this.allRaws.map(element => element.allObstacles)
           .forEach(obstacles => obstacles.forEach((obstacle:any)=>stage.addChild(obstacle.getStage())))
        stage.interactive = true;
        return stage;
    }
}