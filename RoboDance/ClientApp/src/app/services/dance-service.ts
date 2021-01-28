import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Robot } from "../models/Robot";
import { DanceOff } from "../models/DanceOff";
import { DanceOffResult } from "../models/DanceOffResult";
import { RestService } from "./rest-service";
import { CustomError } from "../models/CustomError";
import { CustomException } from "../models/Enums";

@Injectable({ providedIn: 'root' })
export class DanceService extends RestService {

  private apiUrl: string = 'https://challenge.parkside-interactive.com/api/';
  private fetchRobotsUrl: string = this.apiUrl + 'robots';
  private danceOffsUrl: string = this.apiUrl + 'danceoffs';
  private validTotalExperience: number = 50;
  private teamMembersCount: number = 5;

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  public fetchRobots(): Observable<Robot[]> {
    return super.httpGet<Robot[]>(this.fetchRobotsUrl);
  }

  public arrangeTeam(teamMembers: Robot[], selectiveRobots: Robot[]): void {
    let maxExceededExperience: number | null = null;
    do {
      let filteredSelectiveRobots = this.filterSelectiveRobots(teamMembers, selectiveRobots, maxExceededExperience);
      if (filteredSelectiveRobots.length === 0) { // if there is no available robot
        if (teamMembers.length == 0) { // if there is no team members 
          throw new CustomError(CustomException.NoAvailableRobot);
        }
        teamMembers.sort((m1, m2) => m2.experience - m1.experience); // sort team members based on experience
        maxExceededExperience = teamMembers[teamMembers.length - 1].experience;
        teamMembers.splice(0, 1); // remove the team member with highest experience
        filteredSelectiveRobots = selectiveRobots.filter(q => !teamMembers.some(x => x.id === q.id)); // not already exists in teamMembers
        this.addTeamMembers(teamMembers, filteredSelectiveRobots); // try another members combintaion
      }
      this.addTeamMembers(teamMembers, filteredSelectiveRobots);
    } while (teamMembers.length < this.teamMembersCount)
  }

  private addTeamMembers(teamMembers: Robot[], filteredSelectiveRobots: Robot[]): void {
    const randomIndex = this.getRandomInt(filteredSelectiveRobots.length);
    const selectedRobot = { ...filteredSelectiveRobots[randomIndex] }; // select a random robot from filteredSelectiveRobots
    filteredSelectiveRobots.splice(randomIndex, 1); // remove the selected robot from filteredSelectiveRobots
    teamMembers.push(selectedRobot);
  }

  private filterSelectiveRobots(teamMembers: Robot[], selectiveRobots: Robot[], exceededExperience?: number): Robot[] {
    const remainedExperience: number = this.validTotalExperience -
      teamMembers.reduce((sum, current) => sum + current.experience, 0);
    return selectiveRobots.filter(q => q.experience <= remainedExperience && // remove robots with exceeding experience
      (!exceededExperience || q.experience < exceededExperience));
  }

  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public startCompetition(teamsMembers: Robot[][]): Observable<DanceOffResult[]> {
    if (!this.isCompetitionValid(teamsMembers)) {
      throw new CustomError(CustomException.InvalidTeamsMembers);
    }
    return super.httpPost<DanceOffResult[]>(this.danceOffsUrl,
      {
        danceoffs: this.getDanceOffs(teamsMembers)
      });
  }

  private isCompetitionValid(teamsMembers: Robot[][]): boolean {
    return (teamsMembers[0].length == this.teamMembersCount && teamsMembers[1].length == this.teamMembersCount);
  }

  private getDanceOffs(teamsMembers: Robot[][]): DanceOff[] {
    let danceOffs: DanceOff[] = new Array<DanceOff>(this.teamMembersCount);
    for (var i = 0; i < 5; i++) {
      const index: number = this.getRandomInt(2);
      danceOffs[i] = new DanceOff(
        [teamsMembers[0][i].id, teamsMembers[1][i].id],
        teamsMembers[index][i].id)
    };
    return danceOffs;
  }

  public getWinnerTeamNo(teamsMembers: Robot[][], danceOffResults: DanceOffResult[]): number {
    const team1WinnersCount = teamsMembers[0]
      .filter(q => danceOffResults.some(x => x.winner === q.id)).length;
    return (team1WinnersCount > this.teamMembersCount / 2 ? 1 : 2);
  }

  public fetchLeaderboard(): Observable<DanceOffResult[]> {
    return super.httpGet<DanceOffResult[]>(this.danceOffsUrl);
  }

}
