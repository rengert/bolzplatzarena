import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarChartModule } from '@swimlane/ngx-charts';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { OfficesComponent } from './components/dash-board/offices/offices.component';
import { StatisticsComponent } from './components/dash-board/statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    RouterModule,
    BarChartModule,
  ],
  declarations: [DashBoardComponent, OfficesComponent, StatisticsComponent],
})
export class DashBoardModule {
}
