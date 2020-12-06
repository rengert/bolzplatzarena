import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule, MaterialModule } from '@bpa/core';
import { CreditAuditComponent } from './components/credit-audit/credit-audit.component';
import { CreditComponent } from './components/credit/credit.component';

@NgModule({
  declarations: [CreditAuditComponent, CreditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    RouterModule,
  ],
  exports: [
    CreditAuditComponent,
  ],
})
export class CreditModule {
}
