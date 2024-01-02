import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { CreditAuditComponent } from './components/credit-audit/credit-audit.component';
import { CreditComponent } from './components/credit/credit.component';

@NgModule({
  declarations: [CreditAuditComponent, CreditComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [
    CreditAuditComponent,
  ],
})
export class CreditModule {
}
