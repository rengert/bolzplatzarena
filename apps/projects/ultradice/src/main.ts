import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@bpa/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { GameModule } from './app/modules/game/game.module';
import { ROUTES } from './app/routes';
import { withHashLocation, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { GameIsRunningGuard } from './app/guards/game-is-running.guard';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, GameModule, TranslateModule.forRoot(), MatIconModule, MatDialogModule, DialogModule, MatButtonModule, MatMenuModule),
        GameIsRunningGuard,
        provideAnimations(),
        provideRouter(ROUTES, withHashLocation())
    ]
})
  .catch(error => {
    console.error(error);
  });
