import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { GameComponent } from './modules/game/components/game/game.component';
import { SettingsComponent } from './modules/settings/components/settings/settings.component';
import { ImprintComponent } from './modules/home/components/imprint/imprint.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'imprint',
    component: ImprintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
