'use strict';

import * as PIXI from 'pixi.js';
import {getRectGraphics, getRectSprite} from './main/snyder-square/getRect';
import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {getOrigin} from './main/snyder-square/types';
import * as R from 'ramda';
import flatTo2d from './main/snyder-square/flatTo2d';

const colors = new Colors();

const stageSize: Size = {width: 100, height: 50};

/**
 * Get coords to center a subject within a container
 *
 * @param {Size} subject object to position
 * @param {Size} container where subject is placed
 * @returns {Position} center position x,y values
 */
const getCenter = (subject: Size, container: Size): Position => ({
    x: container.width / 2 - subject.width / 2,
    y: container.height / 2 - subject.height / 2,
});



const {renderer, stage} = initRenderer();

const squareSize: Size = {width: 150, height: 150};
const squarePos: Position = getCenter(squareSize, renderer.screen);
const square: Rect = {
    size: squareSize,
    position: squarePos
};

const squareBg = {
    size: square.size,
    position: getOrigin(),
    color: colors.white,
    border: {
        width: 2,
        color: colors.black
    }
};

const bgGraphics = getRectGraphics(squareBg);
const bgTexture = renderer.generateTexture(bgGraphics);
const bgSprite = getRectSprite({texture: bgTexture, ...squareBg});

const createNumeralSq = (number: number | string, position: Position, containerSize: Size) => {
    const numeralSq = {
        size: {width: containerSize.width / 3, height: containerSize.height / 3},
        position: getOrigin(),
        color: colors.lightGreen,
        border: {
            width: 1,
            color: colors.black
        }
    };

    const numeralContainer = new PIXI.Container();
    numeralContainer.x = position.x * (containerSize.width / 3);
    numeralContainer.y = position.y * (containerSize.height / 3);

    const numeralGraphics = getRectGraphics(numeralSq);
    const numeralTexture = renderer.generateTexture(numeralGraphics);
    const numeralSprite = getRectSprite({texture: numeralTexture, ...numeralSq});

    numeralContainer.addChild(numeralSprite);
    return numeralContainer;
};

const squareContainer = new PIXI.Container();
squareContainer.x = square.position.x;
squareContainer.y = square.position.y;

squareContainer.addChild(bgSprite);

const createSq = (number: number, position: Position) => {
    const num = createNumeralSq(number, position, square.size);
    const text = new PIXI.Text(number + '', {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    num.addChild(text);
    return num;
};

// flatTo2d does this
// const getCoords = (num, width) => ({x: num % width, y: Math.floor(num / width)});

const sprites = R.range(0, 9).map(num => {
    return createSq(num, flatTo2d(3, num));
});

sprites.forEach(numeral =>
    squareContainer.addChild(numeral));

stage.addChild(squareContainer);

renderer.render(stage);