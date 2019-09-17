import type {Size} from './engine/types';
import {getRectGraphics, getRectSprite} from './snyder-square/getRect';
import type {RectOpts} from './snyder-square/getRect';
import * as PIXI from 'pixi.js';
import Colors from './snyder-square/Colors';

const colors = new Colors();
const containerPos = {x: 0, y: 0};

export const drawTest = (renderer, stageSize: Size) => {
    const container = new PIXI.Container();
    container.x = containerPos.x;
    container.y = containerPos.y;

    const rect1 = getTestRect(renderer);
    container.addChild(rect1);

    const rect2 = getTestRect(renderer,
        {
            size: {width: 50, height: 10},
            color: colors.blue,
            position: {x: 25, y: 50}
        });
    container.addChild(rect2);

    const rect3 = getTestRect(renderer,
        {
            size: {width: 10, height: 10},
            color: colors.lightGreen
        });
    container.addChild(rect3);

    const rect4 = getTestRect(renderer,
        {
            size: {width: 20, height: 20},
            color: colors.brown,
            position: {x: rect1.width - 20, y: rect1.height - 20}
        });
    container.addChild(rect4);

    const line1 = getTestLine(renderer, container, {
        position: {x: 0, y: 50}
    });
    container.addChild(line1);

    // container.x = 300;
    // container.y = 100;

    return container;
};

const getTestRect = (renderer, opts = {}) => {
    const defaultOpts: RectOpts = {
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 50,
            height: 100
        },
        border: {
            color: colors.black,
            width: 1
        },
        color: colors.white
    };
    const allOpts = {...defaultOpts, ...opts};

    const graphics = getRectGraphics(allOpts);
    const texture = renderer.generateTexture(graphics);
    return getRectSprite({texture, ...allOpts});
};

const getTestLine = (renderer, container, opts = {}) => {
    const defaultOpts = {
        position: {x: 0, y: 0},
        startPoint: {x: 0, y: 0},
        endPoint: {x: 50, y: 50},
        thickness: 7,
        color: colors.blue,
        pivot: {x: 0, y: 0}
    };
    const allOpts = {...defaultOpts, ...opts};

    let graphics = new PIXI.Graphics();
    graphics.position.set(allOpts.position.x, allOpts.position.y);

    // Draw the line (endPoint should be relative to myGraph's position)
    graphics.lineStyle(allOpts.thickness, allOpts.color)
        .moveTo(allOpts.startPoint.x, allOpts.startPoint.y)
        .lineTo(allOpts.endPoint.x, allOpts.endPoint.y);
    graphics.pivot.x = allOpts.pivot.x;
    graphics.pivot.y = allOpts.pivot.y;

    return graphics;
};