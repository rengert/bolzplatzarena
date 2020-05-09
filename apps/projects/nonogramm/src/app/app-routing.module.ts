import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './modules/game/components/game/game.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { ImprintComponent } from './modules/home/components/imprint/imprint.component';
import { PrivacyComponent } from './modules/home/components/privacy/privacy.component';
import { SettingsComponent } from './modules/settings/components/settings/settings.component';

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
    path: 'impressum',
    component: ImprintComponent,
  },
  {
    path: 'datenschutz',
    component: PrivacyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
