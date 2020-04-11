import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastDemoComponent } from './components/broadcast-demo/broadcast-demo.component';
import { SelectionDemoComponent } from './components/selection-demo/selection-demo.component';

const routes: Routes = [
  {
    path: 'selection-demo',
    component: SelectionDemoComponent,
  },
  {
    path: 'broadcast-demo',
    component: BroadcastDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
