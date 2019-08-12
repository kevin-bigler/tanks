export class KeyEmitter {
    constructor() {
        // k=>v is key=>KeyPress ie {startTime, duration}
        this.keyPresses = new Map();
        this._registerKeyEvents();
        // k=>v is key=>Set of listeners
        this.subs = new Set();
    }

    sub(listener) {
        this.subs.add(listener);
    }

    unsub(listener) {
        this.subs.delete(listener);
    }

    // /**
    //  *
    //  * @param {Function} listener
    //  * @param {[string]} keys
    //  */
    // sub(listener, ...keys) {
    //     // turn key into an array if it isn't one
    //     keys.forEach(key => {
    //         // TODO: change this to add new Set to the keySubs.get(key) if not already exist (and maybe remove from keySubs in unsub() below)
    //         this.keySubsget([key].add(listener)
    //     });
    // }
    //
    // /**
    //  *
    //  * @param {Function} listener
    //  * @param {string} [keys] Optional. Defaults to just removing the listener from all keys it is subbed to
    //  */
    // unsub(listener, ...keys) {
    //     (keys.length > 0 ? keys : this._allKeys())
    //         .forEach(k => this.keySubs[k].delete(listener));
    // }
    //
    // _allKeys() {
    //     return Object.keys(this.keySubs);
    // }

    _registerKeyEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.keyPresses.has(e.key)) {
                this.subs.forEach(sub => sub(e.key, 'keydown', e));
                this.keyPresses.set(e.key, {startTime: time()});
                console.log('Key down:', e);
            } else {
                const {startTime, duration} = this.keyPresses.get(e.key);
                this.keyPresses.set(e.key, {duration: time() - startTime, startTime});
            }
        });
        document.addEventListener('keyup', (e) => {
            this.subs.forEach(sub => sub(e.key, 'keyup', e));
            this.keyPresses.delete(e.key);
            console.log('Key up:', e);
        });
    }
}

const time = () => +new Date();