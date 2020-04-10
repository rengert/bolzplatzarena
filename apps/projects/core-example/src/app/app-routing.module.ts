import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionDemoComponent } from './components/selection-demo/selection-demo.component';

const routes: Routes = [{
  path: 'selection-demo',
  component: SelectionDemoComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
