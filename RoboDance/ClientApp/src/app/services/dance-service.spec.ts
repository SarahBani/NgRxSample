import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { DanceService } from './dance-service';
import { Robot } from '../models/Robot';
import { DanceOffResult } from '../models/DanceOffResult';
import * as Constants from '../models/Constants';

describe('DanceService', () => {
  let service: DanceService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const robot: Robot = {
    id: 1,
    name: 'Sarah',
    powermove: 'flying',
    experience: 10,
    outOfOrder: false,
    avatar: 'https://robohash.org/decisive-sarah.png'
  };
  const robots: Robot[] = [
    {
      id: 1,
      name: 'Sarah',
      powermove: 'flying',
      experience: 10,
      outOfOrder: false,
      avatar: 'https://robohash.org/decisive-sarah.png'
    },
    {
      id: 2,
      name: 'Agile Anna',
      powermove: 'Pretzel Hop',
      experience: 5,
      outOfOrder: false,
      avatar: 'https://robohash.org/agile-anna.png'
    },
    {
      id: 3,
      name: 'Paula',
      powermove: 'Celebrating Lobster',
      experience: 11,
      outOfOrder: false,
      avatar: 'https://robohash.org/productive-paula.png'
    },
    {
      id: 4,
      name: 'Joe',
      powermove: 'Spinning Turtle',
      experience: 5,
      outOfOrder: false,
      avatar: 'https://robohash.org/funky-joe.png'
    },
    {
      id: 5,
      name: 'Stephanie',
      powermove: 'Cache Invalidation',
      experience: 8,
      outOfOrder: false,
      avatar: 'https://robohash.org/sliding-stephanie.png'
    }
  ];
  const danceOffResults: DanceOffResult[] = [
    {
      id: 1123,
      winner: 1,
      loser: 2,
      dancedAt: '2021-01-24T11:35:30.226Z',
    },
    {
      id: 2123,
      winner: 2,
      loser: 1,
      dancedAt: '2021-01-25T11:35:30.226Z',
    },
    {
      id: 333,
      winner: 3,
      loser: 1,
      dancedAt: '2021-01-25T11:35:30.226Z',
    },
    {
      id: 444,
      winner: 4,
      loser: 25,
      dancedAt: '2021-01-25T11:35:30.226Z',
    },
    {
      id: 555,
      winner: 4,
      loser: 35,
      dancedAt: '2021-01-25T11:35:30.226Z',
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = new DanceService(httpClient);
  });

  afterEach(() => {
    service = null;
    httpClient = null;
    httpMock = null;
  });

  it('should be createable', () => expect(service).toBeTruthy());

  it('should be defined', () => expect(service).toBeDefined());

  describe('#fetchRobots', () => {

    it('should return observable Robots', () => {
      spyOn(httpClient, 'get').and.returnValue(
        of(robots)
      );
      service.fetchRobots().subscribe(response => {
        expect(response).toBe(robots);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
      });
    });

  });

  describe('#arrangeTeam', () => {

    it('should return NoAvailableRobot exception', () => {
      expect(() => service.arrangeTeam([], [])).toThrowError(Constants.Error_NoAvailableRobot);
    });

    it('should set teamMembers', () => {
      const emptyTeamMembers: Robot[] = [];
      service.arrangeTeam(emptyTeamMembers, robots);
      expect(compareRobots(emptyTeamMembers, robots)).toBeTrue();
    });

    function compareRobots(teamMembers: Robot[], robots: Robot[]): boolean {
      if (teamMembers.length !== robots.length) {
        return false;
      }
      teamMembers.forEach((item) => {
        if (!robots.some(q => q.id === item.id)) {
          return false;
        }
      });
      return true;
    }

  });

  describe('#startCompetition', () => {

    it('should return observable InvalidTeamsMembers exception', () => {
      expect(() => service.startCompetition([[], []])).toThrowError(Constants.Error_InvalidTeamsMembers);
    });

    it('should return observable DanceOffResults', () => {
      spyOn(httpClient, 'post').and.returnValue(
        of(danceOffResults)
      );
      service.startCompetition([robots, robots]).subscribe(response => {
        expect(response).toBe(danceOffResults);
        expect(httpClient.post).toHaveBeenCalledTimes(1);
      });
    });

  });

  describe('#getWinnerTeamNo', () => {

    it('should return 1 as the winner team', () => {
      expect(service.getWinnerTeamNo([robots, null], danceOffResults)).toBe(1);
    });

  });

  describe('#fetchLeaderboard', () => {

    it('should return observable DanceOffResult', () => {
      spyOn(httpClient, 'get').and.returnValue(
        of(danceOffResults)
      );
      service.fetchLeaderboard().subscribe(response => {
        expect(response).toBe(danceOffResults);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
      });
    });

  });

});
