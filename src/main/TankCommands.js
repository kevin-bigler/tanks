/*
Tank Actions:

    MOVE_UP (start)
    MOVE_UP (active? continue)
    MOVE_UP (stop/cancel)
    " for DOWN, LEFT, RIGHT

    AIM at x angle

    ROTATE_LEFT (start)
    ROTATE_LEFT (stop/cancel)
    ROTATE_RIGHT (start)
    ROTATE_RIGHT (stop/cancel)


    maybe actions are just on every tick if the key is down, not ON keydown etc
 */
// TODO: configure velocity
import Tank from './Tank';

const velocity = 2;

export type TankCommand = (tank: Tank, dt: number) => void;

const moveUp = (tank, dt) => {
    console.log('MOVE_UP');
    // TODO: implement dt
    tank.ui.y += -velocity;
};

const moveDown = (tank, dt) => {
    console.log('MOVE_DOWN');
    // TODO: implement dt
    tank.ui.y += -velocity;
};

export const TankCommands: {[string]: TankCommand} = {
    MOVE_UP: moveUp,
    MOVE_DOWN: moveDown
};