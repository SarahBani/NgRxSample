import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompetitionComponent } from './competition/competition.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardGuard } from './guards/leaderboard-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'competition',
        component: CompetitionComponent
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        canActivate: [LeaderboardGuard]
      },
      { path: 'about', component: AboutComponent },
      { path: 'not-found', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'not-found' }
    ], { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
