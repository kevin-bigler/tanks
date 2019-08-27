import * as R from 'ramda';

export const keyMap = {
    w: 'UP',
    s: 'DOWN',
    a: 'LEFT',
    d: 'RIGHT'
};

export const keyCodes = name => R.filter(R.equals(name));