import {getRectGraphics, getRectSprite} from './snyder-square/getRect';
import type {RectOpts} from './snyder-square/getRect';
import Colors from './snyder-square/Colors';
import * as PIXI from 'pixi.js';

const colors = new Colors();

// TODO: remember to call .clear() on any element we want to remove or update :D (ie line.clear() or container.clear(), etc)

const baseOpts: RectOpts = {
    position: {
        x: 20,
        y: 60
    },
    size: {
        width: 50,
        height: 100
    },
    border: {
        color: colors.black,
        width: 2
    },
    color: colors.white
};

export const getTank = (renderer) => {
    const container = new PIXI.Container();
    container.x = baseOpts.position.x;
    container.y = baseOpts.position.y;
    // container.width = baseOpts.size.width;
    // container.height = baseOpts.size.height;
    container.addChild(getBase(renderer));
    container.addChild(getGun(renderer, container));
    return container;
};

const getBase = (renderer) => {
    const graphics = getRectGraphics({...baseOpts, position: {x: 0, y: 0}});
    const texture = renderer.generateTexture(graphics);
    const sprite = getRectSprite({texture: texture, ...baseOpts, position: {x: 0, y: 0}});

    return sprite;
};

const getGun = (renderer, container) => {
    const startPoint: Position = {x: container.width / 2, y: container.height / 2};
    const endPoint: Position = getGunTip();
    const thickness = 7;

    let graphics = new PIXI.Graphics();
    // Move it to the beginning of the line
    graphics.position.set(startPoint.x, startPoint.y);

    // Draw the line (endPoint should be relative to myGraph's position)
    graphics.lineStyle(thickness, colors.blue)
        .moveTo(0, 0)
        .lineTo(endPoint.x, endPoint.y);

    return graphics;
};

const getGunTip = () => ({
    x: baseOpts.size.width,
    y: 0 // baseOpts.size.height / 2
});