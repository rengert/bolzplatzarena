import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../../../core/src/lib/core.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { SoundsComponent } from './sounds/sounds.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    SoundsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
