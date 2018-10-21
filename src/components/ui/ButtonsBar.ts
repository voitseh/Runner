import { RenderableElement } from "../../utilities/RenderableElement";
import { GameBoard } from "../board/GameBoard";
import { LivesBoard } from "./LivesBoard";
import { Setting } from "../../Settings";
import { Container } from "pixi.js";

export class ButtonsBar implements RenderableElement {
    
    private readonly onNewGameRequest: () => void;
    private readonly onSettingsDialogRequest: () => void;

    private readonly newGameButton: PIXI.Container;
    private readonly settingsButton: PIXI.Container;

    constructor(onNewGameRequest: () => void, onSettingsDialogRequest: () => void) {
        this.onNewGameRequest = onNewGameRequest;
        this.onSettingsDialogRequest = onSettingsDialogRequest;

        this.newGameButton = this.createButton("new.png", Setting.BUTTON_MARGIN, Setting.CANVAS_MARGIN_TOP, () => this.onNewGameRequest());
        let settingsBttnPosX = Setting.BOARD_WIDTH - Setting.BUTTON_WIDTH_HEIGHT - Setting.BUTTON_MARGIN;
        this.settingsButton = this.createButton("settings.png", settingsBttnPosX,  Setting.CANVAS_MARGIN_TOP, () => this.onSettingsDialogRequest());
    }

    private createButton(spriteName: string, posX: number, posY: number, callback: ()=> void):Container{
        let button = new PIXI.Container();
        let buttonSprite =  PIXI.Sprite.fromFrame(spriteName);
        buttonSprite.position.x = posX;
        buttonSprite.position.y = posY;
        buttonSprite.width = Setting.BUTTON_WIDTH_HEIGHT;
        buttonSprite.height = Setting.BUTTON_WIDTH_HEIGHT;

        buttonSprite.interactive = true;
        buttonSprite.on('click', callback);
        button.addChild(buttonSprite);
        return button;
    }

    public getStage(): PIXI.Container {
        let stage = new PIXI.Container();
        stage.addChild(this.newGameButton);
        stage.addChild(this.settingsButton);
        stage.interactive = true;
        return stage;
    }
}