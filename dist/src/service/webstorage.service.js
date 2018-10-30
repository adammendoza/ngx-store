import { debug, Config } from '../config/index';
import { Cache } from '../decorator/cache';
import { delay, filter } from 'rxjs/operators';
import { NgxStorageEvent } from '../utility/storage/storage-event';
import { Resource } from './resource';
var merge = require('lodash.merge');
var WebStorageService = /** @class */ (function () {
    function WebStorageService(utility) {
        this.utility = utility;
    }
    Object.defineProperty(WebStorageService.prototype, "keys", {
        /**
         * Gets keys for stored variables created by ngx-store,
         * ignores keys that have not been created by decorators and have no prefix at once
         */
        get: function () {
            var _this = this;
            // get prefixed key if prefix is defined
            var prefixKeys = this.utility.keys.filter(function (key) {
                return _this.utility.prefix && key.startsWith(_this.utility.prefix);
            });
            var decoratorKeys = this.constructor.keys;
            return prefixKeys.concat(decoratorKeys);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebStorageService.prototype, "config", {
        get: function () {
            return Config;
        },
        enumerable: true,
        configurable: true
    });
    WebStorageService.prototype.get = function (key) {
        return this.utility.get(key);
    };
    /**
     * Returns new data Resource for given key exposing builder design pattern
     * designed for complex nested data structures
     * @param {string} key
     * @returns {any}
     */
    WebStorageService.prototype.load = function (key) {
        return new Resource(this, key);
    };
    WebStorageService.prototype.set = function (key, value) {
        return this.utility.set(key, value);
    };
    WebStorageService.prototype.update = function (key, changes) {
        var value = this.get(key);
        if (value !== undefined && typeof value !== 'object') {
            debug.throw(new Error("Value stored under \"" + key + "\" key is not an object and tried to be updated."));
            return value;
        }
        return this.set(key, merge({}, value, changes));
    };
    // TODO return true if item existed and false otherwise (?)
    WebStorageService.prototype.remove = function (key) {
        return this.utility.remove(key);
    };
    WebStorageService.prototype.observe = function (key, exactMatch) {
        return this._changes.pipe(filter(function (event) {
            if (!key) {
                return true;
            }
            if (exactMatch) {
                if (key.startsWith(Config.prefix)) {
                    return event.key === key;
                }
                return event.key === Config.prefix + key;
            }
            else {
                return event.key.indexOf(key) !== -1;
            }
        }), delay(30) // event should come after actual data change and propagation
        );
    };
    /**
     * Clears chosen data from Storage
     * @param clearType 'prefix' | 'decorators' | 'all'
     * @param prefixOrClass defines the prefix or class (not its instance) whose decorators should be cleared
     */
    WebStorageService.prototype.clear = function (clearType, prefixOrClass) {
        var _this = this;
        clearType = clearType || Config.clearType;
        if (clearType === 'decorators') {
            var keys = [];
            if (typeof prefixOrClass === 'object') {
                keys = this.keys.filter(function (key) { return Cache.get(key).targets.indexOf(prefixOrClass) !== -1; });
                debug.log(this.utility.getStorageName() + ' > Removing decorated data from ' + prefixOrClass.constructor.name + ':', keys);
            }
            else {
                keys = this.keys;
                debug.log(this.utility.getStorageName() + ' > Removing decorated data:', keys);
            }
            keys.forEach(function (key) { return _this.remove(key); });
        }
        else if (clearType === 'prefix') {
            prefixOrClass = prefixOrClass || this.utility.prefix;
            this.utility.forEach(function (value, key) {
                if (key.startsWith(prefixOrClass)) {
                    _this.remove(_this.utility.trimPrefix(key));
                }
            });
        }
        else if (clearType === 'all') {
            this.utility.clear();
        }
    };
    WebStorageService.prototype.generateEvent = function (key, newValue, oldValue) {
        var type = this.utility.getStorageName().charAt(0).toLowerCase() + this.utility.getStorageName().slice(1);
        var event = new NgxStorageEvent(type, key, this.utility.getStorage());
        event.oldValue = (oldValue !== undefined) ? oldValue : this.get(key);
        event.newValue = newValue;
        return event;
    };
    WebStorageService.prototype.mapNativeEvent = function (ev) {
        var event = this.generateEvent(ev.key, this.utility.getGettable(ev.newValue), this.utility.getGettable(ev.oldValue));
        event.isInternal = false;
        return event;
    };
    WebStorageService.keys = [];
    return WebStorageService;
}());
export { WebStorageService };
//# sourceMappingURL=webstorage.service.js.map