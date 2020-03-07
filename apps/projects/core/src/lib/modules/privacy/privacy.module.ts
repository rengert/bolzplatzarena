import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ConsentComponent } from './components/consent/consent.component';

@NgModule({
  declarations: [ConsentComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class PrivacyModule {
}
