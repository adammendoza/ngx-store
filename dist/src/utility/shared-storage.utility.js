var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { WebStorageUtility } from './webstorage.utility';
var SharedStorageUtility = /** @class */ (function (_super) {
    __extends(SharedStorageUtility, _super);
    function SharedStorageUtility() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharedStorageUtility.prototype.getSettable = function (value) {
        return value;
    };
    SharedStorageUtility.prototype.getGettable = function (value) {
        return value;
    };
    return SharedStorageUtility;
}(WebStorageUtility));
export { SharedStorageUtility };
//# sourceMappingURL=shared-storage.utility.js.map