import type {TankUI} from '../index';
import type {Position} from './engine/types';

export default class Tank {
    ui: TankUI;
    velocities = {
        x: 0,
        y: 0
    };
    target: Position; // relative to WHAT?
    // tip: Position;

    constructor(ui: TankUI) {
        this.ui = ui;
    }

    /**
     * update state
     *
     * @param dt delta time in milliseconds, since last update
     */
    update(dt) {
        // console.log('tank velocities yo:', JSON.stringify(this.velocities));
        this.ui.container.x += (this.velocities.x / 1000) * dt;
        this.ui.container.y += (this.velocities.y / 1000) * dt;
        this.aimGun();
    }

    aimGun() {
        if (this.target) {
            const {x, y} = this.ui.container.getGlobalPosition();
            // this.ui.gun.rotation = getAngle(this.target, {x: x - this.ui.gun.x, y: y - this.ui.gun.y});
            this.ui.gun.rotation = getAngle(this.target, this.ui.gun.getGlobalPosition());
        }
        this.ui.gun.rotation += -.01;
    }
}

/**
 * get angle toward point in radians
 *
 * @param target
 * @param origin Defaults to actual origin (0, 0)
 */
const getAngle = (target: Position, origin: Position = {x: 0, y: 0}): number => {
    const adjustedTarget = {
        x: target.x - origin.x,
        y: target.y - origin.y
    };
    let rotation = Math.atan(adjustedTarget.y / adjustedTarget.x); // tan(theta) = y / x, so theta = tan^-1 (y / x);

    // UI coordinates are weird, so we have to offset the left 2 quadrants by PI
    if (adjustedTarget.x < 0) {
        rotation += Math.PI;
    }

    debugPoints(origin, target, adjustedTarget, rotation);

    return rotation;
};

const debugPoints = (origin, target, adjustedTarget, rotation) => {
    const xy = (pt: Position) => `(${pt.x}, ${pt.y})`;
    document.getElementById('debug').innerHTML = [
        'origin: ' + xy(origin),
        'target: ' + xy(target),
        '<b>adjustedTarget: ' + xy(adjustedTarget) + '</b>',
        'rotation: ' + rotation
    ].join('<br />');
};