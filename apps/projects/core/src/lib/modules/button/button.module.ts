import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SpeedDialComponent } from './components/speed-dial/speed-dial.component';

@NgModule({
  declarations: [SpeedDialComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SpeedDialComponent,
  ],
})
export class ButtonModule {
}
