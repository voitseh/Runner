import 'pixi.js';
import { RenderableElement } from "../../utilities/RenderableElement";
import { GameBoard } from "../board/GameBoard";
import { Setting, GameStatus } from "../../Settings";
import { ColorScheme } from "../../utilities/ColorScheme";
import { Container, Sprite } from 'pixi.js';
import { Player } from '../../utilities/Player';
import { Game } from '../../Game';

export class LivesBoard implements RenderableElement {

    public static readonly CANVAS_MARGIN_TOP = Setting.BOARD_HEIGHT;

    private livesText: PIXI.Text;
    private livesLabelText: PIXI.Text;
    private gameresultText: PIXI.Text;
    private stage: PIXI.Container;
    private player: Player;

    constructor(player: Player) {
        this.player = player;
        this.stage = this.buildStage(GameStatus.GameNotRunning, this.player.getLivesCount());
    }
    public buildStage(gameStatus: string, livesCount: number = 5): PIXI.Container {
        if (this.stage != undefined)
            for (var i = this.stage.children.length - 1; i >= 0; i--) { this.stage.removeChild(this.stage.children[i]); };
        let stage = new PIXI.Container();
        stage.addChild(this.buildBackground());

        switch (gameStatus) {
            case "settingsAllowed":
                stage.addChild(this.arrowsStages());
                this.livesText = this.buildLivesText(livesCount, Setting.CANVAS_WIDTH / 2);
                stage.addChild(this.buildLivesCricle(Setting.CANVAS_WIDTH / 2));
                stage.addChild(this.livesText);
                break;
            case "gameRunning":
                this.livesLabelText = this.buildLivesLabelText();
                stage.addChild(this.buildLivesLabelRect());
                stage.addChild(this.livesLabelText);
                this.livesText = this.buildLivesText(livesCount, Setting.CANVAS_WIDTH / 2 + 50);
                stage.addChild(this.buildLivesCricle(Setting.CANVAS_WIDTH / 2 + 50));
                stage.addChild(this.livesText);
                break;
            case "gameNotRunning":
                break;
            case "wonGame":
                this.gameresultText = this.buildResultText("WIN");
                stage.addChild(this.buildResultRect());
                stage.addChild(this.gameresultText);
                break;
            case "lostGame":
                this.gameresultText = this.buildResultText("LOST");
                stage.addChild(this.buildResultRect());
                stage.addChild(this.gameresultText);
                break;

            default:
                break;
        }
        this.stage = stage;
        return stage;
    }

    private buildBackground(): PIXI.Graphics {
        let background = new PIXI.Graphics();
        background.beginFill(ColorScheme.LightGray);
        background.drawRect(
            0, LivesBoard.CANVAS_MARGIN_TOP,
            Setting.CANVAS_WIDTH, Setting.HEIGHT);
        background.endFill();
        return background;
    }
    //lives label
    private buildLivesLabelRect(): PIXI.Graphics {
        let livesRect = new PIXI.Graphics();
        let rectColor = ColorScheme.DarkBlue;
        livesRect.beginFill(rectColor);
        let xPosition = Setting.CANVAS_WIDTH / 2 - 70;
        livesRect.drawRoundedRect(xPosition, LivesBoard.CANVAS_MARGIN_TOP + Setting.HEIGHT / 2 - 20, Setting.LIVES_LABLE_RECT_WIDTH, Setting.LIVES_LABLE_RECT_HEIGHT, 5);
        return livesRect;
    }

    private buildLivesLabelText(): PIXI.Text {
        let livesLabelText = "Lives: "
        let xPosition = Setting.CANVAS_WIDTH / 2 - 50;
        let livesText = new PIXI.Text(livesLabelText.toString(), {
            fontFamily: 'Arial',
            fontSize: '20px',
            fill: '#FFFFFF'
        });
        livesText.x = xPosition - 5;
        livesText.y = LivesBoard.CANVAS_MARGIN_TOP + 23;
        return livesText;
    }
    //lives count circle
    private buildLivesCricle(posX: number): PIXI.Graphics {
        let livesCircle = new PIXI.Graphics();
        let circleColor = ColorScheme.DarkRed;
        livesCircle.beginFill(circleColor);
        let xPosition = posX;
        livesCircle.drawCircle(xPosition, LivesBoard.CANVAS_MARGIN_TOP + Setting.HEIGHT / 2, Setting.LIVES_CIRCLE_RADIUS);
        return livesCircle;
    }

