import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../core/src/lib/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WindowService } from './services/window.service';
import { ToolBarComponent } from './components/game/tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PrivacyComponent,
    SettingsComponent,
    ToolBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    WindowService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
