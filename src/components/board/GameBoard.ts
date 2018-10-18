import 'pixi.js';

import Texture = PIXI.Texture;
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import { RenderableElement } from "../../utilities/RenderableElement";
import { RawItem, Direction } from "./GameBoardRaws/RawItem";
import { BoardRawFactory } from "../../utilities/BoardRawFactory";
import { UpdateableElement } from "../../utilities/UpdateableElement";
import { Utils } from '../../utilities/Utils';
import { Player } from '../../utilities/Player';
import { Obstacle } from './GameBoardRaws/Obstacles/Obstacle';
import { Log } from './GameBoardRaws/Obstacles/Log';
import { StartBoard } from "./GameBoardRaws/Obstacles/StartBoard";
import { FinishBoard } from "./GameBoardRaws/Obstacles/FinishBoard";
import { Water } from './GameBoardRaws/Water';
import { Rectangle, Sprite } from 'pixi.js';
import { Game } from '../../Game';


export class GameBoard implements RenderableElement, UpdateableElement{

    public static readonly BOARD_WIDTH = 600;
    public static readonly BOARD_HEIGHT = 400;
    
    private raw_types: string[] = ["road", "water", "grass"];
    private raw_type_index = -1;
    private rawListInitial: string[] = ["road", "water", "grass", "road", "water", "grass", "road", "water", "grass", "road"]
    private rawPosYlist: number[] = [0, 39, 79, 119, 159, 199, 239, 279, 319, 359];
     
    public allRaws: RawItem[] = [];
    
    private player: Player;
    private startBoard: StartBoard;
    private finishBoard: FinishBoard;

    private isPlayerOnLog = false;

    private isWin = false;

    constructor(){
        this.buildBoardRawsSprites();
        this.player = new Player(this);
        this.startBoard = new StartBoard();
        this.finishBoard = new FinishBoard();
    }
    private buildBoardRawsSprites() {
        const boardrawFactory = new BoardRawFactory();
        this.rawPosYlist.forEach((posY, i) => {this.allRaws.push(boardrawFactory.createBoardRaw(this.rawListInitial[i],0,posY))})
       
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
    
        this.allRaws[index] = rawFactory.createBoardRaw(this.raw_types[this.raw_type_index], 0, element.getPosition()[1]);
        this.allRaws[index].getStage().on('mousedown', () => { this.replaceRaw( this.allRaws[index], index, rawFactory)});
    }

    public startNewGame(): void {
        
       
    }

    checkCollision(){
        let isCollide:boolean;
        this.allRaws.map(element => element.allObstacles)
      .forEach(obstacles => obstacles.forEach((obstacle:any)=>{
          if(obstacle.checkCollisionWithPlayer(this.player))isCollide = true;
          
          if (isCollide && 
            !this.startBoard.checkPlayerIntersection(this.player)&&
            !this.finishBoard.checkPlayerIntersection(this.player)) { 
            this.onCollision(obstacle);
            isCollide = false;
        // this.isDied = true;
      }
        })) 
    }
    
    checkPlayerInWaterArea(){
        this.isWin = this.finishBoard.checkPlayerIntersection(this.player);
        this.allRaws.map(element => {
            if(element.getType() == "water"){
                element = (element as Water);
                if(element.checkPlayerInWater(this.player)){
               
                this.checkCollision()
                if(!this.isPlayerOnLog &&
                    !this.startBoard.checkPlayerIntersection(this.player)&&
                    !this.isWin)this.player.updateTextureDie();
                   
            }else
                 this.isPlayerOnLog=false;
               
            } 
            
            })
        }
    
    
    onCollision(obstacle:Obstacle): any {
        if(obstacle.obstacleType == "tree"){ console.log("COLISION TREE DETECTED!!!")
        this.player.sprite.x =  this.player.sprite.x+1;
        this.player.sprite.y =  this.player.sprite.y+1;
    }
       if(obstacle.obstacleType == "log"){ console.log("COLISION LAG DETECTED!!!")
        this.isPlayerOnLog = true;
            obstacle =  (obstacle as Log)
            
            if(obstacle.DIRECTION == Direction.Left && this.player.sprite.x > 0)
                this.player.sprite.x -= (Game.GAME_SPEED_X / 60 + obstacle.speedInc/2) ;
            else if(obstacle.DIRECTION == Direction.Left)
                this.player.updateTextureDie();
    
            
            if(obstacle.DIRECTION == Direction.Right && this.player.sprite.x < GameBoard.BOARD_WIDTH - Obstacle.OBSTACLE_WIDTH)
                    this.player.sprite.x += (Game.GAME_SPEED_X / 60 + obstacle.speedInc/2) ;
            else if(obstacle.DIRECTION == Direction.Right)
                this.player.updateTextureDie();
            

            }else this.isPlayerOnLog = false;

       if(obstacle.obstacleType == "car"){ console.log("COLISION CAR DETECTED!!!")
            this.player.updateTextureDie();
    }
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
       
        stage.addChild(this.startBoard.getStage());
        stage.addChild(this.finishBoard.getStage());
        stage.addChild(this.player.getStage());
        stage.interactive = true;
        this.checkCollision();
        return stage;
    }
}