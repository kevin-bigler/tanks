import Tank from './Tank';
import {TankCommands} from './TankCommands';
import type {TankCommand} from './TankCommands';
import * as R from 'ramda';
import {keyCodes, keyMap} from './keyMap';

const getAction = (keyName, action) => {
    const map = {
        keydown: {
            UP: 'MOVE_UP',
            DOWN: 'MOVE_DOWN',
            LEFT: 'MOVE_LEFT',
            RIGHT: 'MOVE_RIGHT'
        },
        keyup: {
            UP: 'MOVE_UP_OFF',
            DOWN: 'MOVE_DOWN_OFF',
            LEFT: 'MOVE_LEFT_OFF',
            RIGHT: 'MOVE_RIGHT_OFF'
        }
    };
    return map[action][keyName];
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

    onKeyEvent({key, action, event, keyPresses}) {
        const keyName = keyMap[key];
        const tankAction = getAction(keyName, action);
        if (tankAction) {
            this.enqueue(tankAction);
        }
    }

    // /**
    //  *
    //  * @param {Map<String,{duration: number, startTime: number}>} keysPressed
    //  * @param {Position} pointerPosition
    //  * @param {{primaryPressed: boolean, secondaryPressed: boolean}} pointerState
    //  */
    // processInput({keysPressed, pointerPosition, pointerState}) {
    //     // queue command that corresponds to key+action, passing {key, action, event, pressed}
    //     keysPressed.entries().forEach(([key, keyPress]) => {
    //         const keyName = keyMap[key];
    //         const actions = getActions(keyName); // TODO: getActions should take a key name (see keyMap) and return a set of actions (action names, eg MOVE_DOWN, etc). maybe pub-sub per key name? :D
    //         // TODO: also create a map of action names to actions (functions or command objects with a "run" function, or w/e)
    //         if (actions.length > 0) {
    //             console.log('queueing actions for key [' + key + ']');
    //             this.queue.concat(actions);
    //         } else {
    //             console.log('no actions for key [' + key + ']');
    //         }
    //     });
    // }

    /**
     * process events in the {@link queue}
     */
    flush() {
        this.queue.forEach(action => {
            console.log('flushing action ' + action);
            const cmd = TankCommands[action];
            // TODO: whoops, we also need dt here :o -- maybe create TankCommand interface to contain data like dt/timestamp? plus the run fn
            if (typeof cmd === 'function') {
                cmd(this.tank);
            } else {
                console.log('command not found for ' + action);
            }
        });
        this.queue = [];
    }

}