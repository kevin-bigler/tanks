'use strict';

import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {getTankUI} from './main/getTankUI';
import {KeyEmitter} from './main/KeyEmitter';
import TankController from './main/TankController';
import Tank from './main/Tank';
import GameLoop from './main/GameLoop';

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
console.log('starting game loop');
const gameLoop = new GameLoop();
gameLoop.start();

// TODO: move drawing to the game loop (how? inject?)
renderer.render(stage);