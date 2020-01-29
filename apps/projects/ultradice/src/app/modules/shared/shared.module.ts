import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { LinkButtonComponent } from './components/link-button/link-button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  declarations: [
    ButtonComponent,
    LinkButtonComponent,
  ],
  exports: [
    ButtonComponent,
    LinkButtonComponent,
  ]
})
export class SharedModule {
}
