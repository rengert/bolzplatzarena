import {Routes} from '@angular/router';
import { HomeComponent } from '../info/components/home/home.component';
import { ImprintComponent } from '../info/components/imprint/imprint.component';
import { StatisticsComponent } from '../statistics/components/statistics/statistics.component';
import { GameComponent } from '../game/components/game/game.component';
import { GameIsRunningGuard } from '../../guards/game-is-running.guard';

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

