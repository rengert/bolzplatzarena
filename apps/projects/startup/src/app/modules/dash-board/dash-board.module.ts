import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
  ],
  declarations: [DashBoardComponent],
})
export class DashBoardModule {
}
