import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerDefenseComponent } from './components/tower-defense/tower-defense.component';
import { AccountComponent } from './components/account/account.component';
import { CoreModule } from '@bpa/core';
import { TowerUpdateComponent } from './components/tower-defense/dialogs/tower-update/tower-update.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [TowerDefenseComponent, AccountComponent, TowerUpdateComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatProgressBarModule,
  ],
  exports: [TowerDefenseComponent],
})
export class TowerDefenseModule {
}
