import * as R from 'ramda';

// for developing/debugging only
// const limit = 300;
let i = 0;
const limit = undefined;

/**
 * Has subscribers for each frame processed,
 * and subscribers for each draw cycle (occurs after processing frames)
 *
 * start(), stop()
 * add/remove frame processor
 * add/remove drawer (thing that *draws*)
 */
export default class GameLoop {
    running = false;
    frameProcessors = new Set();
    drawers = new Set();

    constructor({fps = 60} = {fps: 60}) {
        this.fps = fps;
        const frameTime = (1 / fps) * 1000; // in millis now
        this.frameTime = frameTime;
        const maxDt = frameTime * 4;

        let lastTime;
        let dt = 0;
        const run = (timeMillis) => {
            if (limit && ++i > limit) {
                console.log('force stopped game loop, iteration limit reached (' + limit + ')');
                return;
            }
            if (!this.running) {
                console.log('stopping game loop bc running = false');
                return;
            }
            const thisDt = lastTime ? timeMillis - lastTime : 0;

            dt += thisDt;

            if (dt > maxDt) {
                dt = maxDt;
            }

            const numIterations = Math.floor(dt / frameTime);
            R.times((i) => {
                this.processFrame(frameTime, timeMillis);
            }, numIterations);
            dt -= frameTime * numIterations;
            this.drawFrame(frameTime, timeMillis);

            lastTime = timeMillis;
            this.enqueue();
        };
        this.run = run.bind(this);
    }

    enqueue() {
        setTimeout(() => requestAnimationFrame(this.run), this.frameTime / 4);
    }

    start() {
        this.running = true;
        this.enqueue();
    }

    stop() {
        this.running = false;
    }

    addFrameProcessor(fn) {
        this.frameProcessors.add(fn);
    }

    removeFrameProcessor(fn) {
        this.frameProcessors.delete(fn);
    }

    addDrawer(fn) {
        this.drawers.add(fn);
    }

    removeDrawer(fn) {
        this.drawers.delete(fn);
    }

    processFrame(dt, timeMillis) {
        this.frameProcessors.forEach(fn => {
            try {
                fn(dt, timeMillis);
            } catch (err) {
                console.warn(err);
            }
        });
    }

    // TODO: can we just remove the params here? don't think drawing needs them ever
    drawFrame(dt, timeMillis) {
        // TODO: change to invoke in order of priority level (z-order)
        this.drawers.forEach(fn => {
            try {
                fn(dt, timeMillis);
            } catch (err) {
                console.warn(err);
            }
        });
    }
}
