var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DanceService } from '../../services/dance-service';
import { NgForm } from '@angular/forms';
var TeamNameComponent = /** @class */ (function () {
    function TeamNameComponent(danceService) {
        this.danceService = danceService;
        this.create = new EventEmitter();
    }
    TeamNameComponent.prototype.ngOnInit = function () {
    };
    TeamNameComponent.prototype.onCreate = function () {
        this.create.emit(this.myForm.value.name);
        //this.danceService.setTeamName(this.teamNo, this.myForm.value.name);
    };
    __decorate([
        ViewChild('f'),
        __metadata("design:type", NgForm)
    ], TeamNameComponent.prototype, "myForm", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TeamNameComponent.prototype, "teamNo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TeamNameComponent.prototype, "create", void 0);
    TeamNameComponent = __decorate([
        Component({
            selector: 'app-team-name',
            templateUrl: './team-name.component.html',
            styleUrls: ['./team-name.component.css']
        }),
        __metadata("design:paramtypes", [DanceService])
    ], TeamNameComponent);
    return TeamNameComponent;
}());
export { TeamNameComponent };
//# sourceMappingURL=team-name.component.js.map