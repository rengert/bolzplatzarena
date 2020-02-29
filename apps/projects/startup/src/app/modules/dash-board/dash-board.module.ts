import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';

@NgModule({
  declarations: [DashBoardComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class DashBoardModule {
}
