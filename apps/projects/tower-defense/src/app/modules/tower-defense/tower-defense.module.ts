import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerDefenseComponent } from './components/tower-defense/tower-defense.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [TowerDefenseComponent, AccountComponent],
  imports: [
    CommonModule,
  ],
  exports: [TowerDefenseComponent],
})
export class TowerDefenseModule {
}
