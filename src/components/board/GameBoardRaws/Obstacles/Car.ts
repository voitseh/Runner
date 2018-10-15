import { Obstacle } from "./Obstacle";
import { Road } from "../Road";
import { Player } from "../../../../utilities/Player";
import { Setting } from "../../../../Settings";
import { Direction } from "../RawItem";

export class Car extends Obstacle{

    DIRECTION: Direction;

    speedInc: number;
    
    obstacleType = "car";

    constructor(imgPath: string, public posX: number, public posY: number){
        super(imgPath , posX, posY);
    }

    update() {
        if(this.DIRECTION == Direction.Left){
           this.sprite.x -= Setting.GAME_SPEED_X / 60;
             this.addSpeedLeft(this.speedInc)
             if (this.sprite.x < -Obstacle.OBSTACLE_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }else if(this.DIRECTION == Direction.Right){
            this.sprite.x += Setting.GAME_SPEED_X / 60;
              this.addSpeedRight(this.speedInc)
             if (this.sprite.x > Setting.CANVAS_WIDTH)
                this.stage.parent.removeChild(this.stage);
        }
    }
    addSpeedRight(speedInc: number) {
        this.sprite.x += speedInc;
    }
    addSpeedLeft(speedInc: number) {
        this.sprite.x -= speedInc;
      }

    onCollisionWithPlayer(player: Player) {
        throw new Error("Method not implemented.");
    }

}

// class Tube {
//     private x: number;
//     private y: number;
//     private innerDistance = 80;
//     private tubeWidth = 20;
  
//     private sprite = new PIXI.Graphics();
  
//     reset(x: number = canvasWidthHeight + 20) {
//       this.x = x;
  
//       const tubeMinHeight = 60;
//       const randomNum = Math.random() * (canvasWidthHeight - 2 * tubeMinHeight - this.innerDistance);
//       this.y = tubeMinHeight + randomNum;
//     }
  
//     checkCollision(x: number, y: number, width: number, height: number) {
//       if (!(x + width < this.x || this.x + this.tubeWidth < x || this.y < y)) {
//         return true;
//       }
//       if (!(x + width < this.x || this.x + this.tubeWidth < x || y + height < this.y + this.innerDistance)) {
//         return true;
//       }
//       return false;
//     }
  
//     update() {
//       this.x -= GAME_SPEED_X / 60;
//       if (this.x < -this.tubeWidth) this.reset();
  
//       this.sprite.clear();
//       this.sprite.beginFill(0xffffff, 1);
//       const { x, y, tubeWidth, innerDistance } = this;
//       this.sprite.drawRect(x, 0, tubeWidth, y);
//       this.sprite.drawRect(x, y + innerDistance, tubeWidth, canvasWidthHeight);
//       this.sprite.endFill();
//     }
  
//     constructor(stage: PIXI.Container, x: number) {
//       stage.addChild(this.sprite);
//       this.reset(x);
//     }
//   }