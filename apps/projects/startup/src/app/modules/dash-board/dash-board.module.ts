import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CoreModule, MaterialModule } from '@bpa/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { EmployeeModule } from '../employee/employee.module';
import { CreditAuditComponent } from './components/dash-board/credit-audit/credit-audit.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { EmployeeComponent } from './components/dash-board/employee/employee.component';
import { OfficesComponent } from './components/dash-board/offices/offices.component';
import { StatisticsComponent } from './components/dash-board/statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    RouterModule,
    BarChartModule,
    EmployeeModule,
    MatCardModule,
  ],
  declarations: [CreditAuditComponent, DashBoardComponent, OfficesComponent, StatisticsComponent, EmployeeComponent],
})
export class DashBoardModule {
}
