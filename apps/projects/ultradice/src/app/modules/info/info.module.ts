import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../../core/src/lib/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [HomeComponent, ImprintComponent, PrivacyComponent],
})
export class InfoModule {
}
