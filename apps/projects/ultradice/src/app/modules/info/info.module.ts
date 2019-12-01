import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [HomeComponent, ImprintComponent]
})
export class InfoModule {
}
