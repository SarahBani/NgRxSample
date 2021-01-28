import { Component } from '@angular/core';

import * as Constants from './models/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = Constants.App_Title;
}
