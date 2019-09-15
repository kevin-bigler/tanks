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