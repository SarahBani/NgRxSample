var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DanceService } from '../services/dance-service';
var FooterComponent = /** @class */ (function () {
    function FooterComponent(danceService) {
        this.danceService = danceService;
        this.hasLeaderboard = false;
    }
    FooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.competitionFinishedSubscription = this.danceService.competitionFinished
            .subscribe(function () { return _this.hasLeaderboard = true; });
    };
    FooterComponent.prototype.ngOnDestroy = function () {
        this.competitionFinishedSubscription.unsubscribe();
    };
    FooterComponent = __decorate([
        Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
        }),
        __metadata("design:paramtypes", [DanceService])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map