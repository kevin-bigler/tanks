import type {Size, Color} from './types';
import * as PIXI from 'pixi.js';

/**
 * Initialize the main ~canvas on which to draw
 *
 * @param {Object} opts
 * @param {Size} opts.size
 * @param {Color} opts.bgColor
 */
const initRenderer = ({size, bgColor}) => {
    const {width, height} = size;
    const renderer = PIXI.autoDetectRenderer(width, height,{backgroundColor: bgColor}); // transparent: true also works
    document.getElementById('main').appendChild(renderer.view);
    // document.body.appendChild(renderer.view);

    return renderer;
};

export default initRenderer;