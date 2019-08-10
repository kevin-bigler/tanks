import Colors from './Colors';
import * as R from 'ramda';

const snyderSquareBorderWidth = 2;

/**
 *
 * @param x
 * @param y
 * @param size
 * @param [color]
 * @returns {PIXI.Graphics}
 */
export const getSnyderSquareGraphic = ({x = 0, y = 0, size, color}) => {
    const graphics = new PIXI.Graphics();

    const colors = new Colors().snyderSquare();
    graphics.lineStyle(snyderSquareBorderWidth, colors.borderColor);
    graphics.beginFill(color || colors.color);
    graphics.drawRect(x, y, size, size);

    return graphics;
};

/**
 * Get square as a texture, from a snyder square graphics object
 *
 * @param {Object} parameter
 * @param {number} parameter.size Used for width and height
 * @param {number} [parameter.x] Default: 0
 * @param {number} [parameter.y] Default: 0
 * @param {number} [parameter.color] Default: Loaded from Colors.js
 * @return {PIXI.Texture}
 * TODO: change to use renderer to generate texture (graphics.genereateTexture() is deprecated D: )
 */
export const getSnyderSquareTexture = R.pipe(getSnyderSquareGraphic, x => x.generateTexture());

/**
 * Get snyder square as a sprite, given a snyder square texture
 *
 * @param {PIXI.Texture} texture snyder square texture
 * @param {number} [size] Height and width of the snyder square sprite
 * @param {number} [x] Default: 0
 * @param {number} [y] Default: 0
 * @returns {PIXI.Sprite}
 */
export const getSnyderSquareSprite = ({texture, size, x = 0, y = 0}) => {
    const sprite = new PIXI.Sprite(texture);

    sprite.x = x;
    sprite.y = y;

    if (size !== undefined) {
        sprite.height = size;
        sprite.width = size;
    }

    return sprite;
};