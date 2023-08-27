import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../material/material.module';
import { ConsentComponent } from './components/consent/consent.component';

@NgModule({
  declarations: [
    ConsentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
  ],
  exports: [
    ConsentComponent,
  ],
})
export class PrivacyModule {
}
