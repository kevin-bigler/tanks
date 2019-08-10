import Colors from './Colors';
import type {Border, Color, Rect} from './types';
import {getOrigin} from './types';

const colors = new Colors();
const getDefaultBorder = () => ({width: 0, color: colors.black});

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

export const getRectGraphics = (opts: Rect & {border: Border, color: Color} =
                                    {position: getOrigin(), border: getDefaultBorder()}): PIXI.Graphics => {
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(opts.border.width, opts.border.color);
    graphics.beginFill(opts.color);
    graphics.drawRect(opts.position.x, opts.position.y, opts.size.width, opts.size.height);

    return graphics;
};