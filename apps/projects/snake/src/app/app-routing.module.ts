import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BoardComponent } from './modules/board/components/board/board.component';

const ROUTES: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'snake', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
