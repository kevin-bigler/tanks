import type {TankUI} from '../index';
import type {Position} from './engine/types';
import {getRect} from './snyder-square/getRect';
import Colors from './snyder-square/Colors';

const colors = new Colors();

export default class Tank {
    ui: TankUI;
    velocities = {
        x: 0,
        y: 0
    };
    target: Position; // relative to stage, not container
    renderer;
    stage;

    constructor(ui: TankUI, renderer, stage) {
        this.ui = ui;
        this.renderer = renderer;
        this.stage = stage;
    }

    /**
     * update state
     *
     * @param dt delta time in milliseconds, since last update
     */
    update(dt) {
        // console.log('tank velocities:', JSON.stringify(this.velocities));
        this.ui.container.x += (this.velocities.x / 1000) * dt;
        this.ui.container.y += (this.velocities.y / 1000) * dt;
        this.aimGun();
    }

    aimGun() {
        if (this.target) {
            this.ui.gun.rotation = this.getCurrentAngle();
        }
        this.ui.gun.rotation += -.01;
    }

    /**
     * get angle to where the gun is currently pointing
     * @return {number}
     */
    getCurrentAngle(): number {
        return getAngle(this.target, this.ui.gun.getGlobalPosition());
    }

    shoot() {
        // TODO: use slope based on adjusted target (see getAngle() for reference)
        // spawn a black 10x10 square, giving it the velocities of that slope, with starting point of the gun tip (?)
        const {x, y} = this.getGunTip();
        const position = {x: x + this.ui.gun.getGlobalPosition().x, y: y + this.ui.gun.getGlobalPosition().y};
        console.log('gun tip: ', {x, y});
        console.log('position: ', position);
        const bullet = getRect(this.renderer, {
            size: {width: 10, height: 10},
            position,
            color: colors.black,
            border: {width: 0, color: colors.black}
        });
        this.stage.addChild(bullet);
    }

    getGunTip(): Position {
        // gun length in direction of mouse, starting from startPosition
        const gunLength = this.ui.base.width;
        const theta = this.getCurrentAngle();
        const x = gunLength * Math.cos(theta);
        const y = gunLength * Math.sin(theta);
        return {x, y};
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