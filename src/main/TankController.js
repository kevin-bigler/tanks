import Tank from './Tank';
import {TankActions} from './TankActions';
const velocity = 2;

type Action =
    'MOVE_UP' |
    'MOVE_DOWN' |
    'MOVE_LEFT' |
    'MOVE_RIGHT' |
    'ROTATE_LEFT' |
    'ROTATE_RIGHT';

type Event = {
    action: Action,
    on: boolean
};

const keyMap = {
    MOVE_UP: ['w', 'up'],
    MOVE_DOWN: ['s', 'down']
};

// could use keyPress to get duration, in case action changes after n time holding a key
const getActions = (key, keyPress) => {
    const actions = R.pipe(
        R.filter(keys => keys.has(key)),
        R.keys,
    )(keyMap);
    return actions;
};

export default class TankController {
    /**
     * @type {[TankActions]}
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
        // TODO switch this to command pattern (MOVE_UP start/stop, MOVE_DOWN start/stop etc are all commands -- can be defined with names like MOVE_UP start/stop though)
        // TODO: inject commands (command definitions). each command takes `tank` input (?). so TankCommand, or EntityCommand since anything can move up/down etc
        this.queue.forEach(action => {
            const cmd = TankActions[action];
            // TODO: whoops, we also need dt here :o -- maybe create TankCommand interface to contain data like dt? plus the run fn
            cmd(this.tank);
        });
    }

}