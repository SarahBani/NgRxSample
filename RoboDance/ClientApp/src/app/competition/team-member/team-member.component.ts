import { Component, Input } from '@angular/core';

import { Robot } from '../../models/Robot';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent {

  @Input() member: Robot;

  constructor() { }

}
