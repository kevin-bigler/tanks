import Tank from './Tank';

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

export default class TankController {
    /**
     * @type {[Event]}
     */
    queue = [];
    tank: Tank;

    constructor(tank) {
        this.tank = tank;
    }

    /**
     * start an action
     * @param {Action} action
     */
    start(action) {
        this.queue.push({action, on: true});
    }

    /**
     * stop an action
     * @param {Action} action
     */
    stop(action) {
        this.queue.push({action, on: false});
    }

    onKeyEvent(key, action, event) {
        const self = this;

        // TODO: rename this. possibly reorganize this somehow/somewhere
        const what = {
            w: {
                keydown: () => self.start('MOVE_UP'),
                keyup: () => self.stop('MOVE_UP')
            },
            s: {
                keydown: () => self.start('MOVE_DOWN'),
                keyup: () => self.stop('MOVE_DOWN')
            },
            a: {
                keydown: () => self.start('MOVE_LEFT'),
                keyup: () => self.stop('MOVE_LEFT')
            },
            d: {
                keydown: () => self.start('MOVE_RIGHT'),
                keyup: () => self.stop('MOVE_RIGHT')
            }
        };

        if (what[key]) {
            console.log('key action', {key, action, event});
            what[key][action](event);
            console.log('velocities now: ' + JSON.stringify({velocities: this.tank.velocities}));
        }
    }

    /**
     * process events in the {@link queue}
     */
    flush() {
        // TODO switch this to command pattern (MOVE_UP start/stop, MOVE_DOWN start/stop etc are all commands -- can be defined with names like MOVE_UP start/stop though)
        // TODO: inject commands (command definitions). each command takes `tank` input (?). so TankCommand, or EntityCommand since anything can move up/down etc
        this.queue.forEach(event => {
            switch (event.action) {
                case 'MOVE_UP':
                    if (event.on) {
                        this.tank.velocities.y = -velocity;
                    } else {
                        this.tank.velocities.y = 0;
                    }
                    break;
                case 'MOVE_DOWN':
                    if (event.on) {
                        this.tank.velocities.y = velocity;
                    } else {
                        this.tank.velocities.y = 0;
                    }
                    break;
                case 'MOVE_LEFT':
                    if (event.on) {
                        this.tank.velocities.x = -velocity;
                    } else {
                        this.tank.velocities.x = 0;
                    }
                    break;
                case 'MOVE_RIGHT':
                    if (event.on) {
                        this.tank.velocities.x = velocity;
                    } else {
                        this.tank.velocities.x = 0;
                    }
                    break;
            }
        })
    }

}