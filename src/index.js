'use strict';

import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {getTankUI} from './main/getTank';
import {KeyEmitter} from './main/KeyEmitter';
import TankController from './main/TankController';
import Tank from './main/Tank';

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

let lastTime;
const run = (timeMillis) => {
    const dt = lastTime
        ? timeMillis - lastTime
        : 0;

    const iters = Math.floor(dt / frameTime);
    Array(iters).fill().forEach(() => {
        // TODO: process a frame here
    });

    requestAnimationFrame(run);
};


renderer.render(stage);