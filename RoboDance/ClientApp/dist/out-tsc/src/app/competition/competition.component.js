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
var CompetitionComponent = /** @class */ (function (_super) {
    __extends(CompetitionComponent, _super);
    function CompetitionComponent(danceService, modalService) {
        var _this = _super.call(this, modalService) || this;
        _this.danceService = danceService;
        _this.ConnectionStatus = ConnectionStatus;
        _this.fetchStatus = ConnectionStatus.Connecting;
        _this.hasTeamArranged = [false, false];
        _this.teamClassName = ['', ''];
        return _this;
    }
    CompetitionComponent.prototype.ngOnInit = function () {
        _super.prototype.showLoader.call(this);
        this.subscribe();
        this.danceService.setAvailableRobots();
    };
    CompetitionComponent.prototype.subscribe = function () {
        var _this = this;
        this.fetchStatusSubscription = this.danceService.robotsFetchStatus.subscribe(function (response) {
            _this.fetchStatus = (response ? ConnectionStatus.Connected : ConnectionStatus.ConnectionProblem);
            _super.prototype.hideLoader.call(_this);
        });
        this.teamArrangedSubscription = this.danceService.teamArranged.subscribe(function (response) {
            _this.hasTeamArranged[response - 1] = true;
            _super.prototype.hideLoader.call(_this);
        });
        this.competitionFinishedSubscription = this.danceService.competitionFinished
            .subscribe(function (response) {
            if (response > 0) {
                _this.teamClassName = (response == 1 ? ['winner', 'loser'] : ['loser', 'winner']);
                _super.prototype.hideLoader.call(_this);
            }
            else {
                _super.prototype.showError.call(_this);
            }
        });
    };
    CompetitionComponent.prototype.onRefetch = function () {
        _super.prototype.showLoader.call(this);
        this.fetchStatus = ConnectionStatus.Connecting;
        this.danceService.setAvailableRobots();
    };
    CompetitionComponent.prototype.onTeamCreate = function (teamNo, name) {
        //if (!this.hasRobotsFetched) {
        //  super.showError(error);
        //}
        _super.prototype.showLoader.call(this);
        this.danceService.create(teamNo, name);
    };
    CompetitionComponent.prototype.onStartCompetition = function () {
        _super.prototype.showLoader.call(this);
        this.danceService.startCompetition();
    };
    CompetitionComponent.prototype.ngOnDestroy = function () {
        this.fetchStatusSubscription.unsubscribe();
        this.teamArrangedSubscription.unsubscribe();
        this.competitionFinishedSubscription.unsubscribe();
    };
    CompetitionComponent = __decorate([
        Component({
            selector: 'app-competition',
            templateUrl: './competition.component.html',
            styleUrls: ['./competition.component.css']
        }),
        __metadata("design:paramtypes", [DanceService,
            ModalService])
    ], CompetitionComponent);
    return CompetitionComponent;
}(BaseComponent));
export { CompetitionComponent };
//# sourceMappingURL=competition.component.js.map