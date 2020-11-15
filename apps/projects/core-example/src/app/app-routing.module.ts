import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastDemoComponent } from './components/broadcast-demo/broadcast-demo.component';
import { GridComponent } from './components/grid/grid.component';
import { MomentPlaygroundComponent } from './components/moment-playground/moment-playground.component';
import { PerformanceCheckComponent } from './components/performance-check/performance-check.component';
import { SelectionDemoComponent } from './components/selection-demo/selection-demo.component';

const routes: Routes = [
  { path: 'selection-demo', component: SelectionDemoComponent },
  { path: 'broadcast-demo', component: BroadcastDemoComponent },
  { path: 'moment', component: MomentPlaygroundComponent },
  { path: 'performance', component: PerformanceCheckComponent },
  { path: 'grid', component: GridComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
