import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatIconModule, MatMenuModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { GameIsRunningGuard } from '../../guards/game-is-running.guard';
import { EndResultComponent } from '../game/components/end-result/end-result.component';
import { ResultComponent } from '../game/components/result/result.component';
import { GameModule } from '../game/game.module';
import { InfoModule } from '../info/info.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { AppComponent } from './components/app.component';
import { ROUTES } from './routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
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
    GameIsRunningGuard,
  ],
  entryComponents: [
    ResultComponent,
    EndResultComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
