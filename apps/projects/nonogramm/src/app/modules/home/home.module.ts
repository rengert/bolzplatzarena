import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { VersionComponent } from './components/version/version.component';

@NgModule({
  declarations: [
    HomeComponent,
    VersionComponent,
    NavigationComponent,
    ImprintComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
    MatCardModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
