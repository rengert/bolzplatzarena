import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [
    WindowService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
