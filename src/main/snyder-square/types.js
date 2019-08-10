export type Position = {
    x: number,
    y: number
};
export const getOrigin = () => ({x: 0, y: 0});

export type Size = {
    width: number,
    height: number
};

export type Border = {
    color: number,
    width: number
};

export type Rect = {
    position: Position,
    size: Size
};

export type Color = number | string;
