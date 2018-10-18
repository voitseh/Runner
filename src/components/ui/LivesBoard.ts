import 'pixi.js';
import { RenderableElement } from "../../utilities/RenderableElement";
import { GameBoard } from "../board/GameBoard";
import { Setting } from "../../Settings";
import { ColorScheme } from "../../utilities/ColorScheme";

export class LivesBoard implements RenderableElement{
    public static readonly CANVAS_MARGIN_TOP = GameBoard.BOARD_HEIGHT;
    public static readonly HEIGHT = 70;
    public static readonly WIDTH = Setting.CANVAS_WIDTH;

    private livesText: PIXI.Text;
    private stage: PIXI.Container;
    constructor(){
        this.livesText = this.buildLivesText(5);
        this.livesLabelText();
        this.stage = this.buildStage(this.livesText);
    }
    private buildStage(livesText: PIXI.Text): PIXI.Container{
        let stage = new PIXI.Container();

        stage.addChild(this.buildBackground());
        stage.addChild(this.buildLivesCricle());
        stage.addChild(livesText);

        return stage;
    }
    private buildBackground(): PIXI.Graphics {
        let background = new PIXI.Graphics();
        background.beginFill(ColorScheme.LightGray);
        background.drawRect(
            0, LivesBoard.CANVAS_MARGIN_TOP,
            Setting.CANVAS_WIDTH, LivesBoard.HEIGHT);
        background.endFill();
        return background;
    }
    private buildLivesCricle(): PIXI.Graphics {
        let livesCircle = new PIXI.Graphics();
        let circleColor = ColorScheme.DarkRed;
        livesCircle.beginFill(circleColor);
        let xPosition = Setting.CANVAS_WIDTH/2 - 10;
        livesCircle.drawCircle(xPosition, LivesBoard.CANVAS_MARGIN_TOP + LivesBoard.HEIGHT/2, 20);
        return livesCircle;
    }

    private livesLabelText(): PIXI.Text {
        let livesLabelText = "Lives: "
        let xPosition = Setting.CANVAS_WIDTH/2 - 10;
        let livesText = new PIXI.Text(livesLabelText.toString(), {
            fontFamily : 'Arial',
            fontSize : '20px',
            //fill : '#FFFFFF'
        });
        livesText.x = xPosition - 25;
        livesText.y = LivesBoard.CANVAS_MARGIN_TOP + 23;
        return livesText;
    }

    private buildLivesText(livesCount: number): PIXI.Text {
        let xPosition = Setting.CANVAS_WIDTH/2 - 10;
        let livesText = new PIXI.Text(livesCount.toString(), {
            fontFamily : 'Arial',
            fontSize : '20px',
            fill : '#FFFFFF'
        });
        livesText.x = xPosition - 5;
        livesText.y = LivesBoard.CANVAS_MARGIN_TOP + 23;
        return livesText;
    }

    public setLivesCount(livesCount:number): void {
        let currentLivesCount = Number(this.livesText.text);
        this.livesText.text = (livesCount).toString();
    }

    public playerLossOneLife(): void {
        let currentLivesCount = Number(this.livesText.text);
        if(currentLivesCount > 0)
            this.livesText.text = (currentLivesCount - 1).toString();
    }

    public onGameOver(): void {
        this.livesText.text = "0";
    }
   
    public getStage(): PIXI.Container{
        return this.stage;
    }
}