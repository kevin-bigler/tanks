import Tank from './Tank';
import {TankCommands} from './TankCommands';
import type {TankCommand} from './TankCommands';
import * as R from 'ramda';
import {keyCodes, keyMap} from './keyMap';

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
            const keyName = keyMap[key];
            const actions = getActions(keyName); // TODO: getActions should take a key name (see keyMap) and return a set of actions. maybe pub-sub per key name? :D
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