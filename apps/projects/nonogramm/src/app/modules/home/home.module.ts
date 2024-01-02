import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { VersionComponent } from './components/version/version.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
    MatCardModule,
    HomeComponent,
    VersionComponent,
    NavigationComponent,
    ImprintComponent,
    PrivacyComponent,
  ],
  exports: [HomeComponent],
})
export class HomeModule {
}
