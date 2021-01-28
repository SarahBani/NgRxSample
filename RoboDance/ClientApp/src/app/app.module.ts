import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ModalComponent } from './modal/modal.component';
import { AboutComponent } from './about/about.component';
import { CompetitionComponent } from './competition/competition.component';
import { FetchRobotsStatusComponent } from './competition/fetch-robots-status/fetch-robots-status.component';
import { TeamComponent } from './competition/team/team.component';
import { TeamDetailComponent } from './competition/team-detail/team-detail.component';
import { TeamNameComponent } from './competition/team-name/team-name.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TeamMemberComponent } from './competition/team-member/team-member.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardItemComponent } from './leaderboard/leaderboard-item/leaderboard-item.component';
import { LeaderboardItemMemberComponent } from './leaderboard/leaderboard-item-member/leaderboard-item-member.component';
import { FetchLeaderboardStatusComponent } from './leaderboard/fetch-leaderboard-status/fetch-leaderboard-status.component';
import { appReducer, metaReducers } from './store/app.reducer';
import { appEffects } from './store/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavMenuComponent,
    ModalComponent,
    AboutComponent,
    CompetitionComponent,
    FetchRobotsStatusComponent,
    TeamComponent,
    TeamDetailComponent,
    TeamNameComponent,
    TeamMemberComponent,
    SpinnerComponent,
    LeaderboardComponent,
    LeaderboardItemComponent,
    LeaderboardItemMemberComponent,
    FetchLeaderboardStatusComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer, { metaReducers }),
    EffectsModule.forRoot(appEffects),
    StoreRouterConnectingModule.forRoot(),
    //StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
