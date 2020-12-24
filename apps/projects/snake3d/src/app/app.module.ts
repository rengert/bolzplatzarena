import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, MaterialModule } from '@bpa/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { LoseScreenComponent } from './components/game/lose-screen/lose-screen.component';
import { PauseScreenComponent } from './components/game/pause-screen/pause-screen.component';
import { ToolBarComponent } from './components/game/tool-bar/tool-bar.component';
import { HighScoreTableComponent } from './components/highscore/high-score-table/high-score-table.component';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HighscoreComponent,
    HighScoreTableComponent,
    LoseScreenComponent,
    PauseScreenComponent,
    PrivacyComponent,
    SettingsComponent,
    ToolBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    WindowService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
