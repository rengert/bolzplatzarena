import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { BoardModule } from './app/modules/board/board.module';
import { GameModule } from './app/modules/game/game.module';
import { HomeModule } from './app/modules/home/home.module';
import { SettingsModule } from './app/modules/settings/settings.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      BoardModule,
      GameModule,
      HomeModule,
      MatToolbarModule,
      MatIconModule,
      SettingsModule,
      TranslateModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
