import { GameBoard } from "./components/board/GameBoard";
import { Player } from "./utilities/Player";
import { ButtonsBar } from "./components/ui/ButtonsBar";
import { RenderableElement } from "./utilities/RenderableElement";
import { LivesBoard } from "./components/ui/LivesBoard";
import { SettingsDialogue } from "./components/ui/SettingsDialogue";
import { Setting } from "./Settings";
import { GameStatus } from "./Settings";
import { Car } from "./components/board/GameBoardRaws/Obstacles/Car";

export class Game {

    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private readonly player: Player;
    private readonly gameBoard: GameBoard;
    private readonly livesBoard: LivesBoard;
    private readonly buttonsBar: ButtonsBar;
    private readonly settingsDialogText = "Click on each board  raw to configure it before starting new game.\nClick arrows below to choose player lives count";
    private isSettingsDialogShowed = false;

    public static curGameStatus: string;

    constructor(rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {
        this.renderer = rendered;
        this.gameBoard = new GameBoard((isInFinish) => this.onGameOver(isInFinish), () => this.onLostLife());
        this.player = this.gameBoard.player;
        this.livesBoard = new LivesBoard(this.player);
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
        this.livesBoard.onLostLife();
    }

    private onGameOver(isInFinish?: boolean): void {
        if (isInFinish) {
            Game.curGameStatus = GameStatus.WonGame;
            this.livesBoard.buildStage(Game.curGameStatus);
        }else{
            this.player.setLivesCount(0);
            this.livesBoard.buildStage(GameStatus.LostGame, this.player.livesCount)

        }
        Game.curGameStatus = GameStatus.GameNotRunning;
    }

    private onNewGameRequest(): void { 
        Game.curGameStatus = GameStatus.GameRunning;
        if(!this.gameBoard.isCustomRawConfig)
            this.player.setLivesCount(5);
        this.gameBoard.startNewGame();
        this.player.reset();
        this.livesBoard.buildStage( Game.curGameStatus, this.player.getLivesCount());
    }

    private onSettingsDialogRequest(): void {
        Game.curGameStatus = GameStatus.GameNotRunning;
        this.gameBoard.changeRawTypeOnClick();
        this.gameBoard.isCustomRawConfig = true;
        this.livesBoard.buildStage("settingsAllowed", this.player.livesCount);
        if(!this.isSettingsDialogShowed){
            var obj = new SettingsDialogue(this, this.settingsDialogText);
            obj.show();
            this.isSettingsDialogShowed = true;
        }
    }
}