import { Component, Input } from '@angular/core';

import { Robot } from '../../models/Robot';

@Component({
  selector: 'app-leaderboard-item-member',
  templateUrl: './leaderboard-item-member.component.html',
  styleUrls: ['./leaderboard-item-member.component.css']
})
export class LeaderboardItemMemberComponent{

  @Input() member: Robot;
  @Input() isWinner: boolean = false;

  constructor() { }

}
