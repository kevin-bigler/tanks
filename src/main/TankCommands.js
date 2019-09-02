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
    tank.velocities.y = addVelocity(tank.velocities.y, -speedY, {min: -speedY, max: speedY});
    console.log('tank.velocities.y AFTERR=', tank.velocities.y);
};

const moveUpOff = (tank) => {
    console.log('MOVE_UP_OFF');
    console.log('tank.velocities.y BEFORE=', tank.velocities.y);
    tank.velocities.y = addVelocity(tank.velocities.y, speedY, {min: -speedY, max: speedY});
    console.log('tank.velocities.y AFTERR=', tank.velocities.y);
};

const moveDown = (tank) => {
    console.log('MOVE_DOWN');
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

const moveLeft = (tank) => {
    console.log('MOVE_LEFT');
    console.log('tank.velocities.x BEFORE=', tank.velocities.x);
    tank.velocities.x = addVelocity(tank.velocities.x, -speedX, {min: -speedX, max: speedX});
    console.log('tank.velocities.x AFTERR=', tank.velocities.x);
};

const moveLeftOff = (tank) => {
    console.log('MOVE_LEFT_OFF');
    console.log('tank.velocities.x BEFORE=', tank.velocities.x);
    tank.velocities.x = addVelocity(tank.velocities.x, speedX, {min: -speedX, max: speedX});
    console.log('tank.velocities.x AFTERR=', tank.velocities.x);
};

const moveRight = (tank) => {
    console.log('MOVE_RIGHT');
    console.log('tank.velocities.x BEFORE=', tank.velocities.x);
    tank.velocities.x = addVelocity(tank.velocities.x, speedX, {min: -speedX, max: speedX});
    console.log('tank.velocities.x AFTERR=', tank.velocities.x);
};

const moveRightOff = (tank) => {
    console.log('MOVE_RIGHT');
    console.log('tank.velocities.x BEFORE=', tank.velocities.x);
    tank.velocities.x = addVelocity(tank.velocities.x, -speedX, {min: -speedX, max: speedX});
    console.log('tank.velocities.x AFTERR=', tank.velocities.x);
};

export const TankCommands: {[string]: TankCommand} = {
    MOVE_UP: moveUp,
    MOVE_UP_OFF: moveUpOff,
    MOVE_DOWN: moveDown,
    MOVE_DOWN_OFF: moveDownOff,
    MOVE_LEFT: moveLeft,
    MOVE_LEFT_OFF: moveLeftOff,
    MOVE_RIGHT: moveRight,
    MOVE_RIGHT_OFF: moveRightOff
};