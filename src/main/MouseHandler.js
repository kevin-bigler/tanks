import type { Position } from './engine/types';

export default class MouseHandler {
    subject: PIXI.Graphics;
    mousePos: Position;
    mouseData;

    constructor(subject: PIXI.Graphics) {
        this.subject = subject;
        this._init();
    }

    _init() {
        let mouseIn = false;
        this.subject.interactive = true;
        this.subject.on("mouseover", (e) => {
            console.log("over");
            mouseIn = true;
        });

        this.subject.on("mouseout", (e) => {
            console.log("out");
            mouseIn = false;
        });

        this.subject.on("mousemove",(e) => {
            if (mouseIn) {
                // console.log("mouse move inside", e);
                this.mousePos = e.data.getLocalPosition(this.subject);
                this.mouseData = e.data;
                // console.log('mouse move:', this.mousePos);
            }
        });
    }

    getMousePos(): Position {
        return this.mousePos;
    }

    getMouseData() {
        return this.mouseData;
    }
};