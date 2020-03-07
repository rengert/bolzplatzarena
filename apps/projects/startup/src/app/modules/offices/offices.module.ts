import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../../../core/src/lib/core.module';
import { ButtonModule } from '../../../../../core/src/lib/modules/button/button.module';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { OpenOfficeComponent } from './components/open-office/open-office.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [OpenOfficeComponent, OfficeListComponent],
})
export class OfficesModule {
}
