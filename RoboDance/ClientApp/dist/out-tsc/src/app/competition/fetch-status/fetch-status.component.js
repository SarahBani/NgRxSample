var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConnectionStatus } from '../../models/Enums';
var FetchStatusComponent = /** @class */ (function () {
    function FetchStatusComponent() {
        this.ConnectionStatus = ConnectionStatus;
        this.refetch = new EventEmitter();
    }
    FetchStatusComponent.prototype.ngOnInit = function () {
    };
    FetchStatusComponent.prototype.onRefetch = function () {
        this.refetch.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FetchStatusComponent.prototype, "status", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FetchStatusComponent.prototype, "refetch", void 0);
    FetchStatusComponent = __decorate([
        Component({
            selector: 'app-fetch-status',
            templateUrl: './fetch-status.component.html',
            styleUrls: ['./fetch-status.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], FetchStatusComponent);
    return FetchStatusComponent;
}());
export { FetchStatusComponent };
//# sourceMappingURL=fetch-status.component.js.map