import 'pixi.js';

import Container = PIXI.Container;
import { RenderableElement } from "../../utilities/RenderableElement";
import { RawItem } from "./GameBoardRaws/RawItem";
import { BoardRawFactory } from "../../utilities/BoardRawFactory";
import { UpdateableElement } from "../../utilities/UpdateableElement";
import { Player } from '../../utilities/Player';
import { Obstacle } from './GameBoardRaws/Obstacles/Obstacle';
import { Log } from './GameBoardRaws/Obstacles/Log';
import { StartBoard } from "./GameBoardRaws/Obstacles/StartBoard";
import { FinishBoard } from "./GameBoardRaws/Obstacles/FinishBoard";
import { Water } from './GameBoardRaws/Water';
import { Rectangle, } from 'pixi.js';
import { Game } from '../../Game';
import { Road } from './GameBoardRaws/Road';
import { Setting, Direction, GameStatus } from '../../Settings';
import { Grass } from './GameBoardRaws/Grass';

export class GameBoard implements RenderableElement, UpdateableElement {

    private raw_types: string[] = ["road", "water", "grass"];
    private raw_type_index = -1;
    private rawListInitial: string[] = ["road", "water", "grass", "road", "water", "grass", "road", "water", "grass", "road"]
    private rawPosYlist: number[] = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360];
    private gameBoardStage = new Container();
    private rawFactory: BoardRawFactory;
    private startBoard: StartBoard;
    private finishBoard: FinishBoard;
    private isPlayerOnLog = false;
    private readonly onGameOver: (isOnFinish: boolean) => void;
    private readonly onLostLife: () => void;
    public player: Player;
    public allRaws: RawItem[] = [];
    public isCustomRawConfig = false;
    public isOnFinish = false;


    constructor(onGameOver: (isOnFinish: boolean) => void, onLostLife: () => void) {
        this.onGameOver = onGameOver;
        this.onLostLife = onLostLife;
        const boardrawFactory = new BoardRawFactory();
        this.rawFactory = boardrawFactory;
        this.startNewGame();
        this.player = new Player(this);
        this.startBoard = new StartBoard();
        this.finishBoard = new FinishBoard();
    }
    private buildBoardRawsSprites() {
        this.allRaws = [];
        this.rawPosYlist.forEach((posY, i) => { this.allRaws.push(this.rawFactory.createBoardRaw(this.rawListInitial[i], 0, posY)) })
    }

    public changeRawTypeOnClick() {
        this.buildBoardRawsSprites();
        this.raw_type_index++;
        let clickedRawCoordY: number = null;
        let curRawType: [number, RawItem];
        this.allRaws.forEach((element, i) => {
            element.getStage().on('mousedown', () => { this.replaceRaw(element, i, this.rawFactory) });
        });
        this.raw_type_index = -1;
    }

    public replaceRaw(element: RawItem, index: number, rawFactory: BoardRawFactory) {
        if (this.raw_type_index < 2)
            this.raw_type_index++;
        else
            this.raw_type_index = 0;
        this.allRaws[index] = rawFactory.createBoardRaw(this.raw_types[this.raw_type_index], 0, element.getPosition()[1]);
        this.allRaws[index].getStage().on('mousedown', () => { this.replaceRaw(this.allRaws[index], index, rawFactory) });
    }

    public startNewGame(): void {
        if (!this.isCustomRawConfig)
            this.buildBoardRawsSprites();
        this.createObstacles("grass");
        this.createObstacles("road");
        this.createObstacles("water");
        this.isCustomRawConfig = false;
        
    }

    private createObstacles(type: string) {
        this.allRaws.map(element => {
            if (element.getType() == type) {
                element.allObstacles.forEach(obstacles => obstacles.getStage().parent.removeChild(obstacles.getStage()));
                element.allObstacles = [];
                switch (type) {
                    case "grass":
                        element.createTrees();
                        break;
                    case "road":
                        element.startCarsMoving();
                        break;
                    case "water":
                        element.startLogsMoving();
                        break;
                    default:
                        break;
                }
            }
        });
    }

    public checkCollisionNonstop() {
        let isCollide: boolean;
        this.allRaws.map(element => element.allObstacles)
            .forEach(obstacles => obstacles.forEach((obstacle: any) => {
                if (obstacle.checkCollisionWithPlayer(this.player)) isCollide = true;

                if (isCollide &&
                    !this.startBoard.checkPlayerIntersection(this.player) &&
                    !this.finishBoard.checkPlayerIntersection(this.player)) {
                    this.onCollision(obstacle);
                    isCollide = false;
                }
            }))
    }

    public checkCollisionAfterStep() {
        this.checkFinish();
        this.checkWater();
    }

    private checkFinish() { 
        this.isOnFinish = this.finishBoard.checkPlayerIntersection(this.player);
        if (this.isOnFinish && Game.curGameStatus == GameStatus.GameRunning) {
            this.player.reset();
            this.onGameOver(this.isOnFinish);
        }
    }

    private checkWater() {
        this.allRaws.map(element => {
            if (element.getType() == "water") {
                element = (element as Water);
                if (element.checkPlayerInWater(this.player)) {
                    this.checkCollisionNonstop();
                    this.onPlayerOnWaterButNotOnLog();
                } else
                    this.isPlayerOnLog = false;
            }
        })
    }

    private onPlayerOnWaterButNotOnLog() {
        if (!this.isPlayerOnLog &&
            !this.startBoard.checkPlayerIntersection(this.player) &&
            !this.isOnFinish) {
            this.onLostLife();
            this.player.reset();
        }
    }

    public onCollision(obstacle: Obstacle): any {
        if (obstacle.obstacleType == "tree") {
            this.onCollisionWithTree();
        }
        if (obstacle.obstacleType == "log") {
            this.isPlayerOnLog = true;
            obstacle = (obstacle as Log)
            this.onCollisionWithLog(obstacle);
        } else
            this.isPlayerOnLog = false;

        if (obstacle.obstacleType == "car") {
            this.onCollisionWithCar();
        }
    }

    private onCollisionWithTree() {
        this.player.sprite.x = this.player.sprite.x + 1;
        this.player.sprite.y = this.player.sprite.y + 1;
    }

    private onCollisionWithLog(obstacle: Obstacle) {
        this.onCollisionWithLeftDirectedLog(obstacle);
        this.onCollisionWithRightDirectedLog(obstacle);
    }

    private onCollisionWithLeftDirectedLog(obstacle: Obstacle) {
        if (obstacle.DIRECTION == Direction.Left && this.player.sprite.x > 0)
            this.player.sprite.x -= (Setting.GAME_SPEED_X / 80 + obstacle.speedInc / 2);
        else if (obstacle.DIRECTION == Direction.Left) {
            this.player.reset();
            this.onGameOver(this.isOnFinish);
        }
    }

    private onCollisionWithRightDirectedLog(obstacle: Obstacle) {
        if (obstacle.DIRECTION == Direction.Right && this.player.sprite.x < Setting.BOARD_WIDTH - Setting.OBSTACLE_WIDTH)
            this.player.sprite.x += (Setting.GAME_SPEED_X / 80 + obstacle.speedInc / 2);
        else if (obstacle.DIRECTION == Direction.Right) {
            this.player.reset();
            this.onGameOver(this.isOnFinish);
        }
    }

    private onCollisionWithCar() {
        this.player.reset();
        this.onLostLife();
    }

    public update(): void {
        this.allRaws.map(element => element.allObstacles)
            .forEach(obstacles => obstacles.forEach((obstacle: any) => { if (obstacle.obstacleType == "car" || obstacle.obstacleType == "log") obstacle.update() }))
    }

    public getStage(): PIXI.Container {
        this.addRaws();
        this.addRawObstacles();
        this.addStartStopPlaces();
        this.addPlayer();
        this.gameBoardStage.interactive = true;
        this.checkCollisionNonstop();  
        return this.gameBoardStage;
    }

    private addRaws() {
        this.allRaws.forEach(
            (rawItem, i) => this.gameBoardStage.addChild(rawItem.getStage())
        )
    }

    private addRawObstacles() {
        if (Game.curGameStatus == GameStatus.GameRunning)
            this.allRaws.map(element => element.allObstacles)
                .forEach(obstacles => obstacles.forEach((obstacle: any) => this.gameBoardStage.addChild(obstacle.getStage())))
        else
            this.allRaws.map(element => element.allObstacles = [])
    }

    private addStartStopPlaces() {
        this.gameBoardStage.addChild(this.startBoard.getStage());
        this.gameBoardStage.addChild(this.finishBoard.getStage());
    }

    private addPlayer() {
        if (Game.curGameStatus == GameStatus.GameRunning)
            this.gameBoardStage.addChild(this.player.getStage());
    }
}