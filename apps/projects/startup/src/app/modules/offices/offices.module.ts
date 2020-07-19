import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule, CoreModule, MaterialModule } from '@bpa/core';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { OfficeComponent } from './components/office/office.component';
import { OpenOfficeComponent } from './components/open-office/open-office.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [OpenOfficeComponent, OfficeListComponent, OfficeComponent],
})
export class OfficesModule {
}
