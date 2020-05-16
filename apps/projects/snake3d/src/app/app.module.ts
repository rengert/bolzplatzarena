import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../../core/src/lib/core.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsComponent } from './components/game/controls/controls.component';
import { GameComponent } from './components/game/game.component';
import { LoseScreenComponent } from './components/game/lose-screen/lose-screen.component';
import { ToolBarComponent } from './components/game/tool-bar/tool-bar.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PrivacyComponent,
    SettingsComponent,
    ToolBarComponent,
    LoseScreenComponent,
    ControlsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    WindowService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
