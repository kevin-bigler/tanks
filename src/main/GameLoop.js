import * as R from 'ramda';
import FpsCalculator from './engine/util/FpsCalculator';
import writeFps from './engine/writeFps';

const fps = 60;
const frameTime = (1 / 60) * 1000; // in millis now
const maxDt = frameTime * 4;
console.log('frameTime:', frameTime);

export default class GameLoop {

}


/* TODO: create loop subscribers interface, ie call all subs in each processed frame (w/ dt & current time)
    - fps calculator, input handler (KeyEmitter), etc -- all run BEFORE drawing the state
*/

const limit = 1000;
let i = 0;

let lastTime;
let dt = 0;
export const run = (timeMillis) => {
    if (++i > limit) {
        console.log('force stopped game loop');
        return;
    }
    dt += lastTime
        ? timeMillis - lastTime
        : 0;

    console.log('dt before: ' + dt);
    if (dt > maxDt) {
        dt = maxDt;
    }

    const numIterations = Math.floor(dt / frameTime);
    console.log('dt = ' + dt + ', numIterations: ' + numIterations);
    R.times((i) => {
        processFrame(frameTime, timeMillis);
    }, numIterations);
    dt -= frameTime * numIterations;
    // TODO: draw here

    lastTime = timeMillis;
    enqueue();
};

const enqueue = () => {
    setTimeout(() => requestAnimationFrame(run), frameTime / 4);
};

const fpsCalc = new FpsCalculator();

const processFrame = (dt, timeMillis) => {
    // TODO: invoke all frame subs here
    const actualFps = fpsCalc.recalculateFps(timeMillis);
    console.log('processFrame', JSON.stringify({actualFps, dt, timeMillis}));
    writeFps(actualFps);
};