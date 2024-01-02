import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core.module';
import { SpeedDialComponent } from './components/speed-dial/speed-dial.component';

@NgModule({
  declarations: [SpeedDialComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [
    SpeedDialComponent,
  ],
})
export class ButtonModule {
}
