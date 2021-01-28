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
import { BaseComponent } from '../base/base-component';
import { ConnectionStatus } from '../models/Enums';
import { ModalService } from '../services/modal-service';
var LeaderboardComponent = /** @class */ (function (_super) {
    __extends(LeaderboardComponent, _super);
    function LeaderboardComponent(danceService, modalService) {
        var _this = _super.call(this, modalService) || this;
        _this.danceService = danceService;
        _this.ConnectionStatus = ConnectionStatus;
        _this.fetchStatus = ConnectionStatus.Connecting;
        _this.hasLeaderboard = false;
        _this.danceOffResults = [];
        return _this;
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
        _super.prototype.showLoader.call(this);
        this.subscribe();
        this.danceService.setAllRobots();
    };
    LeaderboardComponent.prototype.subscribe = function () {
        var _this = this;
        this.competitionFinishedSubscription = this.danceService.competitionFinished.subscribe(function () {
            return _this.hasLeaderboard = true;
        });
        this.fetchStatusSubscription = this.danceService.robotsFetchStatus.subscribe(function (response) {
            if (response) {
                _this.fetchStatus = ConnectionStatus.Connected;
                _this.danceService.getLeaderboard();
            }
            else {
                _this.fetchStatus = ConnectionStatus.ConnectionProblem;
                _super.prototype.hideLoader.call(_this);
            }
        });
        this.getLeaderboardFinishedSubscription = this.danceService.getLeaderboardFinished
            .subscribe(function (response) {
            _this.danceOffResults = response;
            _super.prototype.hideLoader.call(_this);
        });
    };
    LeaderboardComponent.prototype.onRefetch = function () {
        _super.prototype.showLoader.call(this);
        this.fetchStatus = ConnectionStatus.Connecting;
        this.danceService.setAllRobots();
    };
    LeaderboardComponent.prototype.ngOnDestroy = function () {
        this.competitionFinishedSubscription.unsubscribe();
        this.getLeaderboardFinishedSubscription.unsubscribe();
        this.fetchStatusSubscription.unsubscribe();
    };
    LeaderboardComponent = __decorate([
        Component({
            selector: 'app-leaderboard',
            templateUrl: './leaderboard.component.html',
            styleUrls: ['./leaderboard.component.css']
        }),
        __metadata("design:paramtypes", [DanceService,
            ModalService])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}(BaseComponent));
export { LeaderboardComponent };
//# sourceMappingURL=leaderboard.component.js.map