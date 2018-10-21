import 'pixi.js';
import Sprite = PIXI.Sprite;

import { Setting } from "./Settings";
import { Game } from "./Game";

function onLoad(): void {
    
    PIXI.loader
    PIXI.loader.add("../../images/spritesheet.json").load(setup)
    function setup(): void {

        let renderer = PIXI.autoDetectRenderer(
            Setting.CANVAS_WIDTH,
            Setting.CANVAS_HEIGHT,
            { backgroundColor: 0xc1c2c4 });

        document.body.appendChild(renderer.view);
        gameLoop(new Game(renderer));
    }

    function gameLoop(game: Game): void {
        requestAnimationFrame(() => gameLoop(game));
        game.update();
        game.render();
    }
}

window.onload = () => onLoad();