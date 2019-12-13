import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material';
import { VersionComponent } from './components/version/version.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImprintComponent } from './components/imprint/imprint.component';

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
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
