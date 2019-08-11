/**
 * Middle man between key source (system w/ different configurations or recorded or w/e)
 * and key subscribers (ie game state management classes)
 */
export default class Controller {
    /**
     * DI Constructor
     *
     * @param {KeyMap} keyMap Defines each key name to key code
     * @param {[KeyName]} [keys] Key names. Defaults to all keys
     * @param {boolean} [enableCursor]
     * @param {KeyEmitter} keyEmitter Provides the actual key events (system or recorded or w/e)
     */
    constructor({keyMap, keys = allKeys, enableCursor = true, keyEmitter}) {
        this.keyMap = keyMap;
        this.keys = keys;
        this.enableCursor = enableCursor;
        // init keySubs so each key has a corresponding empty Set
        this.keySubs = {};
        keys.forEach(k => this.keySubs[k] = new Set());
        this._registerKeyEvents();
        this.keyPresses = new Map();
    }

    /**
     *
     * @param {Function} listener
     * @param {[KeyName]|KeyName} key
     */
    addListener(listener, key) {
        // turn key into an array if it isn't one
        arrayOf(key)
            .forEach(k => this.keySubs[k].add(listener))
    }

    /**
     *
     * @param {Function} listener
     * @param [key] Optional. Defaults to just removing the listener from all keys it is subbed to
     */
    removeListener(listener, key) {
        // TODO
        arrayOf(key || Object.keys(this.keySubs))
            .forEach(k => this.keySubs[k].delete(listener))
    }

    _registerKeyEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.keyPresses.has(e.key)) {
                this.keyPresses.set(e.key, {startTime: time()});
                console.log('Key down:', e);
            } else {
                const {startTime, duration} = this.keyPresses.get(e.key);
                this.keyPresses.set(e.key, {duration: time() - startTime, startTime});
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keyPresses.delete(e.key);
            console.log('Key up:', e);
        });
    }
}

/**
 * Helper Returns a val as an Array, whether it started as one or not.
 *
 * If input val is already an Array, returns it. If not, wraps val in an Array.
 * @param {[*]|*} val
 * @return {[*]}
 */
const arrayOf = (val) =>
    Array.isArray(val) ? val : [val];

const time = () => +new Date();

// types etc below

type KeyPress = {
    pressed: boolean,
    /**
     * millis
     */
    duration: number,
    /**
     * unix millis
     */
    startTime: number
};

type Key = {
    code: string,
    subs: [Function]
}

type KeyName =
    'UP' |
    'DOWN' |
    'LEFT' |
    'RIGHT' |
    'A' |
    'B'|
    'START'|
    'SELECT';

const allKeys = [
    'UP',
    'DOWN',
    'LEFT',
    'RIGHT',
    'A',
    'B',
    'START',
    'SELECT'];

interface KeyMap {
    getKey(code: string): KeyName
    getCode(keyName: KeyName): string
}

// TODO: define Listener interface (?)
