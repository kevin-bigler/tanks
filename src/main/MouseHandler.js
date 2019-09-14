import type { Position } from './engine/types';

export default class MouseHandler {
    subject: PIXI.Graphics;
    mousePos: Position;
    mouseData;
    subs: Set<Function>;

    constructor(subject: PIXI.Graphics) {
        this.subject = subject;
        this._init();
        this.subs = new Set();
    }

    _init() {
        let mouseIn = false;
        this.subject.interactive = true;
        this.subject.on("mouseover", (e) => {
            // console.log("over");
            mouseIn = true;
        });

        this.subject.on("mouseout", (e) => {
            // console.log("out");
            mouseIn = false;
        });

        this.subject.on("mousemove",(e) => {
            const position = e.data.getLocalPosition(this.subject);
            if (mouseIn) {
                // console.log("mouse move inside", e);
                this.mousePos = position;
                this.mouseData = e.data;
                // console.log('mouse move:', this.mousePos);
                this.notify('mousemove-contained', {position})
            } else {
                this.notify('mousemove', {position});
            }
        });
    }

    getMousePos(): Position {
        return this.mousePos;
    }

    getMouseData() {
        return this.mouseData;
    }

    sub(fn) {
        this.subs.add(fn);
    }

    /**
     * notify subscribers of an event
     *
     * @param {MouseEvent} event
     * @param {Object} data
     * @param {Position} data.position
     */
    notify(event, {position}) {
        // console.log('mouse update:', typeof position.x, typeof position.y);
        this.subs.forEach(sub => sub(event, {position}));
    }
};

type MouseEvent =
    'mouseover' |
    'mouseout' |
    'mousemove' |
    'mousemove-contained';