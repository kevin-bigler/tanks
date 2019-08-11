'use strict';

import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {getTank} from './main/getTank';
// import {getSnyderSquare} from './main/snyder-square/getSnyderSquare';

const colors = new Colors();

// TODO: configify these values, laterish
const stageSize: Size = {width: 800, height: 600};
const stageColor = colors.grass;

const renderer = initRenderer({size: stageSize, bgColor: stageColor});
// create the root of the scene graph: `stage`
const stage = new PIXI.Container();

// stage.addChild(getSnyderSquare(renderer));
// TODO: get tank, add it to stage
stage.addChild(getTank(renderer));

renderer.render(stage);