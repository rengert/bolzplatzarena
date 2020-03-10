import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { LabourMarketComponent } from './components/labour-market/labour-market.component';

@NgModule({
  declarations: [LabourMarketComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
  ],
})
export class EmployeeModule {
}
