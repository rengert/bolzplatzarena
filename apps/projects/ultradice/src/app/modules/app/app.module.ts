import { environment } from './../../../environments/environment';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {StatisticsModule} from './../statistics/statistics.module';
import {InfoModule} from './../info/info.module';
import {DataService} from './../../services/data.service';
import {SharedModule} from '../shared/shared.module';
import {GameModule} from '../game/game.module';
import {AppComponent} from './components/app.component';
import {ROUTES} from './routes';
import {GameIsRunningGuard} from '../../guards/game-is-running.guard';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { ResultComponent } from '../game/components/result/result.component';
import { EndResultComponent } from '../game/components/end-result/end-result.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    SharedModule,
    GameModule,
    InfoModule,
    StatisticsModule,
    TranslateModule.forRoot(),
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [
    GameIsRunningGuard
  ],
  entryComponents: [
    ResultComponent,
    EndResultComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    DataService.init();
  }
}
