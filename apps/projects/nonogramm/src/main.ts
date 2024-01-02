import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsModule } from './app/modules/settings/settings.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeModule } from './app/modules/home/home.module';
import { GameModule } from './app/modules/game/game.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BoardModule } from './app/modules/board/board.module';
import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, BoardModule, BrowserModule, GameModule, HomeModule, MatToolbarModule, MatIconModule, SettingsModule, TranslateModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })),
        provideAnimations()
    ]
})
  .catch(err => {
    console.error(err);
  });
