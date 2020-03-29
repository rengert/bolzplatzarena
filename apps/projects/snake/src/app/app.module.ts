import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../core/src/lib/core.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighScoreTableComponent } from './components/highscore/high-score-table/high-score-table.component';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BoardModule } from './modules/board/board.module';

@NgModule({
  declarations: [
    AppComponent,
    HighscoreComponent,
    HighScoreTableComponent,
    SettingsComponent,
  ],
  imports: [
    AppRoutingModule,
    BoardModule,
    BrowserModule,
    CoreModule,
    MaterialModule,
    TranslateModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
