var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from 'rxjs/operators';
import { DanceOff } from "../models/DanceOff";
import { ExceptionHandlerService } from "./exception-handler-service";
var DanceService = /** @class */ (function () {
    function DanceService(//modalService: ModalService,
    exceptionHandlerService, httpClient) {
        this.exceptionHandlerService = exceptionHandlerService;
        this.httpClient = httpClient;
        this.apiUrl = 'https://challenge.parkside-interactive.com/api/';
        this.fetchRobotsUrl = this.apiUrl + 'robots';
        this.danceOffsUrl = this.apiUrl + 'danceoffs';
        this.validTotalExperience = 50;
        this.teamMembersCount = 5;
        this.teamNames = new Array(2);
        this.teamMembers = [[], []];
        //public invalidTeamMembersIdCombinations: string[];
        this.changeLoaderStatus = new Subject();
        this.robotsFetchStatus = new Subject();
        //public arrangedTeam: Subject<Robot[]> = new Subject<Robot[]>();
        this.teamArranged = new Subject();
        this.competitionFinished = new BehaviorSubject(null);
        this.getLeaderboardFinished = new Subject();
    }
    DanceService.prototype.setAllRobots = function () {
        var _this = this;
        this.httpClient.get(this.fetchRobotsUrl, this.getHeaders())
            .subscribe(function (response) {
            _this.robots = response;
            _this.robotsFetchStatus.next(true);
        }, function (error) {
            _this.onError(error);
            _this.robotsFetchStatus.next(false);
        });
    };
    DanceService.prototype.setAvailableRobots = function () {
        var _this = this;
        this.httpClient.get(this.fetchRobotsUrl, this.getHeaders())
            //.pipe(map((response) => {
            //  console.log(response);
            //  return response;
            //}))
            .pipe(tap(function (response) {
            _this.robots = response;
            _this.inOrderRobots = response.filter(function (q) { return !q.outOfOrder; });
        }))
            .subscribe(function (response) {
            //this.changeLoaderStatus.next(false);
            _this.robotsFetchStatus.next(true);
        }, function (error) {
            console.log("Unable to connect to the API!");
            _this.onError(error);
            _this.robotsFetchStatus.next(false);
        });
    };
    DanceService.prototype.create = function (teamNo, name) {
        this.teamNames[teamNo - 1] = name;
        this.arrange(teamNo);
    };
    DanceService.prototype.arrange = function (teamNo) {
        var _a;
        var index = teamNo - 1;
        var otherTeamMembers = this.teamMembers[(teamNo == 1 ? 1 : 0)];
        this.teamMembers[index] = [];
        this.selectiveRobots = __spreadArrays(this.inOrderRobots.filter(function (q) { return !(otherTeamMembers === null || otherTeamMembers === void 0 ? void 0 : otherTeamMembers.some(function (x) { return x.id === q.id; })); }));
        try {
            this.addMembers(this.teamMembers[index]);
            //console.log(this.team1Members);
            //console.log(this.team2Members);
            this.teamArranged.next(teamNo);
        }
        catch (e) {
            //if (e.)    
            (_a = this.selectiveRobots).push.apply(_a, this.teamMembers[index]);
            this.teamMembers[index] = [];
            console.log("There are not enought appropriate robots available for team ${name} arrangement!");
            //}    else { }
        }
    };
    DanceService.prototype.getDanceOffRobots = function (id1, id2) {
        return [this.robots.find(function (q) { return q.id === id1; }), this.robots.find(function (q) { return q.id === id2; })];
    };
    DanceService.prototype.setTeamName = function (teamNo, name) {
        this.teamNames[teamNo - 1] = name;
    };
    DanceService.prototype.getHeaders = function () {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            responseType: 'json'
        };
    };
    //private setTeams(): void {
    //  this.getAllRobots().subscribe((response) => {
    //    this.inOrderRobots = response.filter(q => !q.outOfOrder);
    //    this.arrangeTeamMembers();
    //    //try {
    //    //  this.addMembers(this.team1Members);
    //    //  this.addMembers(this.team2Members);
    //    //} catch (e) {
    //    //  //if (e.)
    //    //  console.log('Could not find robots with appropriate experience for teams arrangements. please try to arrange again!');
    //    //}
    //  });
    //}
    //public arrangeTeamMembers(teamMembers: Robot[]): void {
    //  this.selectiveRobots = [...this.inOrderRobots];
    //  teamMembers = [];
    //  try {
    //    this.addMembers(this.teamMembers);
    //    try {
    //      this.addMembers(this.team2Members);
    //    } catch (e) {
    //      this.invalidTeamMembersIdCombinations.push(this.getIdCombination(this.team1Members));
    //      this.arrangeTeamMembers(); // try again with different combination
    //    }
    //  } catch (e) {
    //    console.log('There is not enough robots available with appropriate experience!');
    //  }
    //}
    //public arrangeTeamMembers2(): void {
    //  this.selectiveRobots = [...this.inOrderRobots];
    //  this.team1Members = [];
    //  this.team2Members = [];
    //  try {
    //    this.addMembers(this.team1Members);
    //    try {
    //      this.addMembers(this.team2Members);
    //    } catch (e) {
    //      this.invalidTeamMembersIdCombinations.push(this.getIdCombination(this.team1Members));
    //      this.arrangeTeamMembers(); // try again with different combination
    //    }
    //  } catch (e) {
    //    console.log('There is not enough robots available with appropriate experience!');
    //  }
    //}
    DanceService.prototype.addMembers = function (teamMembers) {
        this.filterSelectiveRobots(teamMembers);
        var availableRobotsCount = this.selectiveRobots.length;
        if (availableRobotsCount === 0) { // if there is no available robot
            if (teamMembers.length == 0) { // if there is no team members 
                throw new Error('error');
            }
            teamMembers.sort(function (m1, m2) { return m2.experience - m1.experience; }); // sort team members based on experience
            teamMembers.splice(0, 1); // remove the team member with highest experience
            this.addMembers(teamMembers); // try another members
        }
        var randomIndex = this.getRandomInt(availableRobotsCount);
        var selectedRobot = __assign({}, this.selectiveRobots[randomIndex]); // select a random robot from selectiveRobots
        this.selectiveRobots.splice(randomIndex, 1); // remove the selected robot from selectiveRobots
        teamMembers.push(selectedRobot);
        if (teamMembers.length < this.teamMembersCount) {
            this.addMembers(teamMembers);
        }
    };
    DanceService.prototype.filterSelectiveRobots = function (teamMembers) {
        var remainedExperience = this.validTotalExperience - teamMembers.reduce(function (sum, current) { return sum + current.experience; }, 0);
        this.selectiveRobots = this.selectiveRobots.filter(function (q) { return q.experience <= remainedExperience; }); // remove robots with exceeding experience from selective robots
        //if (teamMembers.length === this.teamMembersCount - 1 && this.invalidTeamMembersIdCombinations.length > 0) {
        //  // check to avoid from repeating invalid combinations
        //  const idCombination: string = this.getIdCombination(teamMembers) + '-';
        //  const invalidLastIds: string[] = this.invalidTeamMembersIdCombinations.filter(q => q.startsWith(idCombination))
        //    .map(q => q.replace(idCombination, ''));
        //  this.selectiveRobots = this.selectiveRobots.filter(q => !invalidLastIds.includes(q.id.toString())); // prevent invalid combinations
        //}
    };
    DanceService.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    DanceService.prototype.startCompetition = function () {
        var _this = this;
        if (!this.isCompetitionValid()) {
            this.onError('Team members has not been arranged properly!');
            return;
        }
        this.httpClient.post(this.danceOffsUrl, {
            danceoffs: this.getDanceOffs()
        }, this.getHeaders())
            //.pipe(map((response) => {
            //  console.log(response);
            //  return response;
            //}))
            //.pipe(tap((response) => {
            //  this.inOrderRobots = response.filter(q => !q.outOfOrder);
            //}),
            //catchError(err =>
            //{
            //  console.log('Handling error sdsdfsf...', err);
            //  return throwError(err);
            //})
            //)
            .subscribe(function (response) {
            console.warn(response);
            var team1WinnersCount = _this.teamMembers[0].filter(function (q) { return response.some(function (x) { return x.winner === q.id; }); }).length;
            console.warn(team1WinnersCount);
            var winnerTeamNo = (team1WinnersCount > 2 ? 1 : 2);
            _this.competitionFinished.next(winnerTeamNo);
        }, function (error) {
            console.log("An error has occured!");
            _this.onError(error);
            _this.competitionFinished.next(0);
        });
    };
    DanceService.prototype.isCompetitionValid = function () {
        return (this.teamMembers[0].length == 5 && this.teamMembers[1].length == 5);
    };
    DanceService.prototype.getDanceOffs = function () {
        var danceOffs = new Array(5);
        for (var i = 0; i < 5; i++) {
            var index = this.getRandomInt(2);
            danceOffs[i] = new DanceOff([this.teamMembers[0][i].id, this.teamMembers[1][i].id], this.teamMembers[index][i].id);
        }
        ;
        return danceOffs;
    };
    DanceService.prototype.getLeaderboard = function () {
        var _this = this;
        this.httpClient.get(this.danceOffsUrl, this.getHeaders())
            //.pipe(map((response) => {
            //  console.log(response);
            //  return response;
            //}))
            //.pipe(tap((response) => {
            //  this.inOrderRobots = response.filter(q => !q.outOfOrder);
            //}),
            //catchError(err =>
            //{
            //  console.log('Handling error sdsdfsf...', err);
            //  return throwError(err);
            //})
            //)
            .subscribe(function (response) {
            _this.getLeaderboardFinished.next(response);
        }, function (error) {
            _this.onError(error);
            _this.getLeaderboardFinished.next(null);
        });
    };
    //protected onSuccess(result): void {
    //  if (result.isSuccessful) {
    //    this.operationCompleted.next(true);
    //  }
    //  else {
    //    this.operationCompleted.next(false);
    //    this.modalService.showError(result.customExceptionMessage);
    //  }
    //}
    DanceService.prototype.onError = function (error) {
        this.showError(error);
        //this.operationCompleted.next(false);
    };
    DanceService.prototype.showError = function (error) {
        console.warn('showError');
        console.error(error);
        this.exceptionHandlerService.showModalException(error);
    };
    DanceService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [ExceptionHandlerService,
            HttpClient])
    ], DanceService);
    return DanceService;
}());
export { DanceService };
//# sourceMappingURL=dance-service.js.map