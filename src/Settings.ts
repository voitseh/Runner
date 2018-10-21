import { GameBoard } from "./components/board/GameBoard";
import { LivesBoard } from "./components/ui/LivesBoard";

export class Setting {
    public static readonly CANVAS_WIDTH = 600;
    public static readonly CANVAS_HEIGHT = 550;

    public static readonly GAME_SPEED_X = 40;

    //for player
    public static PLAYER_WIDTH = 17;
    public static PLAYER_HEIGHT = 25;
    public static readonly FORWARD_FRAME_LIST = [
        "forward1.png",
        "forward2.png",
        "forward3.png",
      ];
    
    public static readonly BACK_FRAME_LIST = [
        "back1.png",
        "back2.png",
        "back3.png",
      ];
    
    public static readonly LEFT_FRAME_LIST = [
        "left1.png",
        "left2.png",
        "left3.png",
      ];
    
    public static readonly RIGHT_FRAME_LIST = [
        "right1.png",
        "right2.png",
        "right3.png",
      ];
    
    public static readonly DIE_FRAME_LIST = [
        "die1.png",
        "die2.png",
        "die3.png",
        "die4.png",
      ];

    public static readonly CAR_ADDRESSES = [
        "car_red_right.png",
        "car_red_left.png",
        "car_white_right.png",
        "car_white_left.png",
    ];
      
    public static readonly HEIGHT = 70;
    public static readonly WIDTH = Setting.CANVAS_WIDTH;
    public static readonly LIVES_LABLE_RECT_WIDTH = 80;
    public static readonly LIVES_LABLE_RECT_HEIGHT = 40;
    public static readonly LIVES_CIRCLE_RADIUS = 20;
    public static readonly ARROW_WIDTH = Setting.LIVES_LABLE_RECT_HEIGHT + 20;
    public static readonly ARROW_HEIGHT = Setting.LIVES_LABLE_RECT_HEIGHT;

    public static readonly BOARD_WIDTH = 600;
    public static readonly BOARD_HEIGHT = 400;

    public static readonly CANVAS_MARGIN_TOP = Setting.BOARD_HEIGHT + 15 + Setting.HEIGHT;
    public static readonly BUTTON_WIDTH_HEIGHT = 50;
    public static readonly BUTTON_MARGIN = 50;

    public static TREE_MIN_COUNT = 3;
    public static TREE_MAX_COUNT = 6;

    public static readonly RAW_WIDTH = 600;
    public static readonly RAW_HEIGHT = 40;

    public static OBSTACLE_WIDTH = 15;
    public static readonly OBSTACLE_HEIGHT = 15;

    public static readonly STARTBOARD_WADTH = 100;
    public static readonly STARTBOARD_HEIGHT = 25;
  
}

export enum GameStatus {
  GameRunning = "gameRunning",
  GameNotRunning = "gameNotRunning",
  GameRestart = "gameRestart",
  WonGame = "wonGame",
  LostGame = "lostGame"
}

export enum Direction {
  Left,
  Right
}

