import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule, MaterialModule } from '@bpa/core';
import { EmployeeComponent } from './components/employee/employee.component';
import { LabourMarketComponent } from './components/labour-market/labour-market.component';
import { WorkerComponent } from './components/worker/worker.component';

@NgModule({
  declarations: [LabourMarketComponent, WorkerComponent, EmployeeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    RouterModule,
  ],
})
export class EmployeeModule {
}
