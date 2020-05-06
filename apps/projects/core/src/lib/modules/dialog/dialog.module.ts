import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
  ],
})
export class DialogModule {
}
