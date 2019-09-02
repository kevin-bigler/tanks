export default class Tank {
    ui;
    velocities = {
        x: 0,
        y: 0
    };

    constructor(ui) {
        this.ui = ui;
    }

    /**
     * update state
     *
     * @param dt delta time in milliseconds, since last update
     */
    update(dt) {
        // console.log('tank velocities yo:', JSON.stringify(this.velocities));
        this.ui.x += (this.velocities.x / 1000) * dt;
        this.ui.y += (this.velocities.y / 1000) * dt;
    }
}