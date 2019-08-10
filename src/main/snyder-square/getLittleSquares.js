import Colors from "./Colors";
import * as R from "ramda";
import {getSnyderSquareSprite, getSnyderSquareTexture} from "./snyderSquare";

/**
 * Get little square that contains number, within snyder square
 *
 * Usage:
 *
 * const createSq = getLittleSquare({size, borderWidth});
 * createSq({x1, y1});
 * createSq({x2, y2});
 * createSq({x3, y3});
 *
 * dependencies:
 * @param size
 * @param borderWidth
 * @returns {Function}
 */
const getLittleSquare = ({size, borderWidth}) => {
    const littleSquareTexture = getSnyderSquareTexture({size, color: new Colors().lightGreen, borderWidth});

    /**
     * @param x Index in terms of the x direction (ie not pixel, but # squares to the right, zero-based)
     * @param y Index in terms of the y direction (ie not pixel, but # squares down, zero-based)
     * @returns {PIXI.Sprite}
     */
    return ({x, y}) => {
        console.log('get square for ', {x, y});
        const span = (size + borderWidth * 2);
        console.log('span', span);
        const opts = {texture: littleSquareTexture, size, x: x * span, y: y * span};
        console.log('opts:', R.pick(['x', 'y', 'size'], opts));
        return getSnyderSquareSprite(opts);
    }
};

export default getLittleSquare;