import 'pixi.js';

import Container = PIXI.Container;
import { RenderableElement } from "../../utilities/RenderableElement";
import { RawItem, Direction } from "./GameBoardRaws/RawItem";
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
import { Setting } from '../../Settings';

export class GameBoard implements RenderableElement, UpdateableElement {

    private raw_types: string[] = ["road", "water", "grass"];
    private raw_type_index = -1;
    private rawListInitial: string[] = ["road", "water", "grass", "road", "water", "grass", "road", "water", "grass", "road"]
    private rawPosYlist: number[] = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360];

    public allRaws: RawItem[] = [];

    private gameBoardStage: Container;
    public player: Player;
    private startBoard: StartBoard;
    private finishBoard: FinishBoard;

    private isPlayerOnLog = false;
    private readonly onGameOver: () => void;
    private readonly removeLifeOnColision: () => void;
    public isOnFinish = false;
    private rawFactory: BoardRawFactory;

    constructor(onGameOver: () => void, removeLifeOnColision: () => void) {
        this.onGameOver = onGameOver;
        this.removeLifeOnColision = removeLifeOnColision;
        const boardrawFactory = new BoardRawFactory();
        this.rawFactory = boardrawFactory;
        this.buildBoardRawsSprites();
        this.player = new Player(this);
        this.startBoard = new StartBoard();
        this.finishBoard = new FinishBoard();
    }
    private buildBoardRawsSprites() {
        this.rawPosYlist.forEach((posY, i) => { this.allRaws.push(this.rawFactory.createBoardRaw(this.rawListInitial[i], 0, posY)) })
    }

    public changeRawTypeOnClick() {
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
        this.startCarsMoving();
        this.startLogsMoving();
    }

    private startCarsMoving() {
        this.allRaws.map(element => {
            if (element.getType() == "road") {
                element as Road;
                element.startCarsMoving();
            }
        });
    }

    private startLogsMoving() {
        this.allRaws.map(element => {
            if (element.getType() == "water") {
                element as Water;
                element.startLogsMoving();
            }
        });
    }

    public checkCollision() {
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

    public checkPlayerInWaterArea() {
        this.isOnFinish = this.finishBoard.checkPlayerIntersection(this.player);
        if (this.isOnFinish)
            this.onGameOver();
        this.allRaws.map(element => {
            if (element.getType() == "water") {
                element = (element as Water);
                if (element.checkPlayerInWater(this.player)) {

                    this.checkCollision()
                    if (!this.isPlayerOnLog &&
                        !this.startBoard.checkPlayerIntersection(this.player) &&
                        !this.isOnFinish) {
                        this.removeLifeOnColision();
                        this.player.reset();
                    }
                } else
                    this.isPlayerOnLog = false;
            }
        })
    }


    public onCollision(obstacle: Obstacle): any {
        if (obstacle.obstacleType == "tree") {
            this.player.sprite.x = this.player.sprite.x + 1;
            this.player.sprite.y = this.player.sprite.y + 1;
        }
        if (obstacle.obstacleType == "log") {
            this.isPlayerOnLog = true;
            obstacle = (obstacle as Log)

            if (obstacle.DIRECTION == Direction.Left && this.player.sprite.x > 0)
                this.player.sprite.x -= (Setting.GAME_SPEED_X / 60 + obstacle.speedInc / 2);
            else if (obstacle.DIRECTION == Direction.Left)
                this.removeLifeOnColision();

            if (obstacle.DIRECTION == Direction.Right && this.player.sprite.x < Setting.BOARD_WIDTH - Setting.OBSTACLE_WIDTH)
                this.player.sprite.x += (Setting.GAME_SPEED_X / 60 + obstacle.speedInc / 2);
            else if (obstacle.DIRECTION == Direction.Right)
                this.removeLifeOnColision();
        } else 
            this.isPlayerOnLog = false;

        if (obstacle.obstacleType == "car") {
            this.player.reset();
            this.removeLifeOnColision();
        }
    }

    public update(): void {
        this.allRaws.map(element => element.allObstacles)
            .forEach(obstacles => obstacles.forEach((obstacle: any) => { if (obstacle.obstacleType == "car" || obstacle.obstacleType == "log") obstacle.update() }))
    }

    public getStage(): PIXI.Container {
        let stage = new Container();

        this.allRaws.forEach(
            (rawItem, i) => stage.addChild(rawItem.getStage())
        )
        this.allRaws.map(element => element.allObstacles)
            .forEach(obstacles => obstacles.forEach((obstacle: any) => stage.addChild(obstacle.getStage())))

        stage.addChild(this.startBoard.getStage());
        stage.addChild(this.finishBoard.getStage());

        stage.addChild(this.player.getStage());
        stage.interactive = true;
        this.checkCollision();
        this.gameBoardStage = stage;
        return stage;
    }
}