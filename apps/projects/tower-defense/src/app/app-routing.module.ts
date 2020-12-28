import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TowerDefenseComponent } from './modules/tower-defense/components/tower-defense/tower-defense.component';

const routes: Routes = [
  {
    path: '',
    component: TowerDefenseComponent,
    data: {
      title: 'Startseite mit Navigation',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
