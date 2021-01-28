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
var LeaderboardItemComponent = /** @class */ (function () {
    function LeaderboardItemComponent(danceService) {
        this.danceService = danceService;
    }
    LeaderboardItemComponent.prototype.ngOnInit = function () {
        this.robots = this.danceService.getDanceOffRobots(this.result.winner, this.result.loser);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LeaderboardItemComponent.prototype, "itemNo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LeaderboardItemComponent.prototype, "result", void 0);
    LeaderboardItemComponent = __decorate([
        Component({
            selector: 'app-leaderboard-item',
            templateUrl: './leaderboard-item.component.html',
            styleUrls: ['./leaderboard-item.component.css']
        }),
        __metadata("design:paramtypes", [DanceService])
    ], LeaderboardItemComponent);
    return LeaderboardItemComponent;
}());
export { LeaderboardItemComponent };
//# sourceMappingURL=leaderboard-item.component.js.map