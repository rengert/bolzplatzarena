import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../core/src/lib/core.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { NavigationComponent } from './components/board/navigation/navigation.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HighscoreComponent } from './components/highscore/highscore.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SettingsComponent,
    NavigationComponent,
    HighscoreComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    MaterialModule,
    TranslateModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
