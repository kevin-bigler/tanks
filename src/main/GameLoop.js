import * as R from 'ramda';
import FpsCalculator from './engine/util/FpsCalculator';
import writeFps from './engine/writeFps';

// for developing/debugging only
const limit = 300;
let i = 0;

export default class GameLoop {
    running = false;

    constructor({fps = 60} = {fps: 60}) {
        this.fps = fps;
        const frameTime = (1 / fps) * 1000; // in millis now
        this.frameTime = frameTime;
        const maxDt = frameTime * 4;
        this.fpsCalc = new FpsCalculator();

        let lastTime;
        let dt = 0;
        const run = (timeMillis) => {
            if (++i > limit) {
                console.log('force stopped game loop');
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
            // TODO: draw here

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

    processFrame(dt, timeMillis) {
        // TODO: invoke all frame subs here
        const actualFps = this.fpsCalc.recalculateFps(timeMillis);
        writeFps(actualFps);
    }

    drawFrame() {
        // TODO: invoke all draw subs here, in order of priority level (z-order)
    }
}


/* TODO: create loop subscribers interface, ie call all subs in each processed frame (w/ dt & current time)
    - fps calculator, input handler (KeyEmitter), etc -- all run BEFORE drawing the state
*/
