var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { DanceService } from '../../services/dance-service';
var TeamDetailComponent = /** @class */ (function () {
    function TeamDetailComponent(danceService) {
        this.danceService = danceService;
        this.members = [];
        this.totalExperience = 0;
    }
    TeamDetailComponent.prototype.ngOnInit = function () {
        this.subscribe();
        this.fillData();
    };
    TeamDetailComponent.prototype.subscribe = function () {
        var _this = this;
        this.teamArrangedSubscription = this.danceService.teamArranged.subscribe(function (response) {
            if (response === _this.teamNo) {
                _this.fillData();
            }
        });
    };
    TeamDetailComponent.prototype.fillData = function () {
        this.name = this.danceService.teamNames[this.teamNo - 1];
        this.members = this.danceService.teamMembers[this.teamNo - 1];
        this.totalExperience = this.members.reduce(function (sum, current) { return sum + current.experience; }, 0);
    };
    TeamDetailComponent.prototype.onRearrange = function () {
        this.danceService.arrange(this.teamNo);
    };
    TeamDetailComponent.prototype.ngOnDestroy = function () {
        this.teamArrangedSubscription.unsubscribe();
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TeamDetailComponent.prototype, "teamNo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TeamDetailComponent.prototype, "resultClassName", void 0);
    TeamDetailComponent = __decorate([
        Component({
            selector: 'app-team-detail',
            templateUrl: './team-detail.component.html',
            styleUrls: ['./team-detail.component.css']
        }),
        __metadata("design:paramtypes", [DanceService])
    ], TeamDetailComponent);
    return TeamDetailComponent;
}());
export { TeamDetailComponent };
//# sourceMappingURL=team-detail.component.js.map