import { NgModule } from '@angular/core';

import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DialogModule, MaterialModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
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
        MatDialogModule,
        MaterialModule,
        DialogModule,
    ],
    providers: [
        GameIsRunningGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
