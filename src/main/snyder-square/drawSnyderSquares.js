import {getCenter} from './getCenter';
import * as PIXI from 'pixi.js';
import {getRectGraphics, getRectSprite} from './getRect';
import Colors from './Colors';
import type {Rect, Size} from './types';
import {getOrigin} from './types';
import * as R from 'ramda';
import flatTo2d from './flatTo2d';

const colors = new Colors();

export const drawSnyderSquares = (stage, renderer) => {
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
};