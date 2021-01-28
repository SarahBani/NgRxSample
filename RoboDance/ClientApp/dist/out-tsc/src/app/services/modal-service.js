var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AlertState } from '../models/Enums';
var ModalService = /** @class */ (function () {
    function ModalService() {
    }
    ModalService.prototype.showError = function (message) {
        this.setClasses(AlertState.Danger);
        this.showModalAlert(message, 'Error!');
    };
    ModalService.prototype.setClasses = function (alertState) {
        if (this.currentModalAlertState !== undefined) {
            if (this.currentModalAlertState === alertState) {
                return;
            }
            this.resetClasses();
        }
        this.currentModalAlertState = alertState;
        this.addClasses();
    };
    ModalService.prototype.resetClasses = function () {
        var state = AlertState[this.currentModalAlertState].toLowerCase();
        $('#myModalAlert .alert').removeClass('alert-' + state);
    };
    ModalService.prototype.addClasses = function () {
        var state = AlertState[this.currentModalAlertState].toLowerCase();
        $('#myModalAlert .alert').addClass('alert-' + state);
    };
    ModalService.prototype.showModalAlert = function (message, caption) {
        $('#myModalAlert').modal(); // initialized with defaults
        $('#myModalAlert').modal({ keyboard: false }); // initialized with no keyboard
        var captionHTML = '';
        if (caption != '') {
            captionHTML = '<strong id="caption">' + caption + '</strong> ';
        }
        $('#myModalAlert .modal-alert-content').html(captionHTML + message);
        $('#myModalAlert').modal('show');
    };
    ModalService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], ModalService);
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=modal-service.js.map