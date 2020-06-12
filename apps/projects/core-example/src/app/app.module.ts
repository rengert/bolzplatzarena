import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../../../core/src/lib/core.module';
import { MaterialModule } from '../../../core/src/lib/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastDemoComponent } from './components/broadcast-demo/broadcast-demo.component';
import { CellComponent } from './components/broadcast-demo/cell/cell.component';
import { MomentPlaygroundComponent } from './components/moment-playground/moment-playground.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PerformanceCheckComponent } from './components/performance-check/performance-check.component';
import { PerformanceTestComponent } from './components/performance-check/performance-test/performance-test.component';
import { SelectionDemoComponent } from './components/selection-demo/selection-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SelectionDemoComponent,
    BroadcastDemoComponent,
    CellComponent,
    MomentPlaygroundComponent,
    PerformanceCheckComponent,
    PerformanceTestComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
