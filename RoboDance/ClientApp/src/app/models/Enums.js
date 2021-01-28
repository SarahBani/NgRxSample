"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = exports.AlertState = void 0;
var AlertState;
(function (AlertState) {
    AlertState[AlertState["Success"] = 0] = "Success";
    AlertState[AlertState["Info"] = 1] = "Info";
    AlertState[AlertState["Warning"] = 2] = "Warning";
    AlertState[AlertState["Danger"] = 3] = "Danger";
})(AlertState = exports.AlertState || (exports.AlertState = {}));
var CustomException;
(function (CustomException) {
    CustomException[CustomException["UnKnown"] = 0] = "UnKnown";
    CustomException[CustomException["APIConnectionProblem"] = 1] = "APIConnectionProblem";
    CustomException[CustomException["NoAvailableRobot"] = 2] = "NoAvailableRobot";
    CustomException[CustomException["InvalidTeamsMembers"] = 3] = "InvalidTeamsMembers";
})(CustomException = exports.CustomException || (exports.CustomException = {}));
//# sourceMappingURL=Enums.js.map