import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { VersionComponent } from './components/version/version.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    MatCardModule,
  ],
  declarations: [HomeComponent, ImprintComponent, PrivacyComponent, VersionComponent],
})
export class InfoModule {
}
