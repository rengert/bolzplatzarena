import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { OpenOfficeComponent } from './components/open-office/open-office.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [OpenOfficeComponent],
})
export class OfficesModule {
}
