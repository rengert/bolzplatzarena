import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConsentComponent } from './components/consent/consent.component';

@NgModule({
  declarations: [
    ConsentComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    ConsentComponent,
  ],
})
export class PrivacyModule {
}
