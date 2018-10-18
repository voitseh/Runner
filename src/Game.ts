import {GameBoard} from "./components/board/GameBoard";
import {Player} from "./utilities/Player";
import {ButtonsBar} from "./components/ui/ButtonsBar";
import { RenderableElement } from "./utilities/RenderableElement";
import { LivesBoard } from "./components/ui/LivesBoard";

export class Game {
    public static readonly GAME_SPEED_X = 40;
    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private readonly gameBoard: GameBoard;
    private readonly livesBoard: LivesBoard;
    private readonly buttonsBar: ButtonsBar;

    

    constructor(rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer){
        this.renderer = rendered;
        this.gameBoard = new GameBoard();
        this.livesBoard = new LivesBoard(); 
        this.buttonsBar = new ButtonsBar(() => this.onNewGameRequest(), () => this.onSettingsRequest())
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
        ] as Array<RenderableElement> )
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));
        this.renderer.render(rootStage);
    }


     private onGameOver(playerThatWon?: Player): void {
    
     }

    private onNewGameRequest(): void {
        // this.gameBoard.startNewGame(this.activePlayer);
        this.gameBoard.startNewGame()
    }

    private onSettingsRequest(): void {
        
    }
}