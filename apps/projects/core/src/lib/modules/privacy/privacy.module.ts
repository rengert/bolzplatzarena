import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ConsentComponent } from './components/consent/consent.component';

@NgModule({
  declarations: [ConsentComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ],
})
export class PrivacyModule {
}
