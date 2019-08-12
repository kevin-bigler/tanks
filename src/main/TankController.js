const velocity = 2;

type Action =
    'MOVE_UP' |
    'MOVE_DOWN' |
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
            // a: {
            //     keydown: () => self.velocities.x = -10,
            //     keyup: () => self.velocities.x = 0
            // },
            // d: {
            //     keydown: () => self.velocities.x = 10,
            //     keyup: () => self.velocities.x = 0
            // }
        };

        if (what[key]) {
            console.log('key action', {key, action, event});
            what[key][action](event);
            console.log('velocities now: ' + JSON.stringify({velocities: this.velocities}));
        }
    }

    /**
     * process events in the {@link queue}
     */
    flush() {
        // TODO, do stuff to the tank
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
            }
        })
    }

}