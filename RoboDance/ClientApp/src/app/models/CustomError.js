"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
var Enums_1 = require("./Enums");
var Constants = require("./Constants");
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(exception) {
        var _newTarget = this.constructor;
        if (exception === void 0) { exception = Enums_1.CustomException.UnKnown; }
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype); // because of a but in Error or Array child class
        _this.message = _this.getMessage(exception);
        return _this;
    }
    CustomError.prototype.getMessage = function (exception) {
        switch (exception) {
            case Enums_1.CustomException.APIConnectionProblem:
                return Constants.Error_APIConnectionProblem;
            case Enums_1.CustomException.NoAvailableRobot:
                return Constants.Error_NoAvailableRobot;
            case Enums_1.CustomException.InvalidTeamsMembers:
                return Constants.Error_InvalidTeamsMembers;
            case Enums_1.CustomException.UnKnown:
            default:
                return Constants.Error_UnKnown;
        }
    };
    return CustomError;
}(Error));
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map