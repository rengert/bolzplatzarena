import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '../../../core/src/lib/modules/dialog/dialog.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';
import { AppComponent } from './app.component';
import { GameIsRunningGuard } from './guards/game-is-running.guard';
import { EndResultComponent } from './modules/game/components/end-result/end-result.component';
import { ResultComponent } from './modules/game/components/result/result.component';
import { GameModule } from './modules/game/game.module';
import { InfoModule } from './modules/info/info.module';
import { SharedModule } from './modules/shared/shared.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
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
    MaterialModule,
    DialogModule,
  ],
  providers: [
    GameIsRunningGuard,
  ],
  entryComponents: [
    ResultComponent,
    EndResultComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
