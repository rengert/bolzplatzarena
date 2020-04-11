import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../../../core/src/lib/core.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastDemoComponent } from './components/broadcast-demo/broadcast-demo.component';
import { CellComponent } from './components/broadcast-demo/cell/cell.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SelectionDemoComponent } from './components/selection-demo/selection-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SelectionDemoComponent,
    BroadcastDemoComponent,
    CellComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
