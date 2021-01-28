var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ModalComponent } from './modal/modal.component';
import { AboutComponent } from './about/about.component';
import { CompetitionComponent } from './competition/competition.component';
import { TeamComponent } from './competition/team/team.component';
import { TeamDetailComponent } from './competition/team-detail/team-detail.component';
import { TeamNameComponent } from './competition/team-name/team-name.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FetchStatusComponent } from './competition/fetch-status/fetch-status.component';
import { TeamMemberComponent } from './competition/team-member/team-member.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardItemComponent } from './leaderboard/leaderboard-item/leaderboard-item.component';
import { LeaderboardItemMemberComponent } from './leaderboard/leaderboard-item-member/leaderboard-item-member.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                FooterComponent,
                NavMenuComponent,
                ModalComponent,
                CompetitionComponent,
                AboutComponent,
                TeamComponent,
                TeamDetailComponent,
                TeamNameComponent,
                SpinnerComponent,
                FetchStatusComponent,
                TeamMemberComponent,
                LeaderboardComponent,
                LeaderboardItemComponent,
                LeaderboardItemMemberComponent,
            ],
            imports: [
                BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                AppRoutingModule,
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map