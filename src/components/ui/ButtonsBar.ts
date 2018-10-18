import { RenderableElement } from "../../utilities/RenderableElement";
import { Player } from "../../utilities/Player";
import { GameBoard } from "../board/GameBoard";
import { LivesBoard } from "./LivesBoard";

export class ButtonsBar implements RenderableElement {
    public static readonly CANVAS_MARGIN_TOP = GameBoard.BOARD_HEIGHT + 15 + LivesBoard.HEIGHT;
    public static readonly BUTTON_WIDTH_HEIGHT = 50;
    public static readonly BUTTON_MARGIN = 50;

    private readonly onNewGameRequest: () => void;
    private readonly onSettingsRequest: () => void;

    private readonly newGameButton: PIXI.Container;
    private readonly settingsButton: PIXI.Container;

    constructor(onNewGameRequest: () => void, onSettingsRequest: () => void){
        this.onNewGameRequest = onNewGameRequest;
        this.onSettingsRequest = onSettingsRequest;

        let newGameButton = new PIXI.Container();
        let newGameButtonSprite = new PIXI.Sprite(
            PIXI.loader.resources["./images/ui/new.png"].texture
        );
        newGameButtonSprite.position.x = ButtonsBar.BUTTON_MARGIN;
        newGameButtonSprite.position.y = ButtonsBar.CANVAS_MARGIN_TOP;
        newGameButtonSprite.width = ButtonsBar.BUTTON_WIDTH_HEIGHT;
        newGameButtonSprite.height = ButtonsBar.BUTTON_WIDTH_HEIGHT;

        newGameButtonSprite.interactive = true;
        newGameButtonSprite.on('click', () => this.onNewGameRequest());
        newGameButton.addChild(newGameButtonSprite);
        this.newGameButton = newGameButton;

        let settingsButton = new PIXI.Container();
        let settingsButtonSprite = new PIXI.Sprite(
            PIXI.loader.resources["./images/ui/settings.png"].texture
        );
        settingsButtonSprite.position.x = GameBoard.BOARD_WIDTH - ButtonsBar.BUTTON_WIDTH_HEIGHT - ButtonsBar.BUTTON_MARGIN;
        settingsButtonSprite.position.y = ButtonsBar.CANVAS_MARGIN_TOP;
        settingsButtonSprite.width = ButtonsBar.BUTTON_WIDTH_HEIGHT;
        settingsButtonSprite.height = ButtonsBar.BUTTON_WIDTH_HEIGHT;
        settingsButtonSprite.interactive = true;
        settingsButtonSprite.on('click', () => this.onSettingsRequest());
        settingsButton.addChild(settingsButtonSprite);
        this.settingsButton = settingsButton;

    }

    public onGameOver(): void {
        // this.activeStage = this.newGameButton;
    }


    public getStage(): PIXI.Container{ 
        let stage = new PIXI.Container();
        stage.addChild(this.newGameButton);
        stage.addChild(this.settingsButton);
        stage.interactive = true;
        return stage;
    }
}