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

export const getTankUI = (renderer) => {
    const container = new PIXI.Container();
    container.x = baseOpts.position.x;
    container.y = baseOpts.position.y;
    // container.width = baseOpts.size.width;
    // container.height = baseOpts.size.height;
    const base = getBase(renderer);
    const gun = getGun(renderer, container);
    container.addChild(base);
    container.addChild(gun);
    return {container, base, gun};
};

const getBase = (renderer) => {
    const graphics = getRectGraphics({...baseOpts, position: {x: 0, y: 0}});
    const texture = renderer.generateTexture(graphics);
    const sprite = getRectSprite({texture: texture, ...baseOpts, position: {x: 0, y: 0}});

    return sprite;
};

const getGun = (renderer, container) => {
    const startPoint: Position = {
        x: baseOpts.size.width / 2,
        y: baseOpts.size.height / 2
    };
    const endPoint: Position = {
        x: baseOpts.size.width * 1.5,
        y: 0
    };
    const thickness = 7;

    let graphics = new PIXI.Graphics();
    // Move it to the beginning of the line
    graphics.position.set(startPoint.x, startPoint.y);
    // console.log('startPoint:', startPoint);
    // graphics.position.set(100, 100);

    // Draw the line (endPoint should be relative to myGraph's position)
    graphics.lineStyle(thickness, colors.blue)
        // .moveTo(startPoint.x, startPoint.y)
        // .lineTo(endPoint.x, endPoint.y);
        .moveTo(0, 0)
        .lineTo(200, 200);
    graphics.pivot.x = baseOpts.size.width * 1.5;
    graphics.pivot.y = baseOpts.size.height / 2;

    return graphics;
};