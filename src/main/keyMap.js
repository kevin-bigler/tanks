import * as R from 'ramda';
import type {Key} from './Keys';

export const keyMap: {[string]: Key} = {
    w: 'UP',
    s: 'DOWN',
    a: 'LEFT',
    d: 'RIGHT'
};

export const keyCodes = name => R.filter(R.equals(name));