import { GameBoard } from "./components/board/GameBoard";
import { Player } from "./utilities/Player";
import { ButtonsBar } from "./components/ui/ButtonsBar";
import { RenderableElement } from "./utilities/RenderableElement";
import { LivesBoard } from "./components/ui/LivesBoard";
import { SettingsDialogue } from "./components/ui/SettingsDialogue";

export class Game {

    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private readonly gameBoard: GameBoard;
    private readonly livesBoard: LivesBoard;
    private readonly buttonsBar: ButtonsBar;
    private readonly settingsDialidText = "Click on each board  raw to configure it before starting new game.\nClick arrows below to choose player lives count";

    public static curGameStatus: string;

    constructor(rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {
        this.renderer = rendered;
        this.gameBoard = new GameBoard(() => this.onGameOver(), () => this.onLostLife());
        this.livesBoard = new LivesBoard(() => this.onGameOver());
        this.buttonsBar = new ButtonsBar(() => this.onNewGameRequest(), () => this.onSettingsDialogRequest())
    }

    public update(): void {
        this.gameBoard.update();
    }

    public render(): void {
        let rootStage = new PIXI.Container();
        ([
            this.gameBoard,
            this.livesBoard,
            this.buttonsBar
        ] as Array<RenderableElement>)
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));
        this.renderer.render(rootStage);
    }

    private onLostLife() {
        if (Player.livesCount > 0) {
            Player.livesCount--;
            this.livesBoard.buildStage("gameRunning", Player.livesCount);
        }
        if (Player.livesCount == 0)
            this.livesBoard.buildStage("lossGame", Player.livesCount)
    }

    private onGameOver(): void {
        if (this.gameBoard.isOnFinish) {
            this.livesBoard.buildStage("winGame");
            Game.curGameStatus = "winGame"
        }
        Game.curGameStatus = "gameNotRunning";
    }

    private onNewGameRequest(): void {
        this.gameBoard.startNewGame();
        this.gameBoard.player.reset();
        if (Player.livesCount <= 0 || Game.curGameStatus == "winGame")
            Player.livesCount = 5;
        Game.curGameStatus = "gameRunning";
        this.livesBoard.buildStage("gameRunning", Player.livesCount);
    }

    private onSettingsDialogRequest(): void {
        var obj = new SettingsDialogue(this, this.settingsDialidText);
        obj.show();
    }

    public onSettingsAllowedRequest(): void {
        this.gameBoard.changeRawTypeOnClick();
        this.livesBoard.buildStage("settingsAllowed", Player.livesCount);
    }
}