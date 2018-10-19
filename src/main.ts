import 'pixi.js';
import Sprite = PIXI.Sprite;

import { Setting } from "./Settings";
import { Game } from "./Game";

function onLoad(): void {
    PIXI.loader
        .add([
            "./images/ui/new.png",
            "./images/ui/settings.png",
            "./images/ui/arrow_left.png",
            "./images/ui/arrow_right.png",
            
            "./images/log.png",
            
            "./images/player/forward1.png",
            "./images/player/forward2.png",
            "./images/player/forward3.png",
            "./images/player/back1.png",
            "./images/player/back2.png",
            "./images/player/back3.png",
            "./images/player/left1.png",
            "./images/player/left2.png",
            "./images/player/left3.png",
            "./images/player/right1.png",
            "./images/player/right2.png",
            "./images/player/right3.png",
            "./images/player/die1.png",
            "./images/player/die2.png",
            "./images/player/die3.png",
            "./images/player/die4.png",

            "./images/lanes/road.png",
            "./images/lanes/grass.png",
            "./images/lanes/water.png",

            "./images/obstacles/car_red_right.png",
            "./images/obstacles/car_red_left.png",
            "./images/obstacles/car_white_right.png",
            "./images/obstacles/car_white_left.png",
            "./images/obstacles/tree.png",

            "./images/start_end.png"
        ])
        .load(setup);

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