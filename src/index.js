'use strict';

import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {getTankUI} from './main/getTankUI';
import {KeyEmitter} from './main/KeyEmitter';
import TankController from './main/TankController';
import Tank from './main/Tank';
import GameLoop from './main/GameLoop';
import writeFps from './main/engine/writeFps';
import FpsCalculator from './main/engine/util/FpsCalculator';

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
keyEmitter.sub(({key, action, event, pressed}) => {
    console.log('key action', {key, action, event, pressed});
});
keyEmitter.sub(({key, action, event, pressed}) => {
    tankController.onKeyEvent({key, action, event, pressed});
});

console.log('starting game loop');
const gameLoop = new GameLoop();

// add frame subs
const fpsCalc = new FpsCalculator();
const processFps = (dt, timeMillis) => {
    fpsCalc.recalculateFps(timeMillis);
};

gameLoop.addFrameProcessor(processFps);
// gameLoop.addFrameProcessor((dt, timeMillis) => console.table({dt, timeMillis}));
gameLoop.addFrameProcessor((dt, timeMillis) => {
    tankController.flush();
    tank.update(dt);
});

// add draw subs
gameLoop.addDrawer(() => {
    renderer.render(stage);
});

gameLoop.addDrawer(() => {
    writeFps(fpsCalc.actualFps);
});

gameLoop.start();
