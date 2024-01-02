import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ButtonModule, CoreModule } from '@bpa/core';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { OfficeComponent } from './components/office/office.component';
import { OpenOfficeComponent } from './components/open-office/open-office.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
  ],
  declarations: [OpenOfficeComponent, OfficeListComponent, OfficeComponent],
})
export class OfficesModule {
}