    private buildLivesText(livesCount: number, posX: number): PIXI.Text {
        let xPosition = posX;
        let livesText = new PIXI.Text(livesCount.toString(), {
            fontFamily: 'Arial',
            fontSize: '20px',
            fill: '#FFFFFF'
        });
        livesText.x = xPosition - 5;
        livesText.y = LivesBoard.CANVAS_MARGIN_TOP + 23;
        return livesText;
    }
    //arrows
    private arrowsStages(): PIXI.Container {
        let stage = new PIXI.Container();
        this.getArrowStages().forEach(
            (itemStage, i) => stage.addChild(itemStage))
        return stage;
    }

    private getArrowStages(): Container[] {
        return [this.stageInfo("arrow_left.png", Setting.CANVAS_WIDTH / 2 - Setting.ARROW_WIDTH - 20, LivesBoard.CANVAS_MARGIN_TOP + Setting.HEIGHT / 2 - Setting.LIVES_CIRCLE_RADIUS),
        this.stageInfo("arrow_right.png", Setting.CANVAS_WIDTH / 2 + 20, LivesBoard.CANVAS_MARGIN_TOP + Setting.HEIGHT / 2 - Setting.LIVES_CIRCLE_RADIUS)];
    }

    private stageInfo(imageAddress: string, posX: number, posY: number): Container {
        let sprite = PIXI.Sprite.fromFrame(imageAddress);
        sprite.width = Setting.ARROW_WIDTH;
        sprite.height = Setting.ARROW_HEIGHT;
        sprite.position.x = posX;
        sprite.position.y = posY;
        let stage = new PIXI.Container();
        stage.addChild(sprite);
        sprite.interactive = true;
        sprite.on('click', () => this.setCustomLivesCount(sprite));
        return stage;
    }

    //game result label
    private buildResultRect(): PIXI.Graphics {
        let resultRect = new PIXI.Graphics();
        let rectColor = ColorScheme.Yellow;
        resultRect.beginFill(rectColor);
        let xPosition = 10;
        resultRect.drawRoundedRect(xPosition, LivesBoard.CANVAS_MARGIN_TOP + 10, Setting.CANVAS_WIDTH - 20, Setting.HEIGHT - 20, 5);
        return resultRect;
    }

    private buildResultText(result: string): PIXI.Text {
        let xPosition = Setting.CANVAS_WIDTH / 2 - 20;
        let resultText = new PIXI.Text(result.toString(), {
            fontFamily: 'Arial',
            fontSize: '25px',
            fill: '#FFFFFF'
        });
        resultText.x = xPosition;
        resultText.y = LivesBoard.CANVAS_MARGIN_TOP + 23;
        return resultText;
    }

    public onLostLife(){
        let livesCount = this.player.getLivesCount();
        if (livesCount > 0) {
            livesCount--;
            this.player.setLivesCount(livesCount)
            Game.curGameStatus = GameStatus.GameRunning;
            this.buildStage(Game.curGameStatus, livesCount);
        }
        if (livesCount == 0){ 
            Game.curGameStatus = GameStatus.LostGame;
            this.buildStage(Game.curGameStatus, livesCount);
            Game.curGameStatus = GameStatus.GameNotRunning;
        }

    }

    private setCustomLivesCount(sprite: Sprite) {
        let livesCount = this.player.getLivesCount();
        if (sprite.position.x == Setting.CANVAS_WIDTH / 2 - Setting.ARROW_WIDTH - 20) {
            if (livesCount > 0){
                livesCount--;
                this.player.setLivesCount(livesCount)
            }
        } else {
            if (livesCount < 9){
                livesCount++;
                this.player.setLivesCount(livesCount);
            }
        }
        this.buildStage("settingsAllowed", livesCount);
    }

    public getStage(): PIXI.Container {
        return this.stage;
    }
}