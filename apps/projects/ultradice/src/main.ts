import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { DialogModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app/app.component';
import { GameModule } from './app/modules/game/game.module';
import { ROUTES } from './app/routes';


import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      GameModule,
      TranslateModule.forRoot(),
      MatIconModule,
      MatDialogModule,
      DialogModule,
      MatButtonModule,
      MatMenuModule,
    ),
    provideAnimations(),
    provideRouter(ROUTES, withHashLocation()),
  ],
})
  .catch(error => {
    console.error(error);
  });
