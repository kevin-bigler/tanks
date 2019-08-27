/*
Tank Actions:

    MOVE_UP_START
    MOVE_UP_STOP
    " for DOWN, LEFT, RIGHT

    AIM (at x target coords)

    ROTATE_LEFT (start)
    ROTATE_LEFT (stop/cancel)
    ROTATE_RIGHT (start)
    ROTATE_RIGHT (stop/cancel)


    maybe actions are just on every tick if the key is down, not ON keydown etc
 */
// TODO: configure velocity
import Tank from './Tank';
import * as R from 'ramda';

const speedX = 2;
const speedY = 4;

export type TankCommand = (tank: Tank) => void;

const addVelocity = (a, b, {min, max}) => R.pipe(R.add(b), R.clamp(min, max))(a);

const moveUp = (tank) => {
    console.log('MOVE_UP');
    console.log('tank.velocities.y BEFORE=', tank.velocities.y);
    tank.velocities.y = addVelocity(tank.velocities.y, speedY, {min: -speedY, max: speedY});
    console.log('tank.velocities.y AFTERR=', tank.velocities.y);
};

const moveDown = (tank) => {
    console.log('MOVE_DOWN');
    console.log('tank.velocities.y BEFORE=', tank.velocities.y);
    tank.velocities.y = addVelocity(tank.velocities.y, -speedY, {min: -speedY, max: speedY});
    console.log('tank.velocities.y AFTERR=', tank.velocities.y);
};

const moveUpOff = (tank) => {
    console.log('MOVE_UP_OFF');
    console.log('tank.velocities.y BEFORE=', tank.velocities.y);
    tank.velocities.y = addVelocity(tank.velocities.y, speedY, {min: -speedY, max: speedY});
    console.log('tank.velocities.y AFTERR=', tank.velocities.y);
};

const moveDownOff = (tank) => {
    console.log('MOVE_DOWN_OFF');
    console.log('tank.velocities.y BEFORE=', tank.velocities.y);
    tank.velocities.y = addVelocity(tank.velocities.y, -speedY, {min: -speedY, max: speedY});
    console.log('tank.velocities.y AFTERR=', tank.velocities.y);
};

export const TankCommands: {[string]: TankCommand} = {
    MOVE_UP: moveUp,
    MOVE_DOWN: moveDown,
    MOVE_UP_OFF: moveUpOff,
    MOVE_DOWN_OFF: moveDownOff
};