import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core.module';
import { MaterialModule } from '../material/material.module';
import { SpeedDialComponent } from './components/speed-dial/speed-dial.component';

@NgModule({
  declarations: [SpeedDialComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    SpeedDialComponent,
  ],
})
export class ButtonModule {
}
