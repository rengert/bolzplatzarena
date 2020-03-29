import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BoardComponent } from './modules/board/components/board/board.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  {
    path: 'snake',
    component: BoardComponent,
  },
  {
    path: 'highscore',
    component: HighscoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
