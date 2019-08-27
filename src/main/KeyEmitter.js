export class KeyEmitter {
    keyPresses: Map<string, KeyPress>;
    subs;

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
                this.keyPresses.set(e.key, {startTime: time()});
                this._notify(e.key, 'keydown', e);
                // console.log('Key down:', e);
            } else {
                const {startTime, duration} = this.keyPresses.get(e.key);
                this.keyPresses.set(e.key, {duration: time() - startTime, startTime});
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keyPresses.delete(e.key);
            this._notify(e.key, 'keyup', e);
            // console.log('Key up:', e);
        });
    }

    _notify(key: string, action: KeyAction, event: Object) {
        this.subs.forEach(sub => sub({key, action, event, keyPresses: this.keyPresses}));
    }

}

const time = () => +new Date();

export type KeyPress = {
    /**
     * millis since first pressed
     */
    duration: number,
    /**
     * millis time it was first pressed
     */
    startTime: number
};

/**
 * 'keyPresses' is a set of all keys that are currently pressed (down)
 */
export type KeySub = ({key: string, action: KeyAction, event: Object, keyPresses: Map<string, KeyPress>}) => void;

export type KeyAction = 'keydown' | 'keyup';