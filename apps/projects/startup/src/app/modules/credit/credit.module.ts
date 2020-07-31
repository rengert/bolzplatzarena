import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule, MaterialModule } from '../../../../../core/src';
import { CreditAuditComponent } from './components/credit-audit/credit-audit.component';

@NgModule({
  declarations: [CreditAuditComponent],
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
