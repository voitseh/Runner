import { Rectangle } from "pixi.js";

export class Utils {

    static randomInt(min: number, max: number) // min and max included
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static getRandomBool() {
        return Math.random() >= 0.5;
    }

    static isIntersecting(r1: any, r2: any) {
        //point1-player area, which is used to calculate intersecting event;
        let point1X = r1.x + r1.width / 2; 
        let point1Y = r1.y + r1.height;
        let point1WIDTH = 5
        let point1HEIGHT = 5;
        return !(r2.x > (point1X + point1WIDTH) ||

            (r2.x + r2.width) < point1X ||

            r2.y > (point1Y + point1HEIGHT) ||

            (r2.y + r2.height) < point1Y)

    }
    static getIntersectionRect(r1: any, r2: any): any {
        let point1X = r1.x + r1.width / 2;
        let point1Y = r1.y + r1.height;
        let point1WIDTH = 1;
        let point1HEIGHT = 1;
        let leftX = Math.max(point1X, r2.x);
        let rightX = Math.min(point1X + point1WIDTH, r2.x + r2.width);
        let topY = Math.max(point1Y, r2.y);
        let bottomY = Math.min(point1Y + point1HEIGHT, r2.y + r2.height);

        if (leftX < rightX && topY < bottomY) {
            return [true, leftX, topY, rightX - leftX, bottomY - topY];
        } else {
            // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)
            return [false, null, null, null, null];
        }

    }
}

