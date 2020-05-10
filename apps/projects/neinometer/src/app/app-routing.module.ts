import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { SoundsComponent } from './sounds/sounds.component';

const routes: Routes = [
  {
    path: '',
    component: SoundsComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
