import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { VersionComponent } from './components/version/version.component';
import { CoreModule } from '@bpa/core';

@NgModule({
  declarations: [
    HomeComponent,
    VersionComponent,
    NavigationComponent,
    ImprintComponent,
    PrivacyComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
    MatCardModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {
}
