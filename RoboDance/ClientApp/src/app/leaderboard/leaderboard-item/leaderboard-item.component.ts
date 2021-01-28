import { Component, Input } from '@angular/core';

import { DanceOffResult } from '../../models/DanceOffResult';

@Component({
  selector: 'app-leaderboard-item',
  templateUrl: './leaderboard-item.component.html',
  styleUrls: ['./leaderboard-item.component.css']
})
export class LeaderboardItemComponent {

  @Input() itemNo: number;
  @Input() result: DanceOffResult;

}
