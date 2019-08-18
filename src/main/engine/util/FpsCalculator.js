export default class FpsCalculator {
    frames = 0;
    /**
     * Last-calculated fps
     * @type {number}
     */
    actualFps = 0;
    /**
     * Last time fps was updated
     * @type {number}
     */
    lastCalcTime;

    /**
     * Gets new fps value after adding a new frame timestamp ({@link timeMillis})
     *
     * @param {number} timeMillis The current time in millis
     * @return {number} New fps value
     */
    recalculateFps(timeMillis) {
        this.frames++;
        if (!this.lastCalcTime) {
            this.lastCalcTime = timeMillis;
        }
        // re-calculate every 1 second (1000.0 millis)
        if (timeMillis > this.lastCalcTime + 1000.0) {
            const dtSec = (timeMillis - this.lastCalcTime) / 1000.0;
            this.actualFps = Math.round(this.frames / dtSec);
            // console.log('fps: ', actualFps);
            // console.log('recalculating fps:', JSON.stringify({actualFps: this.actualFps, frames: this.frames, dtSec, timeMillis, lastCalcTime: this.lastCalcTime}, null, 2));
            this.frames = 0;
            this.lastCalcTime = timeMillis;
        }

        return this.actualFps;
    }

    reset() {
        // TODO
    }
}