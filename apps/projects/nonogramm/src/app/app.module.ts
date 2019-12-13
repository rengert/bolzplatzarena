import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardModule } from './modules/board/board.module';
import { GameModule } from './modules/game/game.module';
import { HomeModule } from './modules/home/home.module';
import { SettingsModule } from './modules/settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BoardModule,
    BrowserAnimationsModule,
    BrowserModule,
    GameModule,
    HomeModule,
    MatToolbarModule,
    MatIconModule,
    SettingsModule,
    TranslateModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
