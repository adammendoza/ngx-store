import { NgxStorageEvent } from './storage-event';
import { Subject } from 'rxjs';
// TODO: in the future use ES6 Proxy to handle indexers
var NgxStorage = /** @class */ (function () {
    function NgxStorage() {
        this.externalChanges = new Subject();
    }
    NgxStorage.prototype.emitEvent = function (key, newValue, oldValue) {
        var event = new NgxStorageEvent(this.type, key, this);
        event.oldValue = (oldValue !== undefined) ? oldValue : this.getItem(key);
        event.newValue = newValue;
        event.isInternal = false;
        this.externalChanges.next(event);
    };
    return NgxStorage;
}());
export { NgxStorage };
//# sourceMappingURL=storage.js.map