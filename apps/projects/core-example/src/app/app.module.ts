import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule, MaterialModule } from '@bpa/core';
import { AgGridModule } from 'ag-grid-angular';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastDemoComponent } from './components/broadcast-demo/broadcast-demo.component';
import { CellComponent } from './components/broadcast-demo/cell/cell.component';
import { GridComponent } from './components/grid/grid.component';
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
    GridComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatBadgeModule,
    AgGridModule.withComponents([]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
