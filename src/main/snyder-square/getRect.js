import Colors from './Colors';
import type {Border, Color, Rect} from './types';
import {getOrigin} from './types';

const colors = new Colors();
const getDefaultBorder = () => ({width: 0, color: colors.black});

/**
 * Get rect as sprite
 * @param renderer
 * @param opts - size, position, border, color
 */
export const getRect = (renderer, opts: RectOpts): PIXI.Sprite => {
    const graphics = getRectGraphics(opts);
    const texture = renderer.generateTexture(graphics);
    return getRectSprite({texture, ...opts});
};

export const getRectSprite = (opts: Rect & {texture: PIXI.Texture} =
                                  {position: getOrigin()}): PIXI.Sprite => {
    const sprite = new PIXI.Sprite(opts.texture);

    sprite.x = opts.position.x;
    sprite.y = opts.position.y;

    if (opts.size.width !== undefined) {
        sprite.width = opts.size.width;
    }
    if (opts.size.height !== undefined) {
        sprite.height = opts.size.height;
    }

    return sprite;
};

export const getRectGraphics = (opts: RectOpts = getDefaultOpts()): PIXI.Graphics => {
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(opts.border.width, opts.border.color);
    graphics.beginFill(opts.color);
    graphics.drawRect(opts.position.x, opts.position.y, opts.size.width, opts.size.height);

    return graphics;
};

export type RectOpts = Rect & {
    border: Border,
    color: Color
};

const getDefaultOpts = () => ({
    position: getOrigin(),
    border: getDefaultBorder(),
});