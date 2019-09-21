const defaultSpeed = 10;

export default class BulletSystem {
    bullets: [Bullet];

    /**
     *
     * @param pos Initial position of the bullet
     * @param angle Angle of the trajectory in radians
     * @param [speed] Optional. px/sec. Defaults to {@link defaultSpeed}
     */
    spawn(pos: Position, angle: number, speed = defaultSpeed) {
        // TODO
    }

    update(dt) {
        // TODO + add a call to this in the game loop
    }
}

type Bullet = {
    position: Position,
    /**
     * pixels per second
     */
    speed: number,
    /**
     * radians
     */
    angle: number
};