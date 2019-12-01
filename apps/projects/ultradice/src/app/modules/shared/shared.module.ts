import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButtonToggleModule, MatInputModule } from '@angular/material';
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
