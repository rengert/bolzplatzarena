import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule, MaterialModule } from '@bpa/core';
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
