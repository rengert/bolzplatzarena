import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { GameIsRunningGuard } from './guards/game-is-running.guard';
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
        DialogModule,
        MatButtonModule,
        MatMenuModule,
    ],
    providers: [
        GameIsRunningGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
