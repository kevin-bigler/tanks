import Tank from './Tank';
import {getTankCommand} from './TankCommands';
import type {TankCommand} from './TankCommands';
import {keyMap} from './keyMap';

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

    /**
     * Triggered when pointer (ie mouse) updates
     *
     * @param position New position
     */
    onPointerUpdate(position: Position) {
        // "TARGET (X, Y)"
        this.enqueue(`TARGET (${position.x}, ${position.y})`);
    }

    /**
     * process events in the {@link queue}
     */
    flush() {
        this.queue.forEach(action => {
            // console.log('flushing action ' + action);
            const cmd = getTankCommand(action);
            if (typeof cmd === 'function') {
                cmd(this.tank, action);
            } else {
                console.log('command not found for ' + action);
            }
        });
        this.queue = [];
    }

}