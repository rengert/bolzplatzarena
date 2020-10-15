import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, { ngZoneEventCoalescing: true })
  .then(moduleRef => {
    if (!environment.production) {
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      const appComponent = applicationRef.components[0];
      enableDebugTools(appComponent);
      // tslint:disable-next-line:no-console
      console.log('debugging is on ...');
    }
  })
  .catch(err => console.error(err));
