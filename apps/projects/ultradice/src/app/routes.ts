import { Routes } from '@angular/router';
import { GameIsRunningGuard } from './guards/game-is-running.guard';
import { GameComponent } from './modules/game/components/game/game.component';
import { HomeComponent } from './modules/info/components/home/home.component';
import { ImprintComponent } from './modules/info/components/imprint/imprint.component';
import { StatisticsComponent } from './modules/statistics/components/statistics/statistics.component';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Startseite mit Navigation',
    },
  },
  { path: 'imprint', component: ImprintComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'game', component: GameComponent, canActivate: [GameIsRunningGuard] },
];

