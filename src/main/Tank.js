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
        this.ui.x += this.velocities.x;
        this.ui.y += this.velocities.y;
    }
}