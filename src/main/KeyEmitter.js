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

    _registerKeyEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.keyPresses.has(e.key)) {
                this._notify(e.key, 'keydown', e);
                this.keyPresses.set(e.key, {startTime: time()});
                // console.log('Key down:', e);
            } else {
                const {startTime, duration} = this.keyPresses.get(e.key);
                this.keyPresses.set(e.key, {duration: time() - startTime, startTime});
            }
        });
        document.addEventListener('keyup', (e) => {
            this._notify(e.key, 'keyup', e);
            this.keyPresses.delete(e.key);
            // console.log('Key up:', e);
        });
    }

    _notify(key, action, event) {
        // 'pressed' is a set of all keys that are currently pressed (down)
        this.subs.forEach(sub => sub({key, action, event, pressed: this.keyPresses}));
    }

}

const time = () => +new Date();