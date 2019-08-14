'use strict';

import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {getTankUI} from './main/getTank';
import {KeyEmitter} from './main/KeyEmitter';
import TankController from './main/TankController';
import Tank from './main/Tank';
import * as R from 'ramda';

const colors = new Colors();

// TODO: configify these values, laterish
const stageSize: Size = {width: 800, height: 600};
const stageColor = colors.grass;

const renderer = initRenderer({size: stageSize, bgColor: stageColor});
// create the root of the scene graph: `stage`
const stage = new PIXI.Container();

const tankUI = getTankUI(renderer);
const tank = new Tank(tankUI);
const tankController = new TankController(tank);

stage.addChild(tank.ui);

const keyEmitter = new KeyEmitter();
keyEmitter.sub((key, action, event) => {
    console.log('key action', {key, action, event});
    tankController.onKeyEvent(key, action, event);
});

// TODO: start game loop
const fps = 60;
const frameTime = 1 / 60;
console.log('frameTime:', frameTime);

/* TODO: create loop subscribers interface, ie call all subs in each processed frame (w/ dt & current time)
    - fps calculator, input handler (KeyEmitter), etc -- all run BEFORE drawing the state
*/

let lastTime;
let dt = 0;
const run = (timeMillis) => {
    dt += lastTime
        ? timeMillis - lastTime
        : 0;

    const numIterations = Math.floor(dt / frameTime);
    const times = calculateFrameTimes(dt, timeMillis, frameTime);
    R.times((i) => {
        // TODO: process a frame here
        processFrame(dt, times[i]);
    }, numIterations);
    dt -= frameTime * numIterations;

    requestAnimationFrame(run);
};

/**
 *
 * @param dt time since last frame processed in ms
 * @param timeMillis current time in ms
 * @param frameTime targeted frame duration
 */
const calculateFrameTimes = (dt, timeMillis, frameTime) => {
    const numIterations = Math.floor(dt / frameTime);
    if (dt > frameTime) {
        let first = timeMillis;
        let second = timeMillis + frameTime;
        let third = timeMillis + 2 * frameTime;
        // y = mx + b
        // t = (frameTime)(i) + (timeMillis) + (frameTime - dt)

        /*
            dt = 4
            frameTime = 10
            timeMillis = 100
            first frame process time = 106
            second " = 116
            timeMillis + (frameTime - dt)
         */
    }
};


renderer.render(stage);