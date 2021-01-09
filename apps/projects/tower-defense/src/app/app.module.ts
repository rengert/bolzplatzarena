import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TowerDefenseModule } from './modules/tower-defense/tower-defense.module';
import { RouterModule, Routes } from '@angular/router';
import { TowerDefenseComponent } from './modules/tower-defense/components/tower-defense/tower-defense.component';
import { PrivacyNoticeComponent } from './components/privacy-notice/privacy-notice.component';
import { WindowService } from '@bpa/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
  {
    path: '',
    component: TowerDefenseComponent,
  },
  {
    path: 'privacy',
    component: PrivacyNoticeComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PrivacyNoticeComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes),
    TowerDefenseModule,
  ],
  providers: [
    WindowService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
