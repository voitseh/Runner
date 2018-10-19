import { RenderableElement } from "../../utilities/RenderableElement";
import { GameBoard } from "../board/GameBoard";
import { LivesBoard } from "./LivesBoard";
import { Setting } from "../../Settings";

export class ButtonsBar implements RenderableElement {
    
    private readonly onNewGameRequest: () => void;
    private readonly onSettingsDialogRequest: () => void;

    private readonly newGameButton: PIXI.Container;
    private readonly settingsButton: PIXI.Container;

    constructor(onNewGameRequest: () => void, onSettingsDialogRequest: () => void) {
        this.onNewGameRequest = onNewGameRequest;
        this.onSettingsDialogRequest = onSettingsDialogRequest;

        let newGameButton = new PIXI.Container();
        let newGameButtonSprite = new PIXI.Sprite(
            PIXI.loader.resources["./images/ui/new.png"].texture
        );
        newGameButtonSprite.position.x = Setting.BUTTON_MARGIN;
        newGameButtonSprite.position.y = Setting.CANVAS_MARGIN_TOP;
        newGameButtonSprite.width = Setting.BUTTON_WIDTH_HEIGHT;
        newGameButtonSprite.height = Setting.BUTTON_WIDTH_HEIGHT;

        newGameButtonSprite.interactive = true;
        newGameButtonSprite.on('click', () => this.onNewGameRequest());
        newGameButton.addChild(newGameButtonSprite);
        this.newGameButton = newGameButton;

        let settingsButton = new PIXI.Container();
        let settingsButtonSprite = new PIXI.Sprite(
            PIXI.loader.resources["./images/ui/settings.png"].texture
        );
        settingsButtonSprite.position.x = Setting.BOARD_WIDTH - Setting.BUTTON_WIDTH_HEIGHT - Setting.BUTTON_MARGIN;
        settingsButtonSprite.position.y = Setting.CANVAS_MARGIN_TOP;
        settingsButtonSprite.width = Setting.BUTTON_WIDTH_HEIGHT;
        settingsButtonSprite.height = Setting.BUTTON_WIDTH_HEIGHT;
        settingsButtonSprite.interactive = true;
        settingsButtonSprite.on('click', () => this.onSettingsDialogRequest());
        settingsButton.addChild(settingsButtonSprite);
        this.settingsButton = settingsButton;
    }

    public getStage(): PIXI.Container {
        let stage = new PIXI.Container();
        stage.addChild(this.newGameButton);
        stage.addChild(this.settingsButton);
        stage.interactive = true;
        return stage;
    }
}