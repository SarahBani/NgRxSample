import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  @Input() teamNo: number;
  @Input() hasArranged: boolean;
  //hasArranged$: Observable<boolean> = this.store.select(selectHasTeamsArranged)
  //  .pipe(map(hasTeamsArranged => (hasTeamsArranged && hasTeamsArranged[this.teamNo - 1])));

  constructor() { }

}
