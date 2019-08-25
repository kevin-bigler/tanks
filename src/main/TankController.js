import Tank from './Tank';
import {TankCommands} from './TankCommands';
import type {TankCommand} from './TankCommands';
import * as R from 'ramda';

/**
 * defines commands' keys
 * key-value, where key = action name, value = keys that invoke the action
 * @type {{MOVE_UP: [string, string], MOVE_DOWN: [string, string]}}
 */
const keyMap: {[string]: [string]} = {
    MOVE_UP: ['w', 'up'],
    MOVE_DOWN: ['s', 'down']
};

// could use keyPress to get duration, in case action changes after n time holding a key
const getActions = (key, keyPress) => {
    return R.pipe(
        R.filter(keys => keys.has(key)),
        R.keys,
    )(keyMap);
};

export default class TankController {
    /**
     * @type {[TankCommand]}
     */
    queue = [];
    tank: Tank;

    constructor(tank) {
        this.tank = tank;
    }

    enqueue(command) {
        this.queue.push(command);
    }

    /**
     *
     * @param {Map<String,{duration: number, startTime: number}>} keysPressed
     * @param {Position} pointerPosition
     * @param {{primaryPressed: boolean, secondaryPressed: boolean}} pointerState
     */
    processInput({keysPressed, pointerPosition, pointerState}) {
        // queue command that corresponds to key+action, passing {key, action, event, pressed}
        keysPressed.entries().forEach((key, keyPress) => {
            const actions = getActions(key, keyPress);
            if (actions.length > 0) {
                console.log('queueing actions for key [' + key + ']');
                this.queue.concat(actions);
            } else {
                console.log('no actions for key [' + key + ']');
            }
        });
    }

    /**
     * process events in the {@link queue}
     */
    flush() {
        this.queue.forEach(action => {
            const cmd = TankCommands[action];
            // TODO: whoops, we also need dt here :o -- maybe create TankCommand interface to contain data like dt? plus the run fn
            cmd(this.tank);
        });
    }

}