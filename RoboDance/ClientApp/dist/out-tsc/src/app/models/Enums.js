export var AlertState;
(function (AlertState) {
    AlertState[AlertState["Success"] = 0] = "Success";
    AlertState[AlertState["Info"] = 1] = "Info";
    AlertState[AlertState["Warning"] = 2] = "Warning";
    AlertState[AlertState["Danger"] = 3] = "Danger";
})(AlertState || (AlertState = {}));
export var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["Ok"] = 0] = "Ok";
    ButtonState[ButtonState["OkCancel"] = 1] = "OkCancel";
    ButtonState[ButtonState["YesNo"] = 2] = "YesNo";
})(ButtonState || (ButtonState = {}));
export var Button;
(function (Button) {
    Button[Button["Ok"] = 0] = "Ok";
    Button[Button["Cancel"] = 1] = "Cancel";
    Button[Button["Yes"] = 2] = "Yes";
    Button[Button["No"] = 3] = "No";
})(Button || (Button = {}));
export var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Connecting"] = 0] = "Connecting";
    ConnectionStatus[ConnectionStatus["Connected"] = 1] = "Connected";
    ConnectionStatus[ConnectionStatus["ConnectionProblem"] = 2] = "ConnectionProblem";
})(ConnectionStatus || (ConnectionStatus = {}));
export var CompetitionState;
(function (CompetitionState) {
    CompetitionState[CompetitionState["APIConnecting"] = 0] = "APIConnecting";
    CompetitionState[CompetitionState["APIConnectionProblem"] = 1] = "APIConnectionProblem";
    CompetitionState[CompetitionState["APIConnected"] = 2] = "APIConnected";
    CompetitionState[CompetitionState["TeamsArranged"] = 3] = "TeamsArranged";
    CompetitionState[CompetitionState["CompetitionStarted"] = 4] = "CompetitionStarted";
    CompetitionState[CompetitionState["CompetitionFinished"] = 5] = "CompetitionFinished";
})(CompetitionState || (CompetitionState = {}));
//# sourceMappingURL=Enums.js.map