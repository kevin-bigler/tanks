'use strict';

import initRenderer from './main/snyder-square/initRenderer';
import Colors from './main/snyder-square/Colors';
import type {Rect, Size} from './main/snyder-square/types';
import {drawSnyderSquares} from './main/snyder-square/drawSnyderSquares';

const colors = new Colors();

const stageSize: Size = {width: 100, height: 50};

const {renderer, stage} = initRenderer();

drawSnyderSquares(stage, renderer);

renderer.render(stage);