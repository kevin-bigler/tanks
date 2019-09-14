import type {TankUI} from '../index';
import type {Position} from './engine/types';

export default class Tank {
    ui: TankUI;
    velocities = {
        x: 0,
        y: 0
    };
    target: Position = {x: 0, y: 0}; // relative to WHAT?
    tip: Position;

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
        this.ui.gun.rotation = getAngle(this.target, this.ui.container.getGlobalPosition());
    }
}

/**
 * get angle toward point in radians
 *
 * @param target
 * @param origin Defaults to actual origin (0, 0)
 */
const getAngle = (target: Position, origin: Position = {x: 0, y: 0}): number => {
    const adjustedTarget = { x: target.x - origin.x, y: target.y - origin.y};
    // console.log('aiming from:', origin, 'to:', target, 'effective target:', adjustedTarget);
    debugPoints(origin, target, adjustedTarget);

    return Math.atan(target.y - origin.y / target.x - origin.x); // tan(theta) = y / x, so theta = tan^-1 (y / x)
};

const debugPoints = (origin, target, adjustedTarget) => {
    const xy = (pt: Position) => `(${pt.x}, ${pt.y})`;
    document.getElementById('debug').innerHTML = [
        'origin: ' + xy(origin),
        'target: ' + xy(target),
        'adjustedTarget: ' + xy(adjustedTarget)
    ].join('<br />');
};