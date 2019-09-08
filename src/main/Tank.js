import MouseHandler from './MouseHandler';
import type {TankUI} from '../index';
import type {Position} from './engine/types';
import Colors from './snyder-square/Colors';

const colors = new Colors();

export default class Tank {
    ui: TankUI;
    velocities = {
        x: 0,
        y: 0
    };
    mouseHandler: MouseHandler;
    tip: Position;

    constructor(ui: TankUI, mouseHandler: MouseHandler) {
        this.ui = ui;
        this.mouseHandler = mouseHandler;
    }

    /**
     * update state
     *
     * @param dt delta time in milliseconds, since last update
     */
    update(dt) {
        // console.log('tank velocities yo:', JSON.stringify(this.velocities));
        this.ui.x += (this.velocities.x / 1000) * dt;
        this.ui.y += (this.velocities.y / 1000) * dt;
        // TODO: add AIM_GUN to TankController and provide the target point (ie abstract away the mouse)
        this.aimGun();
    }

    aimGun() {
        this.ui.gun.clear();

        const startPoint: Position = {x: this.ui.container.width / 2, y: this.ui.container.height / 2};
        // Move it to the beginning of the line
        this.ui.gun.position.set(startPoint.x, startPoint.y);

        const targetPoint: Position = this.mouseHandler.getMouseData().getLocalPosition(this.ui.container);
        const endPoint: Position = this.getGunTip(startPoint, targetPoint);
        this.tip = endPoint;
        // console.log('gun endPoint:', endPoint);
        const thickness = 7;

        // Draw the line (endPoint should be relative to myGraph's position)
        this.ui.gun.lineStyle(thickness, colors.blue)
            .moveTo(0, 0)
            .lineTo(endPoint.x, endPoint.y);
    }

    getGunTip(startPoint: Position, targetPoint: Position): Position {
        // gun length in direction of mouse, starting from startPosition
        const gunLength = this.ui.container.width;
        const theta = Math.atan(targetPoint.y / targetPoint.x); // tan(theta) = y / x, so theta = tan^-1 (y / x)
        const x = gunLength * Math.cos(theta);
        const y = gunLength * Math.sin(theta);
        return { x, y };
    }
}